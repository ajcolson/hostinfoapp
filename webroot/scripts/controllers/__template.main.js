async function init(){
  RenderMainMenu()
  LoadSystemInfoFromLocalStorage()
}


document.addEventListener("DOMContentLoaded", (e)=>{
  init().then(()=>{
    
  })
})

document.addEventListener("beforeunload",(e)=>{
  SaveSystemInfoToLocalStorage()
})