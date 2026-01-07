import { ElectronAPI } from '@electron-toolkit/preload'
import {
  SshConnectOptions,
  SshResizeOptions,
  SshStatusPayload,
  SshLogPayload,
  SshErrorPayload,
  SshOutputPayload,
  SshExitPayload
} from '../shared/types'

interface SshApi {
  connect: (options: SshConnectOptions) => Promise<boolean>
  write: (id: string, data: string) => void
  resize: (options: SshResizeOptions) => void
  disconnect: (id: string) => void
  onStatus: (callback: (payload: SshStatusPayload) => void) => () => void
  onLog: (callback: (payload: SshLogPayload) => void) => () => void
  onError: (callback: (payload: SshErrorPayload) => void) => () => void
  onOutput: (callback: (payload: SshOutputPayload) => void) => () => void
  onExit: (callback: (payload: SshExitPayload) => void) => () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    sshApi: SshApi
  }
}
