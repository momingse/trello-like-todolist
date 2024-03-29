import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { TodoState } from '../main'

// Custom APIs for renderer
const api = {
  setLaunchAtLogin: (value: boolean): void => ipcRenderer.sendSync('set-launch-at-login', value),
  getLaunchAtLogin: (): boolean => ipcRenderer.sendSync('get-launch-at-login'),
  onUpdateLaunchAtLogin: (callback: (_event: Event, value: boolean) => void): void => {
    ipcRenderer.on('update-launch-at-login', callback)
  },
  getTodo: (): TodoState | null => ipcRenderer.sendSync('get-todo'),
  updateTodo: (Todo: TodoState): void => ipcRenderer.sendSync('update-todo', Todo)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
