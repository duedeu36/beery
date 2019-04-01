const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
   let errors = {};

   // Check here only required: true objects
   data.handle = !isEmpty(data.handle) ? data.handle : '';

   if (!Validator.isLength(data.handle, {
         min: 2,
         max: 40
      })) {
      errors.handle = 'Handle needs to be between 2 and 40 characters';
   }

   return {
      errors,
      isValid: isEmpty(errors)
   }
}