async function init(){  
  RenderMainMenu("network")
  await GetSystemDataFor("networkinterfaces")
  await GetSystemDataFor("networkinterfacedefault")
}


document.addEventListener("DOMContentLoaded", (e)=>{
  init().then(()=>{
    var interfaceCounter = 0
    CurrentSystemInfo.networkinterfaces.forEach((interface)=>{
      let isInterfaceOn = interface.operstate == "up"
      let isDefaultInterface = interface.iface == CurrentSystemInfo.networkinterfacedefault
      document.querySelector("#ipAddr-accordion").innerHTML += 
      `<div class="card">
        <div class="card-header" id="heading-int${interfaceCounter}">
          <h1 class="mb-0">
            <button class="btn btn-link h1 text-decoration-none" type="button" data-toggle="collapse" data-target="#collapse-int${interfaceCounter}" aria-expanded="false" aria-controls="collapse-int${interfaceCounter}">
              ${interface.iface}
              ${isDefaultInterface?`<span class="badge badge-primary network-status-badge">Default</span>`:""}
              <span class="badge badge-pill network-status-badge badge-${isInterfaceOn?"success":"danger"}">${isInterfaceOn?"Connected":"Disconnected"}</span>
            </button>
            
          </h1>
        </div>
        <div id="collapse-int${interfaceCounter}" class="collapse${(interfaceCounter===0)?" show":""}" aria-labelledby="heading-int${interfaceCounter}" data-parent="#ipAddr-accordion">
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item"><h5>Interface Name</h5>${interface.ifaceName}</li>
              <li class="list-group-item"><h5>Connection Type</h5><span class="capatilized-word">${interface.type==""?"Virtual":interface.type}</span></li>
              <li class="list-group-item"><h5>IPv4</h5>${interface.ip4}</li>
              <li class="list-group-item"><h5>IPv6</h5>${interface.ip6}</li>
              <li class="list-group-item"><h5>MAC Address</h5>${interface.mac.toUpperCase()}</li>
              <li class="list-group-item"><h5>Connection Speed</h5>${interface.speed}</li>
            </ul>
          </div>
        </div>
      </div>`
      interfaceCounter++
    })  
  })
})

document.addEventListener("beforeunload",(e)=>{
  SaveSystemInfoToLocalStorage()
})