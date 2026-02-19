import { useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { setChatPanelOpen, addMessage, setLoading } from '../store/chatSlice'
import { layout } from '@/styles/tokens'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import SuggestedActions from './SuggestedActions'
import type { SuggestedAction } from '../types'

export default function ChatPanel() {
  const dispatch = useAppDispatch()
  const { isPanelOpen, messages, isLoading, suggestedActions } = useAppSelector(
    (state) => state.chat,
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (content: string) => {
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user' as const,
      content,
      timestamp: new Date().toISOString(),
    }
    dispatch(addMessage(userMessage))
    dispatch(setLoading(true))

    // Simulate AI response (mock)
    setTimeout(() => {
      const aiMessage = {
        id: crypto.randomUUID(),
        role: 'assistant' as const,
        content: `I understand you're asking about: "${content}". This is a mock response. In production, this would connect to the RAG-powered backend for intelligent financial analysis.`,
        timestamp: new Date().toISOString(),
      }
      dispatch(addMessage(aiMessage))
      dispatch(setLoading(false))
    }, 1500)
  }

  const handleSuggestedAction = (action: SuggestedAction) => {
    handleSend(action.prompt)
  }

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={isPanelOpen}
      sx={{
        width: isPanelOpen ? layout.chatPanelWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: layout.chatPanelWidth,
          borderLeft: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          minHeight: layout.topBarHeight,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToyOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="h4" sx={{ fontSize: '0.938rem' }}>
            Finalyze AI
          </Typography>
        </Box>
        <IconButton size="small" onClick={() => dispatch(setChatPanelOpen(false))}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider />

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        {messages.length === 0 ? (
          <Box sx={{ px: 2, py: 4, textAlign: 'center' }}>
            <SmartToyOutlinedIcon
              sx={{ fontSize: 40, color: 'text.disabled', mb: 1.5 }}
            />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              How can I help with your analysis?
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Ask questions about financial data, valuation methods, or company metrics.
            </Typography>
          </Box>
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={20} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Suggested Actions */}
      {messages.length === 0 && (
        <>
          <Divider />
          <SuggestedActions actions={suggestedActions} onSelect={handleSuggestedAction} />
        </>
      )}

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </Drawer>
  )
}
