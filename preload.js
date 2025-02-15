const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    sendTransaction: (data) => ipcRenderer.invoke('insert-transaction', data),
    getTransactions: () => ipcRenderer.invoke('fetch-transactions')
});
