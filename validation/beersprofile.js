const Validator = require("validator");
const isEmpty = require("./is-empty");

// This beer validation is for beers on the profile page (array in profil), NOT the primary beers on beerwall later (which is much more complex and an object)
module.exports = function validateBeersProfileInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.alc = !isEmpty(data.alc) ? data.alc : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Please add the beer name";
  }

  if (Validator.isEmpty(data.alc)) {
    errors.alc = "Please add the % vol, if you rememeber ;)";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
