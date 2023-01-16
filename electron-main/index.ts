import {app,BrowserWindow,Menu,IpcMain, ipcMain} from "electron"
let path = require("path")
let  mainWindow

app.whenReady().then(()=>{
  ipcMain.on("test",(changele,args)=>{
    console.log(args)
  })
  mainWindow = new BrowserWindow({
      width:800,
      height:600,
      webPreferences:{
          nodeIntegration:false,
          contextIsolation:true,
          preload:path.join(__dirname,"../dist-electron/preload.js")
      }
  })
  Menu.setApplicationMenu(null)
  // console.log(process.env)
  if(process.env.VITE_TEST){
      //测试打包后的渲染进程文件
      mainWindow.loadFile(path.join(__dirname,'../dist/index.html'));
  }else if (process.env.VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // load your file
    mainWindow.loadFile(path.join(__dirname,'../dist/index.html'));
  }
  let mainContent = mainWindow.webContents
  if(process.env.NODE_ENV=="development" || process.env.VITE_TEST){
    mainContent.toggleDevTools()
  }
})

app.on('window-all-closed', () => {
  app.quit()
})