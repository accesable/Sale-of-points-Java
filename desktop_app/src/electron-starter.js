const { app, BrowserWindow } = require("electron");
const path = require("path");
// const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  //   const startUrl = isDev
  //     ? "http://localhost:3000"
  //     : `file://${path.join(__dirname, "../build/index.html")}`;
  const startUrl = "http://localhost:3001";
  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
