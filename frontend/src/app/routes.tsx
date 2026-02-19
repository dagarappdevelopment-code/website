import { createBrowserRouter } from 'react-router-dom'
import AppShell from '@/shared/components/layout/AppShell'
import DashboardPage from '@/features/projects/pages/DashboardPage'
import ProjectsListPage from '@/features/projects/pages/ProjectsListPage'
import CreateProjectPage from '@/features/projects/pages/CreateProjectPage'
import IngestionPage from '@/features/ingestion/pages/IngestionPage'
import VerifyDataPage from '@/features/valuation/pages/VerifyDataPage'
import ValuationPage from '@/features/valuation/pages/ValuationPage'
import DataRoomPage from '@/features/projects/pages/DataRoomPage'
import ReportsPage from '@/features/projects/pages/ReportsPage'
import SettingsPage from '@/features/projects/pages/SettingsPage'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'projects', element: <ProjectsListPage /> },
      { path: 'projects/new', element: <CreateProjectPage /> },
      { path: 'projects/:id/ingestion', element: <IngestionPage /> },
      { path: 'projects/:id/verify', element: <VerifyDataPage /> },
      { path: 'projects/:id/valuation', element: <ValuationPage /> },
      { path: 'data-room', element: <DataRoomPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
