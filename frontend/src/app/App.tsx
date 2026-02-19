import { RouterProvider } from 'react-router-dom'
import ThemeProvider from './providers/ThemeProvider'
import QueryProvider from './providers/QueryProvider'
import StoreProvider from './providers/StoreProvider'
import { router } from './routes'

export default function App() {
  return (
    <StoreProvider>
      <QueryProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryProvider>
    </StoreProvider>
  )
}
