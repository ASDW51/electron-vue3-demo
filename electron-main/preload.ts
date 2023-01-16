import {contextBridge,ipcRenderer} from "electron"

contextBridge.exposeInMainWorld("preload",{
    aa:()=>console.log("this is preload aa function"),
    sendTest:(arg:string)=>{
        ipcRenderer.send("test",arg)
    }
})