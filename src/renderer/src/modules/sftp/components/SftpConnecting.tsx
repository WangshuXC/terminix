import { HostData } from '@/store/hosts'
import { SftpConnectionStatus } from '../../../../../shared/types'
import {
  IconServer,
  IconFolder,
  IconLoader2,
  IconCheck,
  IconX,
  IconAlertTriangle
} from '@tabler/icons-react'

interface SftpConnectingProps {
  host: HostData
  status: SftpConnectionStatus
  error: string | null
  onClose: () => void
  onReconnect: () => void
}

export function SftpConnecting({ host, status, error, onClose, onReconnect }: SftpConnectingProps) {
  const isConnecting = status === 'connecting'
  const isError = status === 'error'
  const isDisconnected = status === 'disconnected'

  // 根据状态计算进度
  const getProgress = () => {
    switch (status) {
      case 'idle':
        return 0
      case 'connecting':
        return 50
      case 'connected':
        return 100
      case 'error':
      case 'disconnected':
        return 50
      default:
        return 0
    }
  }

  const progress = getProgress()

  return (
    <div className="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <div className="w-full max-w-2xl px-6">
        {/* Host Info Card */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30">
              <IconServer size={28} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {host.name || host.address}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                SFTP {host.username}@{host.address}:{host.port}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                isError
                  ? 'bg-red-100 text-red-500 dark:bg-red-900/30'
                  : 'bg-green-100 text-green-500 dark:bg-green-900/30'
              }`}
            >
              {isConnecting ? (
                <IconLoader2 size={18} className="animate-spin" />
              ) : isError ? (
                <IconX size={18} />
              ) : (
                <IconServer size={18} />
              )}
            </div>

            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
              <div
                className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                  isError ? 'bg-red-500' : 'bg-linear-to-r from-green-500 to-green-600'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                progress >= 100
                  ? 'bg-green-100 text-green-500 dark:bg-green-900/30'
                  : 'bg-neutral-200 text-neutral-400 dark:bg-neutral-700'
              }`}
            >
              {progress >= 100 ? <IconCheck size={18} /> : <IconFolder size={18} />}
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="mb-8 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-2">
            {isConnecting ? (
              <>
                <IconLoader2 size={16} className="animate-spin text-green-500" />
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  Establishing SFTP connection...
                </p>
              </>
            ) : isError ? (
              <>
                <IconX size={16} className="text-red-500" />
                <p className="text-sm text-red-700 dark:text-red-400">Connection failed</p>
              </>
            ) : isDisconnected ? (
              <>
                <IconX size={16} className="text-neutral-500" />
                <p className="text-sm text-neutral-700 dark:text-neutral-300">Disconnected</p>
              </>
            ) : (
              <>
                <IconCheck size={16} className="text-green-500" />
                <p className="text-sm text-green-700 dark:text-green-400">Connected successfully</p>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <div className="flex items-start gap-3">
              <IconAlertTriangle size={20} className="mt-0.5 shrink-0 text-red-500" />
              <div>
                <p className="font-medium text-red-700 dark:text-red-400">Connection Failed</p>
                <p className="mt-1 text-sm text-red-600 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-neutral-200 px-6 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
          >
            Close
          </button>
          {(isError || isDisconnected) && (
            <button
              onClick={onReconnect}
              className="rounded-lg bg-linear-to-r from-green-500 to-green-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-green-500/25 transition-all hover:from-green-600 hover:to-green-700 hover:shadow-green-500/40"
            >
              Start over
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
