// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'StudentSchema'
const CourseSchema = new Schema({
    id: String,
    coursecode: String,
    coursename: String,
    section: String,
    semester: String,
   
    
    
	
});

// Create the 'Student' model out of the 'StudentSchema'
module.exports = mongoose.model('Course', CourseSchema);