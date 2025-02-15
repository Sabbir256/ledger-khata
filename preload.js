const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    navigate: (view) => ipcRenderer.invoke('navigate', view),
    // sendTransaction: (data) => ipcRenderer.invoke('insert-transaction', data),
    // getTransactions: () => ipcRenderer.invoke('fetch-transactions'),
    login: (data) => ipcRenderer.invoke('admin-login', data)
});
