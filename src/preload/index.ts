import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  IPC_CHANNELS,
  PtyCreateOptions,
  PtyResizeOptions,
  SshConnectOptions,
  SshResizeOptions,
  SshStatusPayload,
  SshLogPayload,
  SshErrorPayload,
  SshOutputPayload,
  SshExitPayload
} from '../shared/types'

// Terminal API for renderer
const terminalApi = {
  // Create a new PTY instance
  createPty: (options: PtyCreateOptions): Promise<boolean> => {
    return ipcRenderer.invoke(IPC_CHANNELS.PTY_CREATE, options)
  },

  // Send data to PTY
  writePty: (id: string, data: string): void => {
    ipcRenderer.send(IPC_CHANNELS.PTY_DATA, { id, data })
  },

  // Resize PTY
  resizePty: (options: PtyResizeOptions): void => {
    ipcRenderer.send(IPC_CHANNELS.PTY_RESIZE, options)
  },

  // Destroy PTY
  destroyPty: (id: string): void => {
    ipcRenderer.send(IPC_CHANNELS.PTY_DESTROY, id)
  },

  // Listen for PTY output
  onPtyOutput: (callback: (data: { id: string; data: string }) => void): (() => void) => {
    const handler = (_event: Electron.IpcRendererEvent, payload: { id: string; data: string }) => {
      callback(payload)
    }
    ipcRenderer.on(IPC_CHANNELS.PTY_OUTPUT, handler)
    return () => {
      ipcRenderer.removeListener(IPC_CHANNELS.PTY_OUTPUT, handler)
    }
  },

  // Listen for PTY exit
  onPtyExit: (callback: (data: { id: string; exitCode: number }) => void): (() => void) => {
    const handler = (
      _event: Electron.IpcRendererEvent,
      payload: { id: string; exitCode: number }
    ) => {
      callback(payload)
    }
    ipcRenderer.on(IPC_CHANNELS.PTY_EXIT, handler)
    return () => {
      ipcRenderer.removeListener(IPC_CHANNELS.PTY_EXIT, handler)
    }
  }
}

// SSH API for renderer
const sshApi = {
  // Connect to SSH server
  connect: (options: SshConnectOptions): Promise<boolean> => {
    return ipcRenderer.invoke(IPC_CHANNELS.SSH_CONNECT, options)
  },

  // Write data to SSH
  write: (id: string, data: string): void => {
    ipcRenderer.send(IPC_CHANNELS.SSH_WRITE, { id, data })
  },

  // Resize SSH terminal
  resize: (options: SshResizeOptions): void => {
    ipcRenderer.send(IPC_CHANNELS.SSH_RESIZE, options)
  },

  // Disconnect SSH
  disconnect: (id: string): void => {
    ipcRenderer.send(IPC_CHANNELS.SSH_DISCONNECT, id)
  },

  // Listen for SSH status updates
  onStatus: (callback: (payload: SshStatusPayload) => void): (() => void) => {
    const handler = (_event: Electron.IpcRendererEvent, payload: SshStatusPayload) => {
      callback(payload)
    }
    ipcRenderer.on(IPC_CHANNELS.SSH_STATUS, handler)
    return () => {
      ipcRenderer.removeListener(IPC_CHANNELS.SSH_STATUS, handler)
    }
  },

  // Listen for SSH logs
  onLog: (callback: (payload: SshLogPayload) => void): (() => void) => {
    const handler = (_event: Electron.IpcRendererEvent, payload: SshLogPayload) => {
      callback(payload)
    }
    ipcRenderer.on(IPC_CHANNELS.SSH_LOG, handler)
    return () => {
      ipcRenderer.removeListener(IPC_CHANNELS.SSH_LOG, handler)
    }
  },

  // Listen for SSH errors
  onError: (callback: (payload: SshErrorPayload) => void): (() => void) => {
    const handler = (_event: Electron.IpcRendererEvent, payload: SshErrorPayload) => {
      callback(payload)
    }
    ipcRenderer.on(IPC_CHANNELS.SSH_ERROR, handler)
    return () => {
      ipcRenderer.removeListener(IPC_CHANNELS.SSH_ERROR, handler)
    }
  },

  // Listen for SSH output
  onOutput: (callback: (payload: SshOutputPayload) => void): (() => void) => {
    const handler = (_event: Electron.IpcRendererEvent, payload: SshOutputPayload) => {
      callback(payload)
    }
    ipcRenderer.on(IPC_CHANNELS.SSH_OUTPUT, handler)
    return () => {
      ipcRenderer.removeListener(IPC_CHANNELS.SSH_OUTPUT, handler)
    }
  },

  // Listen for SSH exit
  onExit: (callback: (payload: SshExitPayload) => void): (() => void) => {
    const handler = (_event: Electron.IpcRendererEvent, payload: SshExitPayload) => {
      callback(payload)
    }
    ipcRenderer.on(IPC_CHANNELS.SSH_EXIT, handler)
    return () => {
      ipcRenderer.removeListener(IPC_CHANNELS.SSH_EXIT, handler)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('terminalApi', terminalApi)
    contextBridge.exposeInMainWorld('sshApi', sshApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.terminalApi = terminalApi
  // @ts-ignore (define in dts)
  window.sshApi = sshApi
}
