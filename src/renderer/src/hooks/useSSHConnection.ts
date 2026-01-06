import { useState, useEffect, useCallback, useRef } from 'react'
import {
  SshConnectionStatus,
  SshConnectionLog,
  SshConnectOptions
} from '../../../shared/types'
import { HostData } from '@/store/hosts'

export interface SSHConnectionState {
  status: SshConnectionStatus
  progress: number
  logs: SshConnectionLog[]
  error: string | null
  isConnected: boolean
}

const initialState: SSHConnectionState = {
  status: 'idle',
  progress: 0,
  logs: [],
  error: null,
  isConnected: false
}

export function useSSHConnection(tabId: string, host: HostData | undefined) {
  const [state, setState] = useState<SSHConnectionState>(initialState)
  const isConnectingRef = useRef(false)
  const terminalSizeRef = useRef({ cols: 80, rows: 24 })

  const addLog = useCallback((log: SshConnectionLog) => {
    setState((prev) => ({
      ...prev,
      logs: [...prev.logs, log]
    }))
  }, [])

  const connect = useCallback(async () => {
    if (!host || isConnectingRef.current) return

    isConnectingRef.current = true
    setState({
      status: 'connecting',
      progress: 0,
      logs: [],
      error: null,
      isConnected: false
    })

    const options: SshConnectOptions = {
      id: tabId,
      host: host.address,
      port: host.port,
      username: host.username,
      authType: host.authType,
      password: host.password,
      privateKey: host.privateKey,
      cols: terminalSizeRef.current.cols,
      rows: terminalSizeRef.current.rows
    }

    const success = await window.sshApi.connect(options)
    isConnectingRef.current = false

    if (!success) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        isConnected: false
      }))
    }
  }, [tabId, host])

  const disconnect = useCallback(() => {
    window.sshApi.disconnect(tabId)
    setState(initialState)
  }, [tabId])

  const reconnect = useCallback(() => {
    disconnect()
    setTimeout(() => {
      connect()
    }, 100)
  }, [connect, disconnect])

  const setTerminalSize = useCallback((cols: number, rows: number) => {
    terminalSizeRef.current = { cols, rows }
  }, [])

  // Subscribe to SSH events
  useEffect(() => {
    const unsubStatus = window.sshApi.onStatus((payload) => {
      if (payload.id !== tabId) return
      setState((prev) => ({
        ...prev,
        status: payload.status,
        progress: payload.progress,
        isConnected: payload.status === 'ready'
      }))
    })

    const unsubLog = window.sshApi.onLog((payload) => {
      if (payload.id !== tabId) return
      addLog(payload.log)
    })

    const unsubError = window.sshApi.onError((payload) => {
      if (payload.id !== tabId) return
      setState((prev) => ({
        ...prev,
        error: payload.error,
        status: 'error'
      }))
    })

    const unsubExit = window.sshApi.onExit((payload) => {
      if (payload.id !== tabId) return
      setState((prev) => ({
        ...prev,
        status: 'disconnected',
        isConnected: false
      }))
      addLog({
        timestamp: Date.now(),
        type: 'info',
        message: `Session ended with code ${payload.code}`,
        icon: '📴'
      })
    })

    return () => {
      unsubStatus()
      unsubLog()
      unsubError()
      unsubExit()
    }
  }, [tabId, addLog])

  // Auto-connect on mount
  useEffect(() => {
    if (host && state.status === 'idle') {
      connect()
    }
  }, [host, state.status, connect])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (state.isConnected) {
        window.sshApi.disconnect(tabId)
      }
    }
  }, [tabId, state.isConnected])

  return {
    ...state,
    connect,
    disconnect,
    reconnect,
    setTerminalSize
  }
}
