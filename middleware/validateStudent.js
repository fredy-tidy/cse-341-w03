
const validatorStudent = require("../helpers/validateStudent");

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


module.exports = {
  saveStudents
  
};
