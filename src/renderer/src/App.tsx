import { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from './components/ui/SideBar'
import { IconServer, IconFileText, IconSettings } from '@tabler/icons-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-sky-300"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-sky-300 dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold whitespace-pre text-sky-300 dark:text-white"
      >
        Terminal
      </motion.span>
    </a>
  )
}

const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-sky-300"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-sky-300 dark:bg-white" />
    </a>
  )
}

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl bg-white p-2 md:p-10 dark:bg-neutral-900">
        <div className="flex gap-2">
          {[...new Array(4)].map((_, idx) => (
            <div
              key={'first-array-' + idx}
              className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(2)].map((_, idx) => (
            <div
              key={'second-array-' + idx}
              className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

function App(): React.JSX.Element {
  const [open, setOpen] = useState(false)

  const links = [
    {
      label: 'Hosts',
      href: '#',
      icon: <IconServer className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: 'Logs',
      href: '#',
      icon: <IconFileText className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: 'Settings',
      href: '#',
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    }
  ]

  return (
    <div
      className={cn(
        'flex w-full flex-1 flex-col overflow-hidden bg-[#F5F5F5] md:flex-row dark:bg-neutral-800',
        'h-screen pt-10'
      )}
    >
      {/* 窗口拖拽区域 */}
      <div className="fixed top-0 left-0 right-0 h-10 z-50" style={{ WebkitAppRegion: 'drag' } as React.CSSProperties} />
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  )
}

export default App
