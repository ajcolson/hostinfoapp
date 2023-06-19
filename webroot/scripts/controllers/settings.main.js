async function init(){
  RenderMainMenu()
  LoadSystemInfoFromLocalStorage()
  document.querySelector("#showOSTabSwitch").checked = AppConfig.Get("ShowOSTab")
  document.querySelector("#showNetworkTabSwitch").checked = AppConfig.Get("ShowNetworkTab")
  document.querySelector("#showBatteryTabSwitch").checked = AppConfig.Get("ShowBatteryTab")
  document.querySelector("#showSpeedtestTabSwitch").checked = AppConfig.Get("ShowSpeedtestTab")
  if ( AppConfig.Get("DevOptsEnabled") )
    EnableDevButtons()
  else DisableDevButtons()
  
}

function EnableDevButtons(){
  document.querySelector("#showDevConsoleBtn").disabled = false
  document.querySelector("#showDebugPageBtn").disabled = false
  document.querySelector("#devOptionsSwitch").checked = true
}
function DisableDevButtons(){
  document.querySelector("#showDevConsoleBtn").disabled = true
  document.querySelector("#showDebugPageBtn").disabled = true
  document.querySelector("#devOptionsSwitch").checked = false
}

document.addEventListener("DOMContentLoaded", (e)=>{
  init().then(()=>{
    document.querySelector("#showDevConsoleBtn").addEventListener("click", (e)=>{
      toggleDevTools()
    })
    document.querySelector("#showDebugPageBtn").addEventListener("click", (e)=>{
      location = "debug.html"
    })
    document.querySelector("#devOptionsSwitch").addEventListener("click", (e)=>{
      if (document.querySelector("#devOptionsSwitch").checked){
        e.preventDefault()
        $('#devOptionsWarnModal').modal()
      } else {
        DisableDevButtons()
        AppConfig.Set("DevOptsEnabled",false)
      }
    })
    document.querySelector("#doEnableDevToolsBtn").addEventListener("click", (e)=>{
      EnableDevButtons()
      AppConfig.Set("DevOptsEnabled",true)
    })
    document.querySelector("#showOSTabSwitch").addEventListener("change", (e)=>{
      ToggleMenuItem("os")
      AppConfig.Set("ShowOSTab",document.querySelector("#showOSTabSwitch").checked)
      RenderMainMenu()
    })
    document.querySelector("#showNetworkTabSwitch").addEventListener("change", (e)=>{
      ToggleMenuItem("network")
      AppConfig.Set("ShowNetworkTab",document.querySelector("#showNetworkTabSwitch").checked)
      RenderMainMenu()
    })
    document.querySelector("#showBatteryTabSwitch").addEventListener("change", (e)=>{
      ToggleMenuItem("battery")
      AppConfig.Set("ShowBatteryTab",document.querySelector("#showBatteryTabSwitch").checked)
      RenderMainMenu()
    })
    document.querySelector("#showSpeedtestTabSwitch").addEventListener("change", (e)=>{
      ToggleMenuItem("speedtest")
      AppConfig.Set("ShowSpeedtestTab",document.querySelector("#showSpeedtestTabSwitch").checked)
      RenderMainMenu()
    })
  })
})

document.addEventListener("unload",(e)=>{
  SaveSystemInfoToLocalStorage()
  debugger
  console.log("Page unload.")
  AppConfig.Save()
})