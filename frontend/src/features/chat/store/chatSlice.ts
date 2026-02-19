import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ChatMessage, SuggestedAction } from '../types'

interface ChatState {
  isPanelOpen: boolean
  messages: ChatMessage[]
  isLoading: boolean
  suggestedActions: SuggestedAction[]
}

const initialState: ChatState = {
  isPanelOpen: true,
  messages: [],
  isLoading: false,
  suggestedActions: [
    { id: '1', label: 'Analyze financial health', prompt: 'Analyze the financial health of this company' },
    { id: '2', label: 'Calculate WACC', prompt: 'Calculate the weighted average cost of capital' },
    { id: '3', label: 'Explain valuation', prompt: 'Explain the DCF valuation methodology' },
    { id: '4', label: 'Compare metrics', prompt: 'Compare key financial metrics year over year' },
  ],
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChatPanel(state) {
      state.isPanelOpen = !state.isPanelOpen
    },
    setChatPanelOpen(state, action: PayloadAction<boolean>) {
      state.isPanelOpen = action.payload
    },
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload)
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    clearMessages(state) {
      state.messages = []
    },
    setSuggestedActions(state, action: PayloadAction<SuggestedAction[]>) {
      state.suggestedActions = action.payload
    },
  },
})

export const {
  toggleChatPanel,
  setChatPanelOpen,
  addMessage,
  setLoading,
  clearMessages,
  setSuggestedActions,
} = chatSlice.actions
export default chatSlice.reducer
