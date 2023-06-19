async function init(){
  RenderMainMenu("about")
}


document.addEventListener("DOMContentLoaded", (e)=>{
  init().then(()=>{
    document.querySelector("#external-github-link").addEventListener("click", (e)=>{
      e.preventDefault()
      shell.openExternal("https://github.com/ajcolson/hostinfoapp")
    })
  })
})

document.addEventListener("beforeunload",(e)=>{
  SaveSystemInfoToLocalStorage()
})