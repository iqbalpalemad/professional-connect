const { body } = require('express-validator');


exports.tokenStoreValidation = () => {
    return [
        body('code').exists().isLength({ min: 5 })
    ]
}

exports.getFreeSlotValidation = () => {
    return [
        body('startTime').exists().isISO8601(),
        body('endTime').exists().isISO8601(),
        body('timeZone').exists()
    ]
}