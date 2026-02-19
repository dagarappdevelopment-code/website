import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import { formatCurrency, formatPercent } from '@/shared/utils/format'

const mockValuation = {
  narrative: 'Based on a DCF analysis using projected free cash flows over a 10-year forecast period, the intrinsic value of Reliance Industries suggests moderate upside potential. Strong revenue growth expectations and improving margins support the valuation, though elevated debt levels and capex requirements present downside risks.',
  intrinsicValueLow: 2450,
  intrinsicValueMid: 2820,
  intrinsicValueHigh: 3190,
  currentMarketPrice: 2650,
  upsidePercent: 6.4,
  confidenceScore: 78,
  method: 'DCF',
}

const sensitivityDrivers = [
  { name: 'Revenue Growth Rate', baseValue: 12, impact: 340, unit: '%' },
  { name: 'WACC', baseValue: 10, impact: -280, unit: '%' },
  { name: 'Terminal Growth', baseValue: 3, impact: 190, unit: '%' },
  { name: 'EBITDA Margin', baseValue: 19, impact: 220, unit: '%' },
  { name: 'Tax Rate', baseValue: 25, impact: -85, unit: '%' },
]

export default function ValuationPage() {
  const v = mockValuation

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h2" gutterBottom>
            Valuation Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reliance Industries Ltd · {v.method} Analysis
          </Typography>
        </Box>
        <Chip
          icon={<VerifiedOutlinedIcon />}
          label={`Confidence: ${v.confidenceScore}%`}
          color={v.confidenceScore >= 80 ? 'success' : v.confidenceScore >= 60 ? 'warning' : 'error'}
          variant="outlined"
        />
      </Box>

      <Grid container spacing={3}>
        {/* Narrative */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="overline" color="text.secondary" gutterBottom>
                AI Narrative
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mt: 1 }}>
                {v.narrative}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Intrinsic Value Range */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="overline" color="text.secondary" gutterBottom>
                Intrinsic Value Range
              </Typography>
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="h2" sx={{ color: 'primary.main' }}>
                  {formatCurrency(v.intrinsicValueMid)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Range: {formatCurrency(v.intrinsicValueLow)} — {formatCurrency(v.intrinsicValueHigh)}
                </Typography>
              </Box>
              {/* Visual range bar */}
              <Box sx={{ position: 'relative', height: 8, bgcolor: 'divider', borderRadius: 1, mt: 3 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '15%',
                    right: '15%',
                    height: '100%',
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                    opacity: 0.6,
                  }}
                />
                {/* Current price marker */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: `${((v.currentMarketPrice - v.intrinsicValueLow) / (v.intrinsicValueHigh - v.intrinsicValueLow)) * 100}%`,
                    top: -4,
                    width: 4,
                    height: 16,
                    bgcolor: 'warning.main',
                    borderRadius: 0.5,
                    transform: 'translateX(-50%)',
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">Bear</Typography>
                <Typography variant="caption" color="warning.main">CMP: {formatCurrency(v.currentMarketPrice)}</Typography>
                <Typography variant="caption" color="text.secondary">Bull</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upside / Confidence */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
            {/* Upside card */}
            <Card sx={{ flex: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="overline" color="text.secondary" gutterBottom>
                  Upside Potential
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <TrendingUpIcon sx={{ color: v.upsidePercent >= 0 ? 'success.main' : 'error.main' }} />
                  <Typography variant="h2" sx={{ color: v.upsidePercent >= 0 ? 'success.main' : 'error.main' }}>
                    {v.upsidePercent >= 0 ? '+' : ''}{formatPercent(v.upsidePercent)}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Based on mid-range intrinsic value vs current market price
                </Typography>
              </CardContent>
            </Card>

            {/* Confidence card */}
            <Card sx={{ flex: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="overline" color="text.secondary" gutterBottom>
                  Model Confidence
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h3">{v.confidenceScore}%</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {v.confidenceScore >= 80 ? 'High' : v.confidenceScore >= 60 ? 'Moderate' : 'Low'}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={v.confidenceScore}
                    color={v.confidenceScore >= 80 ? 'success' : v.confidenceScore >= 60 ? 'warning' : 'error'}
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Sensitivity Drivers */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="overline" color="text.secondary" gutterBottom>
                Key Sensitivity Drivers
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {sensitivityDrivers.map((driver) => (
                  <Box key={driver.name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ width: 180, flexShrink: 0 }}>
                      {driver.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 60, textAlign: 'right' }}>
                      {driver.baseValue}{driver.unit}
                    </Typography>
                    <Box sx={{ flex: 1, height: 6, bgcolor: 'divider', borderRadius: 1, position: 'relative' }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          left: driver.impact >= 0 ? '50%' : `${50 + (driver.impact / 700) * 50}%`,
                          width: `${Math.abs(driver.impact / 700) * 50}%`,
                          height: '100%',
                          bgcolor: driver.impact >= 0 ? 'success.main' : 'error.main',
                          borderRadius: 1,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      fontFamily="monospace"
                      sx={{ width: 80, textAlign: 'right', color: driver.impact >= 0 ? 'success.main' : 'error.main' }}
                    >
                      {driver.impact >= 0 ? '+' : ''}{formatCurrency(driver.impact)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Forecast Trends (placeholder) */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="overline" color="text.secondary" gutterBottom>
                Forecast Trends
              </Typography>
              <Box
                sx={{
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 1,
                  mt: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Chart placeholder — Revenue, EBITDA, and FCF forecast trends
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
