const aws = require('aws-sdk');
aws.config.update({
    region: process.env.BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

exports.getSignedRequest = (req, res) => {
    const s3 = new aws.S3({
        signatureVersion: 'v4'
    });
    const fileName = req.query['file-name']
    const fileType = req.query['file-type']
    const s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read' // this should be set to private and we should use s3 sdk to get and read private url
    };

    s3.getSignedUrl('putObject', s3Params, (error, data) => {
        if(error){
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
}
