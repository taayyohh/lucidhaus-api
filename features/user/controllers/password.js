const cron = require('node-cron')
const User = require('../models')
const formidable = require('formidable')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = (req, res) => {
    const {tel, email, password} = req.body

    User.findOne({email: email})
        .then(user => {
            if (!user) return res.status(401).json({error: 'The email address ' + email + ' is not associated with any account. Double-check your phone number and try again.'})

            //Generate and set password reset token
            user.generatePasswordReset()

            // Save the updated user object
            user.save()
                .then(user => {
                    // send email
                    let link = "https://" + 'beta.inclusiveguide.com' + "/reset/" + user.resetPasswordToken
                    const mailOptions = {
                        to: user.email,
                        from: process.env.FROM_EMAIL,
                        subject: "Password change request",
                        text: `Hi ${user.nameFirst} \n 
                    Please click on the following link ${link} to reset your password. \n\n 
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
                    }

                    sgMail.send(mailOptions, (error, result) => {
                        if (error) return res.status(500).json({message: error.message})

                        res.status(200).json({message: 'A reset email has been sent to ' + user.email + '.'})
                    })
                })
                .catch(err => res.status(500).json({message: err.message}))
        })
        .catch(err => res.status(500).json({message: err.message}))


}

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
exports.reset = (req, res) => {
    User.findOne({resetPasswordToken: req.body.token, resetPasswordExpires: {$gt: Date.now()}})
        .then((user) => {
            if (!user) return res.status(401).json({error: 'Password reset token is invalid or has expired.'})
            //TODO: set up error if invalid link on front end
            return res.status(200).json({message: 'Valid link'})
        })
        .catch(err => res.status(500).json({message: err.message}))
}


// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}})
                .then((user) => {
                    if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'})

                    //Set the new password
                    user.password = fields.password
                    user.resetPasswordToken = undefined
                    user.resetPasswordExpires = undefined

                    // Save
                    user.save((err) => {
                        if (err) return res.status(500).json({message: err.message})

                        // send email
                        const mailOptions = {
                            to: user.email,
                            from: process.env.FROM_EMAIL,
                            subject: "Your password has been changed",
                            text: `Hi ${user.nameFirst} \n 
                    This is a confirmation that the password for your account ${user.email} has just been changed.\n`
                        }

                        sgMail.send(mailOptions, (error, result) => {
                            if (error) return res.status(500).json({message: error.message})

                            res.status(200).json({message: 'Your password has been updated.'})
                        })
                    })
                })
        })
}

exports.checkForVerification = () => {
    cron.schedule('0 0 0 * * *', function () {
        User.find({}, (err, users) => {
            if (err) return false

            users.map(user => {
                if (!user.emailVerified && !!user.verificationToken) {
                    if (new Date(user.confirmVerificationDate) < new Date(Date.now())) {
                        if (user.confirmationAttempt < 2) {
                            const verificationEmail = {
                                to: user.email,
                                from: 'no-reply@inclusiveguide.com',
                                subject: `Inclusive Guide: Verify your email!`,
                                html: `https://beta.inclusiveguide.com/verify/${user.verificationToken}`
                            }
                            sgMail.send(verificationEmail)
                            user.confirmationAttempt = user.confirmationAttempt + 1
                            user.confirmVerificationDate = new Date(+new Date() + 12096e5)
                            user.save((err, result) => {
                                if (err) {
                                    console.log('err', err)
                                }
                            })
                        } else {
                            user.remove((err) => {
                                if (err) {
                                    console.log('err', err)
                                }
                            })
                        }
                    }
                }
            })
        })
    })
}
