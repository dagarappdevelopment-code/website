import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import projectsReducer from '@/features/projects/store/projectsSlice'
import projectWizardReducer from '@/features/projects/store/projectWizardSlice'
import chatReducer from '@/features/chat/store/chatSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    projectWizard: projectWizardReducer,
    chat: chatReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
