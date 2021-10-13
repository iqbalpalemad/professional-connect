const { body } = require('express-validator');


exports.listUsersValidation = () => {
    return [
        body('searchKey').optional().isLength({ min: 2 }),
        body('pageNumber').optional().isNumeric(),
        body('entryPerPage').optional().isNumeric()
    ]
}