const ValidatorStudent = require("validatorjs");
const validatorStudent = (body, rules, customMessages, callback) => {
  const validation = new ValidatorStudent(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

module.exports = validatorStudent;
