import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import IconButton from '@mui/material/IconButton'

const mockReports = [
  { id: '1', name: 'Reliance Industries - DCF Valuation Report', type: 'Valuation', date: '15 Feb 2026', status: 'ready' },
  { id: '2', name: 'Bosch Limited - Financial Analysis', type: 'Analysis', date: '12 Feb 2026', status: 'generating' },
  { id: '3', name: 'Dabur India - Quarterly Review', type: 'Review', date: '10 Feb 2026', status: 'ready' },
]

const statusColors: Record<string, 'success' | 'warning'> = {
  ready: 'success',
  generating: 'warning',
}

export default function ReportsPage() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          Reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Generated valuation and analysis reports
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <List disablePadding>
            {mockReports.map((report) => (
              <ListItemButton key={report.id} sx={{ borderRadius: 1, mb: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <AssessmentOutlinedIcon sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText
                  primary={report.name}
                  secondary={`${report.type} · ${report.date}`}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
                <Chip
                  label={report.status}
                  size="small"
                  color={statusColors[report.status]}
                  variant="outlined"
                  sx={{ textTransform: 'capitalize', fontSize: '0.688rem', mr: 1 }}
                />
                {report.status === 'ready' && (
                  <IconButton size="small">
                    <DownloadOutlinedIcon fontSize="small" />
                  </IconButton>
                )}
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}
