// IPC 通道名称
export const IPC_CHANNELS = {
  // SSH 通道
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

// SSH 连接状态
export type SshConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'authenticating'
  | 'authenticated'
  | 'ready'
  | 'error'
  | 'disconnected'

// SSH 日志类型
export type SshLogType = 'info' | 'success' | 'error' | 'warning'

// SSH 连接日志
export interface SshConnectionLog {
  timestamp: number
  type: SshLogType
  message: string
  icon?: string
}

// SSH 连接选项
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

// SSH 调整大小选项
export interface SshResizeOptions {
  id: string
  cols: number
  rows: number
}

// SSH 状态负载
export interface SshStatusPayload {
  id: string
  status: SshConnectionStatus
  progress: number
}

// SSH 日志负载
export interface SshLogPayload {
  id: string
  log: SshConnectionLog
}

// SSH 错误负载
export interface SshErrorPayload {
  id: string
  error: string
}

// SSH 输出负载
export interface SshOutputPayload {
  id: string
  data: string
}

// SSH 退出负载
export interface SshExitPayload {
  id: string
  code: number
  signal?: string
}
