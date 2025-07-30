const express = require("express");
const router = express.Router();

const validation = require("../middleware/validate");
const coursesController = require("../controller/students");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/students/getAll", coursesController.getAll);
router.get("/students/getOne/:id", coursesController.getSingle);
router.post(
  "/students/create",
  isAuthenticated,
  validation.saveStudents,
  coursesController.createStudent
);
router.put(
  "/students/update/:id",
  isAuthenticated,
  validation.saveStudents,
  coursesController.updateStudent
);
router.delete(
  "/students/delete/:id",
  isAuthenticated,
  coursesController.deleteStudent
);
router.use("/", require("./swagger"));

/**
 * router.get('/', (req,res) => {
    // swagger.tags=['Hello World']
//    res.send('Hellow World at week 03');
//});

*/
const classesController = require("../controller/classes");
const passport = require("passport");
router.get("/classes/getAllClasses", classesController.getAllClasses);
router.get("/classes/getSingleClass/:id", classesController.getSingleClass);
router.post(
  "/classes/createClass",
  isAuthenticated,
  validation.saveClasses,
  classesController.createClass
);
router.put(
  "/classes/updateClass/:id",
  isAuthenticated,
  validation.saveClasses,
  classesController.updateClass
);
router.delete(
  "/classes/deleteClass/:id",
  isAuthenticated,
  classesController.deleteClass
);

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
