import AutoLaunch from 'auto-launch'
import { app } from 'electron'

/**
 * 获取开机启动状态
 */
export const getAutoLaunchState = async (): Promise<boolean> => {
  if (process.platform === 'linux') {
    const autoLauncher = new AutoLaunch({
      name: app.getName(),
      isHidden: false,
      path: process.env.APPIMAGE
    })
    return await autoLauncher.isEnabled()
  }

  return app.getLoginItemSettings().openAtLogin
}
/**
 * 更新开机启动
 * @param isAutoLaunchEnabled
 */
export const updateAutoLaunch = async (isAutoLaunchEnabled = false): Promise<void> => {
  const electronIsDev = !app.isPackaged

  // Don't run this in development
  if (electronIsDev) {
    return
  }

  // `setLoginItemSettings` doesn't support linux
  if (process.platform === 'linux') {
    const autoLauncher = new AutoLaunch({
      name: app.getName(),
      isHidden: false,
      path: process.env.APPIMAGE
    })

    if (isAutoLaunchEnabled) {
      await autoLauncher.enable()
    } else {
      await autoLauncher.disable()
    }

    return
  }

  app.setLoginItemSettings({
    openAtLogin: isAutoLaunchEnabled,
    openAsHidden: true
  })
}
