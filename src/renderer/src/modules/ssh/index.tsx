interface SshModuleProps {
  tabId: string
}

export default function SshModule({ tabId }: SshModuleProps) {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center bg-neutral-900">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">SSH Module</h1>
        <p className="mt-2 text-neutral-400">Tab ID: {tabId}</p>
      </div>
    </div>
  )
}
