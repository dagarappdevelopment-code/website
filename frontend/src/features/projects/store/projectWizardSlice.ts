import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ProjectWizardData, UploadedFile } from '../types'

interface WizardState {
  activeStep: number
  draft: ProjectWizardData
}

const initialState: WizardState = {
  activeStep: 0,
  draft: {
    basics: {
      projectName: '',
      companyName: '',
      cin: '',
      statementType: 'standalone',
    },
    data: {
      files: [],
    },
    assumptions: {
      taxRate: 25,
      discountRate: 10,
      terminalGrowthRate: 3,
      valuationMethod: 'dcf',
    },
  },
}

const projectWizardSlice = createSlice({
  name: 'projectWizard',
  initialState,
  reducers: {
    setActiveStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload
    },
    nextStep(state) {
      state.activeStep = Math.min(state.activeStep + 1, 3)
    },
    prevStep(state) {
      state.activeStep = Math.max(state.activeStep - 1, 0)
    },
    updateBasics(state, action: PayloadAction<Partial<ProjectWizardData['basics']>>) {
      Object.assign(state.draft.basics, action.payload)
    },
    addFile(state, action: PayloadAction<UploadedFile>) {
      state.draft.data.files.push(action.payload)
    },
    updateFileProgress(
      state,
      action: PayloadAction<{ id: string; progress: number; status: UploadedFile['status'] }>,
    ) {
      const file = state.draft.data.files.find((f) => f.id === action.payload.id)
      if (file) {
        file.progress = action.payload.progress
        file.status = action.payload.status
      }
    },
    removeFile(state, action: PayloadAction<string>) {
      state.draft.data.files = state.draft.data.files.filter((f) => f.id !== action.payload)
    },
    updateAssumptions(state, action: PayloadAction<Partial<ProjectWizardData['assumptions']>>) {
      Object.assign(state.draft.assumptions, action.payload)
    },
    resetWizard() {
      return initialState
    },
  },
})

export const {
  setActiveStep,
  nextStep,
  prevStep,
  updateBasics,
  addFile,
  updateFileProgress,
  removeFile,
  updateAssumptions,
  resetWizard,
} = projectWizardSlice.actions
export default projectWizardSlice.reducer
