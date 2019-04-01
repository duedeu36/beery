const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    if (!Validator.isEmail(data.email)) {
        errors.email = 'We cannot find this email';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Your password may be incorrect. Please try again';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Please enter email for login';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}