// IPC Channel names
export const IPC_CHANNELS = {
  PTY_CREATE: 'pty:create',
  PTY_DATA: 'pty:data',
  PTY_RESIZE: 'pty:resize',
  PTY_DESTROY: 'pty:destroy',
  PTY_OUTPUT: 'pty:output',
  PTY_EXIT: 'pty:exit',
  // SSH channels
  SSH_CONNECT: 'ssh:connect',
  SSH_DISCONNECT: 'ssh:disconnect',
  SSH_WRITE: 'ssh:write',
  SSH_RESIZE: 'ssh:resize',
  SSH_OUTPUT: 'ssh:output',
  SSH_STATUS: 'ssh:status',
  SSH_LOG: 'ssh:log',
  SSH_ERROR: 'ssh:error',
  SSH_EXIT: 'ssh:exit'
} as const

// PTY creation options
export interface PtyCreateOptions {
  id: string
  cols: number
  rows: number
}

// PTY resize options
export interface PtyResizeOptions {
  id: string
  cols: number
  rows: number
}

// PTY data payload
export interface PtyDataPayload {
  id: string
  data: string
}

// PTY exit payload
export interface PtyExitPayload {
  id: string
  exitCode: number
}

// SSH connection status
export type SshConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'authenticating'
  | 'authenticated'
  | 'ready'
  | 'error'
  | 'disconnected'

// SSH log type
export type SshLogType = 'info' | 'success' | 'error' | 'warning'

// SSH connection log
export interface SshConnectionLog {
  timestamp: number
  type: SshLogType
  message: string
  icon?: string
}

// SSH connect options
export interface SshConnectOptions {
  id: string
  host: string
  port: number
  username: string
  authType: 'password' | 'privateKey'
  password?: string
  privateKey?: string
  cols: number
  rows: number
}

// SSH resize options
export interface SshResizeOptions {
  id: string
  cols: number
  rows: number
}

// SSH status payload
export interface SshStatusPayload {
  id: string
  status: SshConnectionStatus
  progress: number
}

// SSH log payload
export interface SshLogPayload {
  id: string
  log: SshConnectionLog
}

// SSH error payload
export interface SshErrorPayload {
  id: string
  error: string
}

// SSH output payload
export interface SshOutputPayload {
  id: string
  data: string
}

// SSH exit payload
export interface SshExitPayload {
  id: string
  code: number
  signal?: string
}
