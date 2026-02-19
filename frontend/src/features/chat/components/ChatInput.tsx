import { useState } from 'react'
import type { FormEvent } from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'

interface Props {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled = false }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed && !disabled) {
      onSend(trimmed)
      setValue('')
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 2,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <InputBase
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask Finalyze AI..."
        multiline
        maxRows={4}
        disabled={disabled}
        sx={{
          flex: 1,
          fontSize: '0.875rem',
          backgroundColor: 'background.default',
          borderRadius: 1.5,
          px: 1.5,
          py: 1,
          border: 1,
          borderColor: 'divider',
          '&:focus-within': {
            borderColor: 'primary.main',
          },
        }}
      />
      <IconButton
        type="submit"
        size="small"
        disabled={!value.trim() || disabled}
        sx={{ color: 'primary.main' }}
      >
        <SendIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}
