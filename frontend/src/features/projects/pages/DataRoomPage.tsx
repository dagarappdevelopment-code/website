import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'

const folders = [
  { id: '1', name: 'Reliance Industries', files: 12, size: '45.2 MB' },
  { id: '2', name: 'Bosch Limited', files: 8, size: '32.1 MB' },
  { id: '3', name: 'Dabur India', files: 5, size: '18.7 MB' },
]

const recentFiles = [
  { id: '1', name: 'RIL_Annual_Report_2024.pdf', project: 'Reliance Industries', date: '15 Feb 2026' },
  { id: '2', name: 'BOSCH_Balance_Sheet_Q3.xbrl', project: 'Bosch Limited', date: '12 Feb 2026' },
  { id: '3', name: 'DABUR_PnL_2024.pdf', project: 'Dabur India', date: '10 Feb 2026' },
  { id: '4', name: 'RIL_Cash_Flow_2024.xlsx', project: 'Reliance Industries', date: '08 Feb 2026' },
]

export default function DataRoomPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h2" gutterBottom>
            Data Room
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Centralized document storage for all your financial data
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<CloudUploadOutlinedIcon />}>
          Upload Files
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                Project Folders
              </Typography>
              <List disablePadding>
                {folders.map((folder) => (
                  <ListItemButton key={folder.id} sx={{ borderRadius: 1, mb: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <FolderOutlinedIcon sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={folder.name}
                      secondary={`${folder.files} files · ${folder.size}`}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                Recent Files
              </Typography>
              <List disablePadding>
                {recentFiles.map((file) => (
                  <ListItemButton key={file.id} sx={{ borderRadius: 1, mb: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <DescriptionOutlinedIcon sx={{ color: 'text.secondary' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      secondary={file.date}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                    <Chip
                      label={file.project}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.688rem' }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
