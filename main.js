const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = require("electron").ipcMain;

let mainWindow;

createWindow = () => {
  mainWindow = new BrowserWindow ({
  //  width: 500,
  //  height: 500,
    webPreferences: {
      preload: __dirname + '/preload.js'
    }
  })
  mainWindow.loadURL('file://' + __dirname + '/app/index.html')


}

app.on("ready", createWindow)

ipc.on("reload", () => {
  mainWindow.reload()
})

ipc.on("close", () => {
  mainWindow.close()
})
