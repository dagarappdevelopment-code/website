import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { toggleChatPanel } from '@/features/chat/store/chatSlice'
import { layout } from '@/styles/tokens'

export default function TopBar() {
  const dispatch = useAppDispatch()
  const chatOpen = useAppSelector((state) => state.chat.isPanelOpen)

  return (
    <Box
      component="header"
      sx={{
        height: layout.topBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        gap: 2,
      }}
    >
      {/* Search */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.default',
          borderRadius: 1.5,
          px: 1.5,
          py: 0.5,
          flex: 1,
          maxWidth: 480,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
        <InputBase
          placeholder="Search projects, companies, reports..."
          sx={{ flex: 1, fontSize: '0.875rem' }}
        />
      </Box>

      {/* Right actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Chip
          icon={<LockOutlinedIcon sx={{ fontSize: 16 }} />}
          label="Secure Session"
          size="small"
          variant="outlined"
          sx={{
            borderColor: 'success.main',
            color: 'success.main',
            '& .MuiChip-icon': { color: 'success.main' },
          }}
        />

        <IconButton
          size="small"
          onClick={() => dispatch(toggleChatPanel())}
          sx={{
            color: chatOpen ? 'primary.main' : 'text.secondary',
            backgroundColor: chatOpen ? 'rgba(108,92,231,0.12)' : 'transparent',
          }}
        >
          <SmartToyOutlinedIcon />
        </IconButton>

        <IconButton size="small">
          <Badge badgeContent={3} color="error" variant="dot">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>

        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: '0.813rem',
            bgcolor: 'primary.main',
            cursor: 'pointer',
          }}
        >
          U
        </Avatar>
      </Box>
    </Box>
  )
}
