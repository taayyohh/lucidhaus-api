'use strict'

/**
 * Get unique error field name
 */
const uniqueMessage = error => {
    let output
    try {
        let fieldName = error.keyValue.tel
        output = `Looks like there's an account already associated with ${fieldName}`
    } catch (ex) {
        output = 'Unique field already exists'
    }

    return output
}

/**
 * Get the error message from error object
 */
exports.errorHandler = error => {
    let message = ''

    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error)
                break
            default:
                message = 'Something went wrong'
        }
    } else {
        for (let errorName in error.errors) {
            if (error.errors[errorName].message)
                message = error.errors[errorName].message
        }
    }

    return message
}
