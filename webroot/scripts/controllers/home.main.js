async function init(){
  RenderMainMenu("home")
  LoadSystemInfoFromLocalStorage()
}


document.addEventListener("DOMContentLoaded", (e)=>{
  init().then(()=>{
    
  })
})

document.addEventListener("beforeunload",(e)=>{
  SaveSystemInfoToLocalStorage()
})