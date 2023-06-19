const ipc = require("electron").ipcRenderer

async function IPC_RequestSystemInfo(whatToGet){
  try {
    const result = await ipc.invoke("request-system-info", whatToGet)
    return result.data
  } catch(e) {
    console.log(`There was an error requesting "${whatToGet}". Deatiled logs below. Returning a null object.`)
    console.log(e)
    return {}
  }
}