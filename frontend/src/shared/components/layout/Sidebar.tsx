import { useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { toggleSidebar } from '@/app/uiSlice'
import { layout } from '@/styles/tokens'

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/' },
  { key: 'projects', label: 'Projects', icon: <FolderOutlinedIcon />, path: '/projects' },
  { key: 'data-room', label: 'Data Room', icon: <StorageOutlinedIcon />, path: '/data-room' },
  { key: 'reports', label: 'Reports', icon: <AssessmentOutlinedIcon />, path: '/reports' },
  { key: 'settings', label: 'Settings', icon: <SettingsOutlinedIcon />, path: '/settings' },
]

export default function Sidebar() {
  const collapsed = useAppSelector((state) => state.ui.sidebarCollapsed)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const width = collapsed ? layout.sidebarCollapsedWidth : layout.sidebarWidth

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          transition: 'width 0.2s ease-in-out',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          px: collapsed ? 1 : 2.5,
          py: 2,
          minHeight: layout.topBarHeight,
        }}
      >
        {!collapsed && (
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6C5CE7, #00D2D3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            Finalyze
          </Typography>
        )}
        <IconButton onClick={() => dispatch(toggleSidebar())} size="small">
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Divider />

      <List sx={{ flex: 1, px: 1, py: 1.5 }}>
        {navItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path)

          const button = (
            <ListItemButton
              key={item.key}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                px: collapsed ? 1.5 : 2,
                minHeight: 44,
                justifyContent: collapsed ? 'center' : 'flex-start',
                backgroundColor: isActive ? 'rgba(108,92,231,0.12)' : 'transparent',
                color: isActive ? 'primary.main' : 'text.secondary',
                '&:hover': {
                  backgroundColor: isActive
                    ? 'rgba(108,92,231,0.18)'
                    : 'rgba(255,255,255,0.04)',
                },
                '& .MuiListItemIcon-root': {
                  color: isActive ? 'primary.main' : 'text.secondary',
                  minWidth: collapsed ? 'auto' : 40,
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          )

          return collapsed ? (
            <Tooltip key={item.key} title={item.label} placement="right">
              {button}
            </Tooltip>
          ) : (
            button
          )
        })}
      </List>
    </Drawer>
  )
}
