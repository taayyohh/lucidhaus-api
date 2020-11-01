exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty()
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        .withMessage('Email must contain @')
        .isLength({
            min: 3,
            max: 32
        })

    req.check('password', 'Password is required').notEmpty()
    // req.check('password')
    //     .isLength({min: 6})
    //     .withMessage('password must include at least 6 characters')
    //     .matches('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$')
    //     .withMessage('Password must contain at least one letter, at least one number, and be longer than six charaters.')
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next()
}   