async function init(){
  RenderMainMenu("os")
  await GetSystemDataFor("osinfo")
}


document.addEventListener("DOMContentLoaded", (e)=>{
  init().then(()=>{
    document.querySelector("#osinfo-hostname").textContent = CurrentSystemInfo.osinfo.hostname
    document.querySelector("#osinfo-distro").textContent = CurrentSystemInfo.osinfo.distro
    document.querySelector("#osinfo-build").textContent = CurrentSystemInfo.osinfo.build
    document.querySelector("#osinfo-arch").textContent = CurrentSystemInfo.osinfo.arch
    document.querySelector("#osinfo-kernel").textContent = CurrentSystemInfo.osinfo.kernel
    document.querySelector("#osinfo-platform").textContent = CurrentSystemInfo.osinfo.platform
    document.querySelector("#osinfo-release").textContent = CurrentSystemInfo.osinfo.release
    document.querySelector("#osinfo-serial").textContent = CurrentSystemInfo.osinfo.serial

    if (CurrentSystemInfo.osinfo.platform == "win32" && CurrentSystemInfo.osinfo.kernel.split(".")[0] == "10"){
      let winver = GetWindows10VersionFromBuildNumber(CurrentSystemInfo.osinfo.build)
      document.querySelector("#osinfo-stats-list").innerHTML = `<li class="list-group-item"><h4>Windows 10 Version</h4><span>${winver}</span></li>` + document.querySelector("#osinfo-stats-list").innerHTML
    }
    if (CurrentSystemInfo.osinfo.platform == "darwin"){
      document.querySelector("#osinfo-stats-list").innerHTML = `<li class="list-group-item"><h4>Codename</h4><span>${CurrentSystemInfo.osinfo.codename}</span></li>` + document.querySelector("#osinfo-stats-list").innerHTML
    }    

  })
})

document.addEventListener("beforeunload",(e)=>{
  SaveSystemInfoToLocalStorage()
})