async function init(){
  LoadSystemInfoFromLocalStorage()
  for (var key in CurrentSystemInfo){
    await GetSystemDataFor(key)
  }
}


document.addEventListener("DOMContentLoaded", (e)=>{
  init().then(()=>{
    document.querySelector("#loading-status").style.display = "none"
    let dataOutToAppend = `<div class="alert alert-info" role="alert">Data Loaded! Be sure to check the console for more info!</div>`
    for(var sysKey in CurrentSystemInfo){
        dataOutToAppend += `<h1>${sysKey}</h1><ul class="list-group">`   
        let dataItem = CurrentSystemInfo[sysKey]
        if (typeof dataItem == "object"){
          for (var dKey in dataItem){
            let dataItemN = dataItem[dKey]
            if (typeof dataItemN == "object"){
              dataOutToAppend += `<h5>${dKey}</h5>` + MakeHTMLListFor(dataItemN)
            } else {
              dataOutToAppend += `<li class="list-group-item"><h5>${dKey}</h5>${dataItem[dKey]}</li>`
            }
          }
        } else {
          dataOutToAppend += `<li class="list-group-item"><h5>${sysKey}</h5>${dataItem}</li>`
        }
        dataOutToAppend += `</ul>`
    }
    document.querySelector("#main").innerHTML += dataOutToAppend
  })
})

document.addEventListener("beforeunload",(e)=>{
  SaveSystemInfoToLocalStorage()
})