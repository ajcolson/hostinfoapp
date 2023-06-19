var CurrentSystemInfo = {
  "osinfo":{},
  "system":{},
  "bios":{},
  "baseboard":{},
  "chassis":{},
  "cpu":{},
  "cpuflags":{},
  "cpucache":{},
  "cpucurrentspeed":{},
  "cputemperature":{},
  "mem":{},
  "memlayout":{},
  "battery":{},
  "graphics":{},
  "currentload":{},
  "fullload":{},
  "processes":{},
  "disklayout":{},
  "blockdevices":{},
  "disksio":{},
  "fssize":{},
  "fsopenfiles":{},
  "fsstats":{},
  "networkinterfaces":{},
  "networkinterfacedefault":{},
  "networkgatewaydefault":{},
  "networkstats":{},
  "networkconnections":{},
  "wifinetworks":{}
}

var CurrentSystemInfoLastCheck = {
  "osinfo":0,
  "system":0,
  "bios":0,
  "baseboard":0,
  "chassis":0,
  "cpu":0,
  "cpuflags":0,
  "cpucache":0,
  "cpucurrentspeed":0,
  "cputemperature":0,
  "mem":0,
  "memlayout":0,
  "battery":0,
  "graphics":0,
  "currentload":0,
  "fullload":0,
  "processes":0,
  "disklayout":0,
  "blockdevices":0,
  "disksio":0,
  "fssize":0,
  "fsopenfiles":0,
  "fsstats":0,
  "networkinterfaces":0,
  "networkinterfacedefault":0,
  "networkgatewaydefault":0,
  "networkstats":0,
  "networkconnections":0,
  "wifinetworks":0
}

function IsSystemInfoStale(which, threshold = 5){
  let whichLastUpdated = (typeof CurrentSystemInfoLastCheck[which] == "string")?
                          Number.ParseInt(CurrentSystemInfoLastCheck[which]):
                          CurrentSystemInfoLastCheck[which]
  
  let now = GetCurrentUnixTimestamp()
  let timediff = ( now - whichLastUpdated )
  return ( timediff >= threshold )
}

function SaveSystemInfoToLocalStorage(){
  localStorage.setItem("sysdatalastcheck",JSON.stringify(CurrentSystemInfoLastCheck))
  localStorage.setItem("sysdata",JSON.stringify(CurrentSystemInfo))
}
function LoadSystemInfoFromLocalStorage(){
  CurrentSystemInfoLastCheck = JSON.parse(localStorage.getItem("sysdatalastcheck"))
  CurrentSystemInfo = JSON.parse(localStorage.getItem("sysdata"))
}
async function GetSystemDataFor(which){
  if ( IsSystemInfoStale(which) ){
    const data = await IPC_RequestSystemInfo(which)
    CurrentSystemInfo[which] = data
    CurrentSystemInfoLastCheck[which] = GetCurrentUnixTimestamp()
    SaveSystemInfoToLocalStorage()
  } else {
    LoadSystemInfoFromLocalStorage()
  }

}





