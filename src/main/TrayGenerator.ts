import { BrowserWindow, MenuItem } from 'electron'
import { Tray, Menu } from 'electron'
import ElectronStore from 'electron-store'
import path from 'path'

interface Point {
  x: number
  y: number
}

class TrayGenerator {
  tray: Tray | null
  mainWindow: BrowserWindow
  store: ElectronStore

  constructor(mainWindow: BrowserWindow, store: ElectronStore) {
    this.tray = null
    this.mainWindow = mainWindow
    this.store = store
  }

  getWindowPosition = (): Point => {
    const windowBounds = this.mainWindow.getBounds()
    const trayBounds = this.tray!.getBounds()
    const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2)
    const y = Math.round(trayBounds.y + trayBounds.height)
    return { x, y }
  }

  showWindow = (): void => {
    const position = this.getWindowPosition()
    this.mainWindow.setPosition(position.x, position.y, false)
    this.mainWindow.show()
    this.mainWindow.setVisibleOnAllWorkspaces(true)
    this.mainWindow.focus()
    this.mainWindow.setVisibleOnAllWorkspaces(false)
  }

  toggleWindow = (): void => {
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide()
    } else {
      this.showWindow()
    }
  }

  UpdateMenu = (): void => {
    const menu = Menu.buildFromTemplate([
      {
        label: 'Launch at startup',
        type: 'checkbox',
        checked: this.store.get('launchAtLogin') as boolean,
        click: (event) => {
          this.store.set('launchAtLogin', event.checked)
          this.mainWindow.webContents.send('update-launch-at-login', event.checked)
          this.UpdateMenu()
        }
      },
      {
        role: 'quit',
        accelerator: 'Command+Q'
      }
    ])
    this.tray!.setContextMenu(menu)
  }

  createTray = (): void => {
    this.tray = new Tray(path.join(__dirname, '../../resources/icon.png'))
    this.tray.setIgnoreDoubleClickEvents(true)
    this.tray.on('click', this.toggleWindow)
    this.UpdateMenu()
  }
}

export default TrayGenerator
