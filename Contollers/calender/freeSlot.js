const fs                    = require('fs').promises;
const readline              = require('readline');
const {google}              = require('googleapis');
const GoogleToken           = require('../../Models/GoogleToken');
const { validationResult }  = require('express-validator')
const SCOPES                = ['https://www.googleapis.com/auth/calendar',
                                'https://www.googleapis.com/auth/calendar.events'];


const getFreeSlots = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({result : false, errors: errors.array() })
    }
    const sourecUser = req.userId;
    const destUser   = req.params.userId;
    const startTime  = new Date(req.body.startTime)
    const endTime    = new Date(req.body.endTime);
    const timeZone   = req.body.timeZone;
    try {
        const sourceUserBusySlot = await getBusySlots(sourecUser,startTime,endTime,timeZone);
        const destUserBusySlot   = await getBusySlots(destUser,startTime,endTime,timeZone);
        console.log("sourceUserEvents",sourceUserBusySlot);
        console.log("destUserEvent",destUserBusySlot);
        if(!sourceUserBusySlot.result || !destUserBusySlot.result){
            return res.status(400).json({result : false, message : "event fetch failed"});
        }

        const overallBusySlots = [...sourceUserBusySlot.events,...destUserBusySlot.events]

        overallBusySlots.sort((a,b) => {
            if(new Date(a.start) > new Date(b.start)){
                return 1;
            }

            if(a.start < b.start){
                return -1;
            }

            return 0;
        })
        
        const keysToRemove = [];
        let previousItem;
        overallBusySlots.forEach((item,key) => {
            
            if(key >= 1){
                console.log(previousItem.end,item.start,key)
                if(new Date(previousItem.end) >= new Date(item.start)){
                    overallBusySlots[key].start = previousItem.start;
                    overallBusySlots[key].end   = new Date(previousItem.end) > new Date(item.end) ? previousItem.end : item.end;
                    keysToRemove.push(key-1);
                }
                else{
                    previousItem = item;
                }
                
            }else{
                previousItem = item;
            }
        })
        keysToRemove.forEach(element => {
            overallBusySlots.splice(element,1);
        });
        console.log(overallBusySlots)
        const freeSlots = busyToFreeSlot(startTime,endTime,overallBusySlots)
        console.log(freeSlots)
        return res.status(200).json({result : false, message : freeSlots});

    }
    catch(err) {
        return res.status(400).json({result : false, message : err.message});
    }

    
}

const busyToFreeSlot = (startTime,endTime,busySlot) => {
    let   previousElement;
    const freeSlots = []
    busySlot.forEach(element => {
        if(freeSlots.length > 0){
            const startDate = new Date(previousElement.end);
            const endDate   = new Date(element.start);
            freeSlots.push({"start" :new Date(previousElement.end),"end" : new Date(element.start)})
        }
        else{
            freeSlots.push({"start" : startTime,"end" : new Date(element.start)})
        }
        previousElement = element;
    });
    freeSlots.push({"start" : new Date(previousElement.end),"end" : endTime})

    return freeSlots;
}

const getBusySlots = async (userId,startTime,endTime,timeZone) => {
    const token  = await getUserToken(userId);
    if(!token.result){
        return {result : false}
    }
    try{
       console.log("getting event list")
       const content = await fs.readFile('credentials.json')
       const credentials = JSON.parse(content);
       const {client_secret, client_id, redirect_uris} = credentials.web;
       const oAuth2Client = new google.auth.OAuth2(
           client_id, client_secret, redirect_uris[0]);
       oAuth2Client.setCredentials(token.token);
       return await getEvents(oAuth2Client,startTime,endTime,timeZone);
    }
    catch(err){
        console.log("err2",err)
        return {result : false}
    }
   
}

const getEvents    = async (auth,startTime,endTime,timeZone) => {
   
  const calendar = google.calendar({version: 'v3', auth});
  try{
    const response = await calendar.freebusy.query(
                                            {
                                            resource: {
                                                timeMin: startTime,
                                                timeMax: endTime,
                                                timeZone : timeZone,
                                                items: [{ id: 'primary' }],
                                            },
                                            })
    const events = response.data.calendars.primary.busy
    return {result : true,events : events};
  }
  catch(err){
      console.log('err3',err);
      return {result : false}
  }
//   const   calendar.freebusy.query(
//     {
//       resource: {
//         timeMin: startTime,
//         timeMax: endTime,
//         timeZone : timeZone,
//         items: [{ id: 'primary' }],
//       },
//     },
//     (err, res) => {
//       if (err) {
//         console.error('Free Busy Query Error: ', err)
//         return {result : false}
//       }
//       const events = res.data.calendars.primary.busy
//       return {result : true,events : events};
//     }
//   )

}

const getUserToken  = async (userId) => {
    console.log("fetching token");
    try{
        const token  = await GoogleToken.findOne({userId : userId});
        if(token){
            return {result : true, token : token.token}
        }
        return {result : false}
    }
    catch(err){
        console.log("err1",err);
        return {result : false}
    }
}

module.exports = getFreeSlots;