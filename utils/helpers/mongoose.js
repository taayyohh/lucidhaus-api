const ObjectId = require('mongoose').Types.ObjectId



// Validator function
exports.isValidMongooseObjectId = (id) => {
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}
exports.isObjectIdValid = id => ObjectId.isValid(id) ? !!String(new ObjectId(id) === id) : false
