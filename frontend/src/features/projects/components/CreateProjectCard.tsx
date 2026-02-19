import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export default function CreateProjectCard() {
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        height: '100%',
        background: 'linear-gradient(135deg, rgba(108,92,231,0.15) 0%, rgba(0,210,211,0.08) 100%)',
        border: '1px solid rgba(108,92,231,0.3)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          border: '1px solid rgba(108,92,231,0.5)',
          transform: 'translateY(-2px)',
        },
      }}
      onClick={() => navigate('/projects/new')}
    >
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(108,92,231,0.2)',
            mb: 2,
          }}
        >
          <AddCircleOutlineIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        </Box>
        <Typography variant="h4" gutterBottom>
          Create New Project
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flex: 1 }}>
          Start a new company valuation project. Upload financial statements, configure assumptions, and generate DCF valuations.
        </Typography>
        <Button variant="contained" size="small" sx={{ alignSelf: 'flex-start' }}>
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}
