const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = require("electron").ipcMain;


let mainWindow;

createWindow = () => {
  mainWindow = new BrowserWindow ({
    webPreferences: {
      preload: __dirname + '/preload.js',
      enableRemoteModule: true
    }
  })
  mainWindow.loadURL('file://' + __dirname + '/app/index.html')
}

app.on("ready", createWindow)

ipc.on("close", () => {
  mainWindow.close()
})
