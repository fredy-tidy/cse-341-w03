const validator = require("../helpers/validate");
const validatorStudent = require("../helpers/validate");

const saveStudents = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    email: "required|email",
    telefone: "required|string",
    birthday: "requires|date|before_or_equal:today",
    Nationality: "required|string",
    registration_date: "required|date|after_or_equal:today"
  };
  validatorStudent(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveClasses = (req, res, next) => {
  const validationRule = {
    course_code: "required|string",
    course_name: "required|string",
    rolled_students: "array|min:0",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveStudents,
  saveClasses
  
};
