import {
  app,
  shell,
  BrowserWindow,
  BrowserViewConstructorOptions as WindowOptions,
  ipcMain
} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.ico?asset'
import { createFileRoute, createURLRoute } from 'electron-router-dom'
import TrayGenerator from './TrayGenerator'
import ElectronStore from 'electron-store'
import dayjs from 'dayjs'
// import { getAutoLaunchState, updateAutoLaunch } from './AutoLaunch'
interface Task {
  id: string
  title: string
  description: string
  deadline: number
}

interface Column {
  id: string
  title: string
  taskIds: string[]
}

export interface TodoState {
  tasks: Record<string, Task>
  columns: Record<string, Column>
}

interface ElectronStoreScheme extends Record<string, boolean | TodoState | null> {
  launchAtLogin: boolean
  todo: TodoState | null
}

function createWindow(id: string, option: WindowOptions = {}): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    ...option
  })

  mainWindow.removeMenu()

  const devServerURL = createURLRoute(process.env['ELECTRON_RENDERER_URL']!, id)

  const fileRoute = createFileRoute(join(__dirname, '../renderer/index.html'), id)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('close', (e) => {
    e.preventDefault()
    mainWindow.hide()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(devServerURL)
  } else {
    mainWindow.loadFile(...fileRoute)
  }

  if (is.dev) {
    mainWindow.webContents.openDevTools()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // await updateAutoLaunch(await getAutoLaunchState())
  createWindow('main', {
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // app.on('activate', function () {
  //   // On macOS it's common to re-create a window in the app when the
  //   // dock icon is clicked and there are no other windows open.
  //   if (BrowserWindow.getAllWindows().length === 0)
  //     createWindow('main', {
  //       webPreferences: {
  //         preload: join(__dirname, '../preload/index.js'),
  //         sandbox: false
  //       }
  //     })
  // })

  const scheme: ElectronStoreScheme = {
    launchAtLogin: false,
    todo: null
  }

  const store: ElectronStore<ElectronStoreScheme> = new ElectronStore<ElectronStoreScheme>({
    defaults: scheme
  })
  const Tray = new TrayGenerator<ElectronStoreScheme>(BrowserWindow.getAllWindows()[0], store)
  Tray.createTray()

  app.setLoginItemSettings({
    openAtLogin: store.get('launchAtLogin') as boolean
  })

  app.on('before-quit', function () {
    Tray.destroy()
  })

  // In this file you can include the rest of your app"s specific main process
  // code. You can also put them in separate files and require them here.
  ipcMain.on('set-launch-at-login', (event, value) => {
    if (process.platform === 'linux') {
      event.returnValue = false
      return
    }

    store.set('launchAtLogin', value)
    Tray!.updateMenu()
    event.returnValue = true
  })

  ipcMain.on('get-launch-at-login', (event) => {
    event.returnValue = store.get('launchAtLogin')
  })

  ipcMain.on('get-todo', (event) => {
    event.returnValue = store.get('todo')
  })

  ipcMain.on('update-todo', (event, todoObj: TodoState) => {
    const validateTasks = (todoObj: TodoState): boolean => {
      if (!todoObj.tasks) return false

      let valid = true
      Object.values(todoObj.tasks).forEach((task) => {
        if (!task.title) valid = false
        if (!task.id) valid = false
        if (typeof task.description === 'undefined') valid = false
        if (typeof task.deadline === 'undefined' || dayjs.isDayjs(task.deadline)) valid = false
      })
      return valid
    }

    const validTaskIds = (taskIds: string[], tasks: Record<string, Task>): boolean => {
      if (!Array.isArray(taskIds)) return false
      let valid = true
      taskIds.forEach((taskId) => {
        if (typeof taskId !== 'string') valid = false
        if (!tasks[taskId]) valid = false
      })
      return valid
    }

    const validateColumns = (todoObj: TodoState): boolean => {
      if (!todoObj.columns) return false

      let valid = true
      Object.values(todoObj.columns).forEach((column) => {
        if (!column.title) valid = false
        if (!column.id) valid = false
        if (!Array.isArray(column.taskIds)) valid = false
        if (!validTaskIds(column.taskIds, todoObj.tasks)) valid = false
      })
      return valid
    }

    if (Object.keys(todoObj).length === 0) {
      event.returnValue = false
      return
    }
    if (!validateTasks(todoObj)) {
      event.returnValue = false
      return
    }
    if (!validateColumns(todoObj)) {
      event.returnValue = false
      return
    }

    store.set('todo', todoObj)
    event.returnValue = true
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
