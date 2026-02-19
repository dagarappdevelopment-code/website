import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'

export default function ImportProjectCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,210,211,0.15)',
            mb: 2,
          }}
        >
          <CloudUploadOutlinedIcon sx={{ color: 'secondary.main', fontSize: 28 }} />
        </Box>
        <Typography variant="h4" gutterBottom>
          Import Data
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flex: 1 }}>
          Upload existing financial statements in PDF, XBRL, or Excel formats. Our AI will extract and structure the data automatically.
        </Typography>
        <Button variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
          Upload Files
        </Button>
      </CardContent>
    </Card>
  )
}
