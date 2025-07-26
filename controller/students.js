const mongodb = require('../model/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['students']
    try {
      const result = await mongodb.getDb().db().collection('students').find();
      const contacts = await result.toArray(); 
         res.status(200).json(contacts);
       } catch (error) {
      console.error('Error to get students', error);
     res.status(500).json({ message: 'Error in server.' });
      }
  };

  const getSingle = async (req, res) => {
    //#swagger.tags=['students']

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to find a student.');
    }


    try {
      const contactId = ObjectId.createFromHexString(req.params.id);
      const contact = await mongodb.getDb().db().collection('students').findOne({ _id: contactId });
  
      if (!contact) {
        res.status(404).json({ message: 'Student no found' });
        return;
       }
       res.status(200).json(contact);
  
    } catch (error) {
      console.error('Error to get student:', error);
      
      res.status(500).json({ message: 'Error Server to get student' });
     }
  };

  const createStudent = async (req, res) => {
    //#swagger.tags=['students']
    if (!req.body.firstName || !req.body.lastName || !req.body.email) {
      return res.status(400).json({ message: 'First name, last name, and email are required fields.' });
    }
     const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        telefone: req.body.telefone,
        birthday: req.body.birthday,
        Nationality: req.body.Nationality,
        registration_date: req.body.registration_date
    };
    try {
      const response = await mongodb.getDb().db().collection('students').insertOne(student);
       if (response.acknowledged) {
        res.status(201).json({
          message: 'student created successfully',
          contactId: response.insertedId // Return the ID of the newly created contact
        });
      } else {
         res.status(500).json({ message: 'Failed to create student: Operation not acknowledged by database.' });
      }
    } catch (error) {
      console.error('Error creating contact:', error); // Log the actual error for debugging
  
      // Handle specific MongoDB errors (e.g., duplicate key)
      if (error.code === 11000) { // MongoDB duplicate key error code
          return res.status(409).json({ message: 'A contact with this email already exists.' });
      }
  
      // Generic catch-all for other unexpected errors
      res.status(500).json({ message: error.message || 'An unexpected error occurred while creating the contact.' });
    }
  };
 
  const updateStudent = async (req, res) => {
    //#swagger.tags=['students']

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to find a student.');
    }
    const studentId = ObjectId.createFromHexString(req.params.id);
    if (!req.body.firstName || !req.body.lastName || !req.body.email) {
      return res.status(400).json({ message: 'First name, last name, and email are required fields.' });
    }
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      telefone: req.body.telefone,
      birthday: req.body.birthday,
      Nationality: req.body.Nationality,
      registration_date: req.body.registration_date
  };
   const response = await mongodb.getDb().db().collection('students').replaceOne({_id:studentId}, student);
   if (response.modifiedCount > 0){
     res.status(200).json({
      message: 'Student update successfully',
      studentId: studentId //  as
    });
   } else {
     res.status(500).json(response.error || 'Some error occurred while updating the student')
   }
  };
  
  const deleteStudent = async (req, res) => {
    //#swagger.tags=['students']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to find a student to delete.');
    }

    const studentId = ObjectId.createFromHexString(req.params.id);
   
   const response = await mongodb.getDb().db().collection('students').deleteOne({_id: studentId});
   if (response.deletedCount > 0){
     res.status(200).json({
      message: 'Student delete successfully',
      studentId: studentId 
    });
   } else {
     res.status(500).json(response.error || 'Some error occurred while delete the student')
   }
  };
  
  
  
  
  module.exports = {
      getAll,
      getSingle,
      createStudent,
      updateStudent,
      deleteStudent
  };