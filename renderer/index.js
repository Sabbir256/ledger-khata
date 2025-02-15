// const { ipcRenderer } = require('electron');

document.getElementById('save-btn').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;

    await window.api.sendTransaction({ amount, description });
    loadTransactions();
});

async function loadTransactions() {
    const transactions = await window.api.getTransactions();

    let table = document.getElementById('transactions');
    table.innerHTML = '';

    transactions.forEach(txn => {
        let row = `<tr><td>${txn.amount}</td><td>${txn.description}</td><td>${txn.date}</td></tr>`;
        table.innerHTML += row;
    });
}

// Load transactions when the UI starts
window.onload = loadTransactions;
