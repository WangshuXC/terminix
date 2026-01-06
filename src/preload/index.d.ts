import { ElectronAPI } from '@electron-toolkit/preload'
import {
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

interface TerminalApi {
  createPty: (options: PtyCreateOptions) => Promise<boolean>
  writePty: (id: string, data: string) => void
  resizePty: (options: PtyResizeOptions) => void
  destroyPty: (id: string) => void
  onPtyOutput: (callback: (data: { id: string; data: string }) => void) => () => void
  onPtyExit: (callback: (data: { id: string; exitCode: number }) => void) => () => void
}

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
    terminalApi: TerminalApi
    sshApi: SshApi
  }
}
