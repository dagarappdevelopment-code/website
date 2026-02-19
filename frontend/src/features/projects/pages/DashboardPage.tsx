import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CreateProjectCard from '../components/CreateProjectCard'
import ImportProjectCard from '../components/ImportProjectCard'
import StarterTemplatesCard from '../components/StarterTemplatesCard'
import RecentProjectsList from '../components/RecentProjectsList'

export default function DashboardPage() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          Welcome back
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Start a new valuation or continue where you left off.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <CreateProjectCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ImportProjectCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StarterTemplatesCard />
        </Grid>
      </Grid>

      <RecentProjectsList />
    </Box>
  )
}
