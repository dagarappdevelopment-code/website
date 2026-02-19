import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const mockProjects = [
  { id: '1', name: 'Reliance Industries DCF', company: 'Reliance Industries Ltd', status: 'completed', method: 'DCF', updatedAt: '15 Feb 2026' },
  { id: '2', name: 'Bosch Ltd Valuation', company: 'Bosch Limited', status: 'verifying', method: 'FCFF', updatedAt: '12 Feb 2026' },
  { id: '3', name: 'Dabur Analysis', company: 'Dabur India Ltd', status: 'ingesting', method: 'DCF', updatedAt: '10 Feb 2026' },
  { id: '4', name: 'Ashoka Buildcon DCF', company: 'Ashoka Buildcon Ltd', status: 'draft', method: 'FCFE', updatedAt: '08 Feb 2026' },
  { id: '5', name: 'DCM NSCL Valuation', company: 'DCM Nouvelle Ltd', status: 'ready', method: 'DCF', updatedAt: '05 Feb 2026' },
]

const statusColors: Record<string, 'success' | 'warning' | 'info' | 'default' | 'primary'> = {
  completed: 'success',
  verifying: 'warning',
  ingesting: 'info',
  draft: 'default',
  ready: 'primary',
}

export default function ProjectsListPage() {
  const navigate = useNavigate()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h2" gutterBottom>
            Projects
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your valuation projects
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/projects/new')}
        >
          New Project
        </Button>
      </Box>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell width={48} />
              </TableRow>
            </TableHead>
            <TableBody>
              {mockProjects.map((project) => (
                <TableRow
                  key={project.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/projects/${project.id}/valuation`)}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {project.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {project.company}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={project.status}
                      size="small"
                      color={statusColors[project.status]}
                      variant="outlined"
                      sx={{ textTransform: 'capitalize', fontSize: '0.688rem' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{project.method}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {project.updatedAt}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}
