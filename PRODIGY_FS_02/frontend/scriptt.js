document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user input values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageElement = document.getElementById('message');

    // Clear any previous message
    messageElement.innerText = '';

    // Check credentials
    if (username === 'Administrator' && password === 'K.balaji1@$') {
        alert('Login successful!');
        // Redirect to navbar.html or load its content
        window.location.href = 'navbar.html';
    } else {
        // Show error message
        messageElement.innerText = 'Invalid username or password. Please try again.';
        // Clear password field for security
        document.getElementById('password').value = '';
    }
});
