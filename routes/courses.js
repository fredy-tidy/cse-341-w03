const express = require('express');
const router = express.Router();

const coursesController = require('../controller/students');

router.get('/students/getAll', coursesController.getAll);
router.get('/students/getOne/:id', coursesController.getSingle);
router.post('/students/create', coursesController.createStudent);
router.put('/students/update/:id',coursesController.updateStudent);
router.delete('/students/delete/:id',coursesController.deleteStudent);
router.use('/',require('./swagger'));

router.get('/', (req,res) => {
    // swagger.tags=['Hello World']
    res.send('Hellow World');
});


module.exports = router;