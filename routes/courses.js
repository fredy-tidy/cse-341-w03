const express = require('express');
const router = express.Router();

const coursesController = require('../controller/students'  );

router.get('/students/getAll', coursesController.getAll);
router.get('/students/getOne/:id', coursesController.getSingle);
router.post('/students/create', coursesController.createStudent);
router.put('/students/update/:id',coursesController.updateStudent);
router.delete('/students/delete/:id',coursesController.deleteStudent);
router.use('/',require('./swagger'));

router.get('/', (req,res) => {
    // swagger.tags=['Hello World']
    res.send('Hellow World at week 03');
});

const classesController = require('../controller/classes');
router.get('/classes/getAllClasses', classesController.getAllClasses);
router.get('/classes/getSingleClass/:id', classesController.getSingleClass);
router.post('/classes/createClass', classesController.createClass);
router.put('/classes/updateClass/:id', classesController.updateClass);
router.delete('/classes/deleteClass/:id', classesController.deleteClass);



module.exports = router;