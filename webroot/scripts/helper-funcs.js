let $ = require('jquery')
require('popper.js')
require('bootstrap')

const shell = require('electron').shell
const app = require("electron").app
const remote = require("electron").remote
const fs = require("fs")

let AppConfig = {
  Save(){
    console.log("app config save")
    fs.writeFileSync("hostinfoapp.config.json", JSON.stringify(AppConfig.__current))
  },
  Load(){
    console.log("app config load")
    if (fs.existsSync("hostinfoapp.config.json")){
        AppConfig.__current = JSON.parse(fs.readFileSync("hostinfoapp.config.json"))
    } else {
        AppConfig.__current = AppConfig.__default
        AppConfig.Save()
    }
  },
  Get(id){
    return AppConfig.__current[id]
  },
  Set(id,val){
    AppConfig.__current[id] = val
    AppConfig.Save()
  },
  __current:{},
  __default:{
      ShowOSTab: true,
      ShowNetworkTab: true,
      ShowBatteryTab: true,
      ShowSpeedtestTab: false,
      CurrentTheme: "light",
      DevOptsEnabled: false
  }

}
AppConfig.Load()
document.addEventListener("beforeunload",(e)=>{
  debugger
  console.log("Page unload in helper.")
  AppConfig.Save()
})

function GetCurrentUnixTimestamp(){
  return Math.floor(new Date() / 1000)
}

function DidAppJustStart(){
  debugger
  if (localStorage.getItem("isthisthefirstrun")===null){
    localStorage.setItem("isthisthefirstrun", "no")
    return true
  } else return false
}

function GetWindows10VersionFromBuildNumber(buildnum){
  if (typeof buildnum != "number")
    buildnum = Number.parseInt(buildnum)
  
  if (buildnum <= 10240)
    return "1507"
  else if (buildnum <= 10586)
    return "1511"
  else if (buildnum <= 14393)
    return "1607"
  else if (buildnum <= 15063)
    return "1703"
  else if (buildnum <= 16299)
    return "1709"
  else if (buildnum <= 17134)
    return "1803"
  else if (buildnum <= 17763)
    return "1809"
  else if (buildnum <= 18362)
    return "1903"
  else if (buildnum <= 18363)
    return "1910"
  else if (buildnum <= 19041)
    return "2004"
  else return "???"
}

function MakeHTMLListFor(data){
  let listString = `<ul class="list-group">`
  if (typeof data == "object"){
    for (let key in data){
      if (typeof data[key] == "object"){
        listString += `<h5>${key}</h5>` + MakeHTMLListFor(data[key])
      } else {
        listString += `<li class="list-group-item"><h5>${key}</h5>${data[key]}</li>`
      }
    }
  } else {
    listString += `<li class="list-group-item">${data}</li>`
  }
  return listString + `</ul>`
}

let autoRefreshTimer = null
function EnableAutoRefresh(){
  autoRefreshTimer = setTimeout(()=>{
    window.location.reload()
  },60000)
}
function DisableAutoRefresh(){
  clearTimeout(autoRefreshTimer)
  autoRefreshTimer = null
}

function closeApp(){
  window.close()
}

function toggleDevTools(){
  remote.getCurrentWindow().toggleDevTools()
}
