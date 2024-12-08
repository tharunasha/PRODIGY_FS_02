const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel');

// Create Employee
router.post('/employees', async (req, res) => {
    try {
        // Check if employeeId is provided
        if (!req.body.employeeId) {
            return res.status(400).send({ message: 'Employee ID is required' });
        }
        
        // Validate other required fields
        const { name, position, department, salary } = req.body;
        if (!name || !position || !department || salary === undefined) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Check if employeeId already exists
        const existingEmployee = await Employee.findOne({ employeeId: req.body.employeeId });
        if (existingEmployee) {
            return res.status(400).send({ message: 'Employee ID must be unique. Please choose a different ID.' });
        }

        // Create new employee
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).send({ message: 'Error creating employee', error: error.message });
    }
});

// Get all Employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).send({ message: 'Server Error', error: error.message });
    }
});

// Get an Employee by custom employeeId
router.get('/employees/:employeeId', async (req, res) => {
    try {
        const employee = await Employee.findOne({ employeeId: req.params.employeeId });
        if (!employee) return res.status(404).send({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).send({ message: 'Server Error', error: error.message });
    }
});

// Update an Employee by custom employeeId
router.put('/employees/:employeeId', async (req, res) => {
    try {
        // Check if employeeId is provided
        if (!req.body.employeeId) {
            return res.status(400).send({ message: 'Employee ID is required' });
        }

        // Validate other required fields
        const { name, position, department, salary } = req.body;
        if (!name || !position || !department || salary === undefined) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const employee = await Employee.findOneAndUpdate(
            { employeeId: req.params.employeeId },
            req.body,
            { new: true, runValidators: true } // Ensure validation is applied on update
        );

        if (!employee) return res.status(404).send({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(400).send({ message: 'Error updating employee', error: error.message });
    }
});

// Delete an Employee by custom employeeId
router.delete('/employees/:employeeId', async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({ employeeId: req.params.employeeId });
        if (!employee) return res.status(404).send({ message: 'Employee not found' });
        res.send({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting employee', error: error.message });
    }
});

module.exports = router;
