const Employee = require('../models/employeeModel');

exports.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
};

exports.createEmployee = async (req, res) => {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json(newEmployee);
};

// Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: 'Error updating employee', error });
    }
};


exports.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
};
