const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendVerification = (req, res) => {
    twilio.verify.services(process.env.VERIFICATION_SID)
        .verifications
        .create({to: `+1${req.body.tel.replace(/-/g, "")}`, channel: 'sms'})
        .then(verification => {
            res.write(JSON.stringify(verification.status));
            res.end();
        });
}


exports.confirmVerification = (req, res) => {
    twilio.verify.services(process.env.VERIFICATION_SID)
        .verificationChecks
        .create({to: `+1${req.body.tel.replace(/-/g, "")}`, code: req.body.verificationCode})
        .then(verification_check => {
            res.write(JSON.stringify(verification_check.status));
            res.end();
        });
}

exports.sendEmailVerification = (req, res) => {
    twilio.verify.services(process.env.VERIFICATION_SID)
        .verifications
        .create({to: req.body.email, channel: 'email'})
        .then(verification => {
            res.write(JSON.stringify(verification.status));
            res.end();
        });
}

exports.confirmEmailVerification = (req, res) => {
    twilio.verify.services(process.env.VERIFICATION_SID)
        .verificationChecks
        .create({to: req.body.email, code: req.body.verificationCode})
        .then(verification_check => {
            res.write(JSON.stringify(verification_check.status));
            res.end();
        });
}



