const phoneRegExp = require('../helpers')

exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty()
    req.check('tel')
        .matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)
        .withMessage('Phone Number is Not Valid')
        .isLength({
            min: 10,
            max: 10
        })

    req.check('password', 'Password is required').notEmpty()
    req.check('password')
        .isLength({min: 6})
        .withMessage('password must include at least 6 characters')
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next()
}
