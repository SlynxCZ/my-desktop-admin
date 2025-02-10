const { app, BrowserWindow, protocol } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, "out", "index.html")}`);

    // 🔥 Oprava cesty ke statickým souborům Next.js
    protocol.interceptFileProtocol("file", (request, callback) => {
      const url = request.url.replace("file:///", "").replace(/\/$/, "");

      if (url.includes("_next/static/") || url.includes("_next/image/")) {
        callback({ path: path.join(__dirname, "out", url) });
      } else if (url.endsWith(".js") || url.endsWith(".css") || url.endsWith(".woff2")) {
        callback({ path: path.join(__dirname, "out", url) });
      } else {
        callback({ path: path.normalize(url) });
      }
    });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
