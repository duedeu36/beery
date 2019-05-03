const Validator = require("validator");
const isEmpty = require("./is-empty");

// This beer validation is for beers on the profile page (array in profil), NOT the primary beers on beerwall later (which is much more complex and an object)
module.exports = function validateBeersProfileInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.alc = !isEmpty(data.alc) ? data.alc : "";
  data.origin = !isEmpty(data.origin) ? data.origin : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Please add the beer name";
  }

  if (Validator.isEmpty(data.alc)) {
    errors.alc = "Please add the % vol, if you rememeber ;)";
  }
  if (Validator.isEmpty(data.origin)) {
    errors.origin = "Add the origin of the beer";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "How much does the beer cost?";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Describe it in a few words";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
