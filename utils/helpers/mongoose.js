const ObjectId = require('mongoose').Types.ObjectId

// Validator function
exports.isValidMongooseObjectId = (id) => {
    if(ObjectId.isValid(id)){
        return (String)(new ObjectId(id)) === id;

    }
    return false
}
