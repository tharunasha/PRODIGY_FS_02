// Load Navbar
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => document.getElementById('navbar').innerHTML = data)
        .catch(error => console.error("Error loading navbar:", error));
}

// Check if Employee ID is unique
async function isEmployeeIdUnique(employeeId) {
    const res = await fetch(`http://localhost:5000/api/employees/${employeeId}`);
    return res.status === 404; // If status is 404, the employee ID is unique
}

// Create Employee
document.getElementById('createForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const employeeId = document.getElementById('employeeId').value.trim();
    const unique = await isEmployeeIdUnique(employeeId);

    if (!unique) {
        alert('Employee ID must be unique. Please choose a different ID.');
        return;
    }

    const employeeData = getEmployeeFormData();

    try {
        const res = await fetch('http://localhost:5000/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Failed to create employee:', errorText);
            throw new Error('Failed to create employee');
        }

        alert('Employee added successfully!');
        document.getElementById('createForm').reset();
    } catch (error) {
        alert(error.message);
    }
});

// Read Employees and display each employee's details
async function loadEmployees() {
    try {
        const res = await fetch('http://localhost:5000/api/employees');
        if (!res.ok) throw new Error('Failed to fetch employees');

        const employees = await res.json();

        document.getElementById('employeeList').innerHTML = employees
            .map(emp => `
                <div>
                    <strong>ID:</strong> ${emp.employeeId} <br>
                    <strong>Name:</strong> ${emp.name} <br>
                    <strong>Position:</strong> ${emp.position} <br>
                    <strong>Department:</strong> ${emp.department} <br>
                    <strong>Salary:</strong> $${emp.salary.toFixed(2)} <br>
                    <hr>
                </div>
            `).join('');
    } catch (error) {
        console.error('Error loading employees:', error);
        document.getElementById('employeeList').innerHTML = 'Failed to load employees';
    }
}

// Load employee details into the form for editing
async function loadEmployee() {
    const id = document.getElementById('employeeId').value.trim();
    if (!id) {
        alert('Please enter an Employee ID to load');
        return;
    }

    try {
        const res = await fetch(`http://localhost:5000/api/employees/${id}`);
        if (!res.ok) throw new Error('Employee not found');

        const emp = await res.json();

        document.getElementById('name').value = emp.name;
        document.getElementById('position').value = emp.position;
        document.getElementById('department').value = emp.department;
        document.getElementById('salary').value = emp.salary;

        document.getElementById('employeeUpdateForm').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

//load button
document.getElementById('loadButton')?.addEventListener('click', loadEmployee);

// Load employees and navbar when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadEmployees();
});

// Submit updated employee details
document.getElementById('updateForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('employeeId').value.trim();
    if (!id) {
        alert('Please load an employee first');
        return;
    }

    const employeeData = getEmployeeFormData();

    try {
        const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Error details:', errorText);
            throw new Error('Failed to update employee');
        }

        alert('Employee updated successfully!');
        document.getElementById('updateForm').reset();
        document.getElementById('employeeUpdateForm').style.display = 'none';
    } catch (error) {
        alert(error.message);
        console.error('Error updating employee:', error);
    }
});

// Delete Employee
document.getElementById('deleteForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('employeeId').value.trim();
    if (!id) {
        alert('Please enter an Employee ID to delete');
        return;
    }

    try {
        const res = await fetch(`http://localhost:5000/api/employees/${id}`, { method: 'DELETE' });

        if (!res.ok) throw new Error('Failed to delete employee');

        alert('Employee deleted successfully!');
        document.getElementById('deleteForm').reset();
    } catch (error) {
        alert(error.message);
        console.error('Error deleting employee:', error);
    }
});

// Helper function to get employee data from form inputs
function getEmployeeFormData() {
    return {
        employeeId: document.getElementById('employeeId').value,
        name: document.getElementById('name').value,
        position: document.getElementById('position').value,
        department: document.getElementById('department').value,
        salary: parseFloat(document.getElementById('salary').value)
    };
}

// Load employees and navbar when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadEmployees();
});
