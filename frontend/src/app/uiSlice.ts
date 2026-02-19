import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  sidebarCollapsed: boolean
  sidebarActiveItem: string
}

const initialState: UiState = {
  sidebarCollapsed: false,
  sidebarActiveItem: 'dashboard',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload
    },
    setSidebarActiveItem(state, action: PayloadAction<string>) {
      state.sidebarActiveItem = action.payload
    },
  },
})

export const { toggleSidebar, setSidebarCollapsed, setSidebarActiveItem } = uiSlice.actions
export default uiSlice.reducer
