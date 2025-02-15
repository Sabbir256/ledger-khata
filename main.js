const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { verifyLogin } = require('./utils/auth');

let mainWindow;

function createWindow(view) {
    mainWindow = new BrowserWindow({
        width: 1080,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    mainWindow.loadFile(`views/${view}.html`);
}

app.whenReady().then(() => {
    createWindow('login'); // Start with the login view

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow('login');
    });
});

ipcMain.handle('navigate', (event, view) => {
    mainWindow.loadFile(`views/${view}.html`);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('admin-login', async (event, data) => {
    return await verifyLogin(data);
})