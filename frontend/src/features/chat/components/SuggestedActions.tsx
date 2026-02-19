import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import type { SuggestedAction } from '../types'

interface Props {
  actions: SuggestedAction[]
  onSelect: (action: SuggestedAction) => void
}

export default function SuggestedActions({ actions, onSelect }: Props) {
  if (actions.length === 0) return null

  return (
    <Box sx={{ px: 2, py: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
        <AutoAwesomeOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        <Typography variant="caption" color="text.secondary">
          Suggested
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
        {actions.map((action) => (
          <Chip
            key={action.id}
            label={action.label}
            size="small"
            variant="outlined"
            onClick={() => onSelect(action)}
            sx={{
              borderColor: 'divider',
              color: 'text.secondary',
              fontSize: '0.75rem',
              '&:hover': {
                borderColor: 'primary.main',
                color: 'primary.light',
                backgroundColor: 'rgba(108,92,231,0.08)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
