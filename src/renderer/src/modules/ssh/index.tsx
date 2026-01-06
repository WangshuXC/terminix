import { useAtomValue, useSetAtom } from 'jotai'
import { hostsAtom } from '@/store/hosts'
import { tabsAtom, closeTabAtom } from '@/store/tabs'
import { useSSHConnection } from '@/hooks/useSSHConnection'
import { SSHConnecting } from '@/components/ssh/SSHConnecting'
import { SSHTerminal } from '@/components/ssh/SSHTerminal'

interface SshModuleProps {
  tabId: string
}

export default function SshModule({ tabId }: SshModuleProps) {
  const hosts = useAtomValue(hostsAtom)
  const tabs = useAtomValue(tabsAtom)
  const closeTab = useSetAtom(closeTabAtom)

  // Find the tab and associated host
  const tab = tabs.find((t) => t.id === tabId)
  const host = tab?.hostId ? hosts.find((h) => h.id === tab.hostId) : undefined

  const {
    status,
    progress,
    logs,
    error,
    isConnected,
    reconnect,
    setTerminalSize
  } = useSSHConnection(tabId, host)

  const handleClose = () => {
    closeTab(tabId)
  }

  // Show error if host not found
  if (!host) {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center bg-neutral-900">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-400">Host Not Found</h1>
          <p className="mt-2 text-neutral-400">
            The host configuration for this connection could not be found.
          </p>
          <button
            onClick={handleClose}
            className="mt-4 rounded-lg bg-neutral-700 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-600"
          >
            Close Tab
          </button>
        </div>
      </div>
    )
  }

  // Show connecting page while connecting
  if (!isConnected) {
    return (
      <SSHConnecting
        host={host}
        status={status}
        progress={progress}
        logs={logs}
        error={error}
        onClose={handleClose}
        onReconnect={reconnect}
      />
    )
  }

  // Show terminal when connected
  return <SSHTerminal tabId={tabId} onResize={setTerminalSize} />
}
