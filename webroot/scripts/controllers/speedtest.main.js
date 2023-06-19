async function init(){
  RenderMainMenu("speedtest")
  LoadSystemInfoFromLocalStorage()
}


document.addEventListener("DOMContentLoaded", (e)=>{
  init().then(()=>{
    document.querySelector("#webview").shadowRoot.querySelector("iframe").style.width = "inherit"
    document.querySelector("#webview").shadowRoot.querySelector("iframe").style.height = "inherit"
    document.querySelector("#external-fastdotcom-link").addEventListener("click", (e)=>{
      e.preventDefault()
      shell.openExternal("https://fast.com/")
    })
  })
})

document.addEventListener("beforeunload",(e)=>{
  SaveSystemInfoToLocalStorage()
})