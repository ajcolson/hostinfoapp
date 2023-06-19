async function init(){
  RenderMainMenu("battery")
  await GetSystemDataFor("battery")
}


document.addEventListener("DOMContentLoaded", (e)=>{
  init().then(()=>{
    EnableAutoRefresh()
    if (!CurrentSystemInfo.battery.hasbattery){
        document.querySelector("#main").style.display = "none"
        document.querySelector("#alerts").innerHTML += `<div class="alert alert-warning" role="alert">This device does not appear to have a battery connected. If you believe this is in error, check the battery connection or contact techincal support for your device.</div>`
    } else {
        document.querySelector("#alerts").style.display = "none"
        document.querySelector("#battery-acconnected").textContent = CurrentSystemInfo.battery.acconnected
        document.querySelector("#battery-ischarging").textContent = CurrentSystemInfo.battery.ischarging
        document.querySelector("#battery-manufacturer").textContent = CurrentSystemInfo.battery.manufacturer
        document.querySelector("#battery-serial").textContent = CurrentSystemInfo.battery.serial
        let progressBGColorClass = "bg-success"
        if (CurrentSystemInfo.battery.percent < 51 )
          progressBGColorClass = "bg-warning"
        if (CurrentSystemInfo.battery.percent < 16 )
          progressBGColorClass = "bg-danger"
        document.querySelector("#battery-progress").innerHTML = `<div class="progress"><div class="progress-bar ${progressBGColorClass}" role="progressbar" aria-valuenow="${CurrentSystemInfo.battery.percent}" aria-valuemin="0" aria-valuemax="100">${CurrentSystemInfo.battery.percent}%</div></div>`
        document.querySelector("div.progress-bar").style.width = `${CurrentSystemInfo.battery.percent}%`
    }
    
  })
})

document.addEventListener("beforeunload",(e)=>{
  SaveSystemInfoToLocalStorage()
})