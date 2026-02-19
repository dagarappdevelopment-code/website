import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import { useAppSelector } from '@/app/store'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import ChatPanel from '@/features/chat/components/ChatPanel'
import { layout } from '@/styles/tokens'

export default function AppShell() {
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed)
  const chatOpen = useAppSelector((state) => state.chat.isPanelOpen)

  const sidebarWidth = sidebarCollapsed
    ? layout.sidebarCollapsedWidth
    : layout.sidebarWidth

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          ml: `${sidebarWidth}px`,
          mr: chatOpen ? `${layout.chatPanelWidth}px` : 0,
          transition: 'margin 0.2s ease-in-out',
        }}
      >
        <TopBar />

        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            overflow: 'auto',
            backgroundColor: 'background.default',
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <ChatPanel />
    </Box>
  )
}
