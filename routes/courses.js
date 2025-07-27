const express = require('express');
const router = express.Router();



const validationStudent = require('../middleware/validateStudent')
const coursesController = require('../controller/students'  );

router.get('/students/getAll', coursesController.getAll);
router.get('/students/getOne/:id', coursesController.getSingle);
router.post('/students/create', validationStudent.saveStudents, coursesController.createStudent);
router.put('/students/update/:id', validationStudent.saveStudents,coursesController.updateStudent);
router.delete('/students/delete/:id',coursesController.deleteStudent);
router.use('/',require('./swagger'));

router.get('/', (req,res) => {
    // swagger.tags=['Hello World']
    res.send('Hellow World at week 03');
});

const validation = require('../middleware/validate');
const classesController = require('../controller/classes');
router.get('/classes/getAllClasses', classesController.getAllClasses);
router.get('/classes/getSingleClass/:id', classesController.getSingleClass);
router.post('/classes/createClass', validation.saveClasses, classesController.createClass);
router.put('/classes/updateClass/:id', validation.saveClasses, classesController.updateClass);
router.delete('/classes/deleteClass/:id', classesController.deleteClass);



module.exports = router;