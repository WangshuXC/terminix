import { useEffect, useRef, useCallback } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import '@/assets/terminal.css'

interface SSHTerminalProps {
  tabId: string
  onResize?: (cols: number, rows: number) => void
}

export function SSHTerminal({ tabId, onResize }: SSHTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<Terminal | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const isInitializedRef = useRef(false)

  // Handle terminal resize
  const handleResize = useCallback(() => {
    if (fitAddonRef.current && xtermRef.current) {
      fitAddonRef.current.fit()
      const { cols, rows } = xtermRef.current
      window.sshApi.resize({ id: tabId, cols, rows })
      onResize?.(cols, rows)
    }
  }, [tabId, onResize])

  useEffect(() => {
    if (!terminalRef.current || isInitializedRef.current) return

    isInitializedRef.current = true

    // Create xterm instance
    const xterm = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      scrollback: 10000,
      theme: {
        background: '#1F2A3A',
        foreground: '#d4d4d4',
        cursor: '#d4d4d4',
        cursorAccent: '#1F2A3A',
        selectionBackground: '#264f78',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#ffffff'
      },
      allowProposedApi: true
    })

    const fitAddon = new FitAddon()
    xterm.loadAddon(fitAddon)

    xtermRef.current = xterm
    fitAddonRef.current = fitAddon

    // Open terminal in DOM
    xterm.open(terminalRef.current)

    // Initial fit
    setTimeout(() => {
      fitAddon.fit()
      const { cols, rows } = xterm
      onResize?.(cols, rows)
    }, 0)

    // Handle user input
    xterm.onData((data) => {
      window.sshApi.write(tabId, data)
    })

    // Listen for SSH output
    const unsubscribeOutput = window.sshApi.onOutput(({ id, data }) => {
      if (id === tabId && xtermRef.current) {
        xtermRef.current.write(data)
      }
    })

    // Listen for SSH exit
    const unsubscribeExit = window.sshApi.onExit(({ id, code }) => {
      if (id === tabId && xtermRef.current) {
        xtermRef.current.write(`\r\n[Session ended with code ${code}]\r\n`)
      }
    })

    // Handle window resize
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      unsubscribeOutput()
      unsubscribeExit()
      xterm.dispose()
      isInitializedRef.current = false
    }
  }, [tabId, handleResize, onResize])

  // Handle container resize using ResizeObserver
  useEffect(() => {
    if (!terminalRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      handleResize()
    })

    resizeObserver.observe(terminalRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [handleResize])

  return (
    <div className="flex h-full w-full flex-col bg-[#1F2A3A] p-2 pr-0.5 pt-0">
      <div ref={terminalRef} className="h-full w-full flex-1 overflow-hidden" />
    </div>
  )
}
