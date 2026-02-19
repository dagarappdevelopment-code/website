import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'

const mockProjects = [
  { id: '1', name: 'Reliance Industries DCF', company: 'Reliance Industries Ltd', status: 'completed', date: '15 Feb 2026' },
  { id: '2', name: 'Bosch Ltd Valuation', company: 'Bosch Limited', status: 'verifying', date: '12 Feb 2026' },
  { id: '3', name: 'Dabur Analysis', company: 'Dabur India Ltd', status: 'ingesting', date: '10 Feb 2026' },
  { id: '4', name: 'Ashoka Buildcon DCF', company: 'Ashoka Buildcon Ltd', status: 'draft', date: '08 Feb 2026' },
]

const statusColors: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
  completed: 'success',
  verifying: 'warning',
  ingesting: 'info',
  draft: 'default',
}

export default function RecentProjectsList() {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Recent Projects
        </Typography>
        <List disablePadding>
          {mockProjects.map((project) => (
            <ListItemButton
              key={project.id}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                px: 1.5,
              }}
            >
              <FolderOutlinedIcon sx={{ color: 'text.secondary', mr: 1.5, fontSize: 20 }} />
              <ListItemText
                primary={project.name}
                secondary={`${project.company} · ${project.date}`}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
              <Chip
                label={project.status}
                size="small"
                color={statusColors[project.status]}
                variant="outlined"
                sx={{ textTransform: 'capitalize', fontSize: '0.688rem' }}
              />
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
