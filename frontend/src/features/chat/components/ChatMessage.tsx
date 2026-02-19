import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import type { ChatMessage as ChatMessageType } from '../types'

interface Props {
  message: ChatMessageType
}

export default function ChatMessage({ message }: Props) {
  const isAssistant = message.role === 'assistant'

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        px: 2,
        py: 1.5,
        alignItems: 'flex-start',
      }}
    >
      <Avatar
        sx={{
          width: 28,
          height: 28,
          bgcolor: isAssistant ? 'primary.main' : 'surface.main',
          fontSize: '0.75rem',
        }}
      >
        {isAssistant ? (
          <SmartToyOutlinedIcon sx={{ fontSize: 16 }} />
        ) : (
          <PersonOutlineIcon sx={{ fontSize: 16 }} />
        )}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
          {isAssistant ? 'Finalyze AI' : 'You'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {message.content}
        </Typography>
      </Box>
    </Box>
  )
}
