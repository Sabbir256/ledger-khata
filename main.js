const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Database = require('./encrypt'); // Secure database handler

let win;

app.whenReady().then(() => {
    win = new BrowserWindow({
        width: 1080,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Improves security
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    win.loadFile('index.html');
});

// Handle database actions from renderer
ipcMain.handle('insert-transaction', async (event, data) => {
    return Database.insertTransaction(data.amount, data.description);
});

ipcMain.handle('fetch-transactions', async () => {
    return Database.getTransactions();
});
