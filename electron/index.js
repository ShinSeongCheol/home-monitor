const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const envPath = path.join(__dirname, ".env");
require('dotenv').config({path: envPath})

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 960
  })

  win.loadURL(process.env.URL)
}

app.whenReady().then(() => {
  createWindow()
})