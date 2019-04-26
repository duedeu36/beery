const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBeersInput(data) {
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

// fürs profil! validation for beers for profile, NOT for the primary beer
