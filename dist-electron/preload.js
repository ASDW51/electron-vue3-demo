"use strict";const e=require("electron");e.contextBridge.exposeInMainWorld("preload",{aa:()=>console.log("this is preload aa function"),sendTest:n=>{e.ipcRenderer.send("test",n)}});
