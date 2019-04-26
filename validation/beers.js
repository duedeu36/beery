const Validator = require("validator");
const isEmpty = require("./is-empty");

// This beer validation is for beers on the profile page (array in profil), NOT the primary beers on beerwall later (which is much more complex and an object)
module.exports = function validateBeersInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.alc = !isEmpty(data.alc) ? data.alc : "";
  data.origin = !isEmpty(data.origin) ? data.origin : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Add a handle";
  }

  if (
    !Validator.isLength(data.handle, {
      min: 3,
      max: 300
    })
  ) {
    errors.handle = "Handle must be between 3 and 300 chatacters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Please add the beer name";
  }

  if (Validator.isEmpty(data.alc)) {
    errors.alc = "Please add the % vol, if you rememeber ;)";
  }

  if (Validator.isEmpty(data.origin)) {
    errors.origin = "Tell us the origin of the beer";
  }

  if (
    !Validator.isLength(data.description, {
      min: 3,
      max: 300
    })
  ) {
    errors.description = "Description must be between 3 and 300 chatacters";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description needed";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Please add the % vol, if you rememeber ;)";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
