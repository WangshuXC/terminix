import { useAtomValue } from 'jotai'
import { activeTabAtom } from '@/store/tabs'
import EntryModule from './modules/entry'
import SshModule from './modules/ssh'
import TabBar from './components/TabBar'

function App(): React.JSX.Element {
  const activeTab = useAtomValue(activeTabAtom)

  const renderContent = () => {
    switch (activeTab.type) {
      case 'vaults':
        return <EntryModule />
      case 'ssh':
        return <SshModule tabId={activeTab.id} />
      default:
        return <EntryModule />
    }
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-900">
      <TabBar />
      <div className="flex flex-1 overflow-hidden">{renderContent()}</div>
    </div>
  )
}

export default App
