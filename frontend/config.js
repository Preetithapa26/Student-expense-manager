const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000/expenses'
    : 'https://student-expense-manager.onrender.com/expenses'; // Replace prior to GitHub frontend deployment
