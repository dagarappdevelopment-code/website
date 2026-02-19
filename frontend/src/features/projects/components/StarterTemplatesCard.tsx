import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'

const templates = [
  { label: 'DCF Model', description: 'Discounted Cash Flow' },
  { label: 'FCFF Model', description: 'Free Cash Flow to Firm' },
  { label: 'FCFE Model', description: 'Free Cash Flow to Equity' },
  { label: 'DDM', description: 'Dividend Discount Model' },
]

export default function StarterTemplatesCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(253,203,110,0.15)',
            mb: 2,
          }}
        >
          <AutoAwesomeOutlinedIcon sx={{ color: 'warning.main', fontSize: 28 }} />
        </Box>
        <Typography variant="h4" gutterBottom>
          Starter Templates
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Choose from pre-built valuation templates to accelerate your analysis.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {templates.map((t) => (
            <Chip
              key={t.label}
              label={t.label}
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'warning.main',
                  backgroundColor: 'rgba(253,203,110,0.08)',
                },
                cursor: 'pointer',
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
