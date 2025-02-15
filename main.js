const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { verifyLogin } = require('./src/helpers/auth');
const db = require('./src/lib/db');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js'),
            nodeIntegration: false
        }
    });

    // Load React during development
    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:5173');
    } else {
        // Load built React app in production
        mainWindow.loadFile(path.join(__dirname, 'core-ui/dist/index.html'));
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});


ipcMain.handle('authenticate', async (event, data) => verifyLogin(data));
ipcMain.handle('get-products', async (event) => db.getProducts());
ipcMain.handle('insert-product', async (event, data) => db.insertProduct(data));