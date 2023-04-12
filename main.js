console.log("WORKOVERFLOW SETTLED ON ELECTRON.JS");

const { app, BrowserWindow, ipcMain } = require('electron');
const {webFrame} = require('electron')
const ipc = ipcMain
const path = require('path')

// modify your existing createWindow() function
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1100,
    height: 650,
    minHeight: 650,
    minWidth: 1100,
    title: 'WorkOverflow',
    frame: false,
    icon:'./workoverflow.png',
    webPreferences: {
      devTools: false,
        nodeIntegration: true,
        contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  let webContents = win.webContents
  webContents.on('did-finish-load', () => {
    webContents.setZoomFactor(1)
    webContents.setVisualZoomLevelLimits(1, 1);
  })

  ipc.on('min', () => {
    win.minimize()
  });
  ipc.on('restore-max', () => {
    if (win.isMaximized()) {
        win.restore()
    } else {
        win.maximize()
    }
  });
  ipc.on('close', () => {
    win.close()
  });
}


app.commandLine.appendSwitch('disable-pinch');

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })