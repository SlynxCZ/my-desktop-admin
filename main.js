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
    const outPath = path.join(__dirname, "out");

    mainWindow.loadURL(`file://${path.join(outPath, "index.html")}`);

    // Přesměrování na správné cesty pro statické soubory
    protocol.interceptFileProtocol("file", (request, callback) => {
      let url = request.url.replace("file:///", "").replace(/\/$/, "");
      url = decodeURIComponent(url); // Oprava problémů s kódováním cesty

      if (url.includes("_next/static/") || url.includes("_next/image/")) {
        callback({ path: path.join(outPath, url) });
      } else if (url.match(/\.(js|css|woff2|png|jpg|jpeg|gif|svg|ico|txt|html)$/)) {
        callback({ path: path.join(outPath, url) });
      } else {
        // Přesměrování na index.html (např. pro routing v Next.js)
        callback({ path: path.join(outPath, "index.html") });
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

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
