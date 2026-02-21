import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import ChatPanel from '@/features/chat/components/ChatPanel'

export default function AppShell() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
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
