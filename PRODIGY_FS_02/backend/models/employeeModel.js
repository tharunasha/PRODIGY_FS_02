const mongoose = require('mongoose');

// Define the schema for the Employee
const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true, }, // Ensure it's unique
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true }
});

// Create a model from the schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
