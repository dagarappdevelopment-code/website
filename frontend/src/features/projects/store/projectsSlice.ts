import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Project } from '../types'

interface ProjectsState {
  selectedProjectId: string | null
  projects: Project[]
}

const initialState: ProjectsState = {
  selectedProjectId: null,
  projects: [],
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setSelectedProject(state, action: PayloadAction<string | null>) {
      state.selectedProjectId = action.payload
    },
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload
    },
    addProject(state, action: PayloadAction<Project>) {
      state.projects.unshift(action.payload)
    },
    removeProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter((p) => p.id !== action.payload)
    },
  },
})

export const { setSelectedProject, setProjects, addProject, removeProject } =
  projectsSlice.actions
export default projectsSlice.reducer
