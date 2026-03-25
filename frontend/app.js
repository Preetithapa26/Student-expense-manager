// DOM Bindings
const expenseForm = document.getElementById('expense-form');
const titleInput = document.getElementById('extitle');
const amountInput = document.getElementById('examount');
const dateInput = document.getElementById('exdate');
const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total-display');

let expenses = [];

// Initialize UI
document.addEventListener('DOMContentLoaded', loadExpenses);

// Events
expenseForm.addEventListener('submit', handleAddExpense);

// Read API
async function loadExpenses() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('API down');
        expenses = await response.json();
        updateUI();
    } catch (e) {
        expenseList.innerHTML = `<li class="empty-state">Unable to load data. Is the backend running?</li>`;
        console.error(e);
    }
}

// Update UI + Total Calculator
function updateUI() {
    expenseList.innerHTML = '';
    
    // Total calculation
    const total = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    totalDisplay.innerText = `$${total.toFixed(2)}`;

    if (expenses.length === 0) {
        expenseList.innerHTML = `<li class="empty-state">No recorded expenses yet.</li>`;
        return;
    }

    expenses.forEach(exp => {
        const li = document.createElement('li');
        li.className = 'transaction-item';
        li.innerHTML = `
            <div class="trans-info">
                <span class="trans-title">${escapeHTML(exp.title)}</span>
                <span class="trans-date">${escapeHTML(exp.date)}</span>
            </div>
            <div class="trans-actions">
                <span class="trans-amount">$${parseFloat(exp.amount).toFixed(2)}</span>
                <button class="delete-btn" onclick="deleteExpense(${exp.id})" title="Delete">✖</button>
            </div>
        `;
        expenseList.appendChild(li);
    });
}

// POST API
async function handleAddExpense(e) {
    e.preventDefault();
    
    const payload = {
        title: titleInput.value.trim(),
        amount: amountInput.value,
        date: dateInput.value
    };

    if (!payload.title || !payload.amount) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const added = await response.json();
            expenses.unshift(added); // Append visually to top
            expenseForm.reset();
            updateUI();
        }
    } catch (e) {
        console.error('Failed to post', e);
    }
}

// DELETE API
async function deleteExpense(id) {
    if (!confirm('Are you certain you want to remove this log?')) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            expenses = expenses.filter(ex => ex.id !== id);
            updateUI();
        }
    } catch (e) {
        console.error('Failed to delete', e);
    }
}

// HTML Escaper for security
function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag])
    );
}
