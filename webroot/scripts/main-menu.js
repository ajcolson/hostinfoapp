let MainMenu = [
  {
    id: "home",
    href: "home.html",
    text: "",
    mdi_icon: "mdi-home",
    disabled: false,
    visible: true
  },
  {
    id: "os",
    href: "os.html",
    text: "OS",
    mdi_icon: "mdi-desktop-classic",
    disabled: false,
    visible: AppConfig.Get("ShowOSTab")
  },
  {
    id: "network",
    href: "network.html",
    text: "Network",
    mdi_icon: "mdi-ip-network-outline",
    disabled: false,
    visible: AppConfig.Get("ShowNetworkTab")
  },
  {
    id: "battery",
    href: "battery.html",
    text: "Battery",
    mdi_icon: "mdi-battery-unknown",
    disabled: false,
    visible: AppConfig.Get("ShowBatteryTab")
  },
  {
    id: "speedtest",
    href: "speedtest.html",
    text: "Speedtest",
    mdi_icon: "mdi-speedometer",
    disabled: false,
    visible: AppConfig.Get("ShowSpeedtestTab")
  }
]

function ToggleMenuItem(menuItemID){
  for (const menuItemIndex in MainMenu){
    const menuItem = MainMenu[menuItemIndex]
    if (menuItem.id == menuItemID){
      menuItem.visible = !menuItem.visible
      break
    }
  }
}

function GetMenuItem(menuItemID){
  for (const menuItemIndex in MainMenu){
    const menuItem = MainMenu[menuItemIndex]
    if (menuItem.id == menuItemID)
      return menuItem
  }
}

function RenderMainMenu(currentMenuItemID){
  document.querySelector('#app-main-menu').innerHTML = ""
  var outText = `<ul class="nav nav-tabs">
  <li class="nav-item dropdown">
    <a id="options-menu" href="#" class="nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="mdi mdi-menu"></span></a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="about.html"><span class="mdi mdi-information-outline"></span> About This App</a>
      <a class="dropdown-item" href="settings.html"><span class="mdi mdi-settings"></span> Settings</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="__app_close.html"><span class="mdi mdi-window-close"></span> Exit</a>
    </div>
  </li>`
  for (const menuItemIndex in MainMenu){
    const menuItem = MainMenu[menuItemIndex]
    if (menuItem.id != "home" && !menuItem.visible)
      continue
    var classText = "nav-link"
    var tabIndexText = ''
    if (menuItem.disabled){
      classText += " disabled"
      tabIndexText = `tabindex="-1" `
    }
    if (menuItem.id === currentMenuItemID)
      classText += " active"
    outText += `<li class="nav-item">
      <a id="${menuItem.id}" href="${menuItem.href}" class="${classText}" ${tabIndexText}aria-disabled="${menuItem.disabled}"><span class="mdi ${menuItem.mdi_icon}"></span> ${menuItem.text}</a>
    </li>`;
  }
  outText += `</ul>`
  document.querySelector('#app-main-menu').innerHTML = outText
}
