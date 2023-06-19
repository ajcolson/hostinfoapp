const { app, BrowserWindow, ipcMain, session, Menu } = require ('electron')
const si = require('systeminformation')

let mainWindow


function appReadyMain(){
  createMainWindow()
  Menu.setApplicationMenu(null)
}

function createMainWindow(){
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    }
  })
  mainWindow.loadFile('webroot/home.html')
  mainWindow.on('closed', ()=>{
    mainWindow = null
  })

}

app.on('ready', appReadyMain)
app.on('window-all-closed', ()=>{
  app.quit()
})
app.on('activate', ()=>{
  if (mainWindow === null)
    createMainWindow()
})


// IPC
ipcMain.handle("request-system-info", async(event,...args)=>{
  let theReturnData = {
    status: 0,
    data: {}
  }


  if (args.length !== 1 ) {
    theReturnData.status = 1
    theReturnData.data = "Bad request made. There should be only one argument to this request."
  }
  if ( !(args[0] instanceof String) ){
    theReturnData.status = 1
    theReturnData.data = "Bad request made. The argument must be of type String."
  }  
  
  switch (args[0].toLowerCase()){
    case "osinfo":
      theReturnData.data = await si.osInfo()
    break;
    case "system":
      theReturnData.data = await si.system()
    break;
    case "bios":
      theReturnData.data = await si.bios()
    break;
    case "baseboard":
      theReturnData.data = await si.baseboard()
    break;
    case "chassis":
      theReturnData.data = await si.chassis()
    break;
    case "cpu":
      theReturnData.data = await si.cpu()
    break;
    case "cpuflags":
      theReturnData.data = await si.cpuFlags()
    break;
    case "cpucache":
      theReturnData.data = await si.cpuCache()
    break;
    case "cpucurrentspeed":
      theReturnData.data = await si.cpuCurrentspeed()
    break;
    case "cputemperature":
      theReturnData.data = await si.cpuTemperature()
    break;
    case "mem":
      theReturnData.data = await si.mem()
    break;
    case "memlayout":
      theReturnData.data = await si.memLayout()
    break;
    case "battery":
      theReturnData.data = await si.battery()
    break;
    case "graphics":
      theReturnData.data = await si.graphics()
    break;
    case "currentload":
      theReturnData.data = await si.currentLoad()
    break;
    case "fullload":
      theReturnData.data = await si.fullLoad()
    break;
    case "processes":
      theReturnData.data = await si.processes()
    break;
    case "disklayout":
      theReturnData.data = await si.diskLayout()
    break;
    case "blockdevices":
      theReturnData.data = await si.blockDevices()
    break;
    case "disksio":
      theReturnData.data = await si.disksIO()
    break;
    case "fssize":
      theReturnData.data = await si.fsSize()
    break;
    case "fsopenfiles":
      theReturnData.data = await si.fsOpenFiles()
    break;
    case "fsstats":
      theReturnData.data = await si.fsStats()
    break;
    case "networkinterfaces":
      theReturnData.data = await si.networkInterfaces()
    break;
    case "networkinterfacedefault":
      theReturnData.data = await si.networkInterfaceDefault()
    break;
    case "networkgatewaydefault":
      theReturnData.data = await si.networkGatewayDefault()
    break;
    case "networkstats":
      theReturnData.data = await si.networkStats("*")
    break;
    case "networkconnections":
      theReturnData.data = await si.networkConnections()
    break;
    case "wifinetworks":
      theReturnData.data = await si.wifiNetworks()
    break;
    default: break;
  }

  return theReturnData

})