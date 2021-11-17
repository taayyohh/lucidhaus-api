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
    console.log('body', req.body)
    twilio.verify.services(process.env.VERIFICATION_SID)
        .verificationChecks
        .create({to: `+1${req.body.tel.replace(/-/g, "")}`, code: req.body.verificationCode})
        .then(verification_check => {
            res.write(JSON.stringify(verification_check.status));
            res.end();
        });
}



