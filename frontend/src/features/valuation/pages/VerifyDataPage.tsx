import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import StatusChip from '@/shared/components/ui/StatusChip'
import { formatCompactNumber } from '@/shared/utils/format'
import type { VerificationStatusType } from '@/shared/types/common'
import type { ExtractedMetric } from '../types'

const mockDocuments = [
  { id: '1', name: 'Annual Report 2024', active: true },
  { id: '2', name: 'Balance Sheet Q3', active: false },
  { id: '3', name: 'P&L Statement', active: false },
]

const mockMetrics: ExtractedMetric[] = [
  { id: '1', name: 'Revenue', category: 'Income', value: 256780000000, unit: 'INR', year: 'FY2024', status: 'ok', source: 'Annual Report p.42', confidence: 0.98 },
  { id: '2', name: 'EBITDA', category: 'Income', value: 48920000000, unit: 'INR', year: 'FY2024', status: 'ok', source: 'Annual Report p.43', confidence: 0.95 },
  { id: '3', name: 'EBIT', category: 'Income', value: 35610000000, unit: 'INR', year: 'FY2024', status: 'ok', source: 'Annual Report p.43', confidence: 0.94 },
  { id: '4', name: 'Net Income', category: 'Income', value: 24150000000, unit: 'INR', year: 'FY2024', status: 'ok', source: 'Annual Report p.44', confidence: 0.97 },
  { id: '5', name: 'Total Debt', category: 'Balance Sheet', value: 89200000000, unit: 'INR', year: 'FY2024', status: 'suspect', source: 'Balance Sheet p.2', confidence: 0.72 },
  { id: '6', name: 'Cash & Equivalents', category: 'Balance Sheet', value: 15430000000, unit: 'INR', year: 'FY2024', status: 'ok', source: 'Balance Sheet p.1', confidence: 0.96 },
  { id: '7', name: 'Capex', category: 'Cash Flow', value: null, unit: 'INR', year: 'FY2024', status: 'missing', source: '\u2014', confidence: 0 },
  { id: '8', name: 'Depreciation', category: 'Cash Flow', value: 13310000000, unit: 'INR', year: 'FY2024', status: 'ok', source: 'Annual Report p.48', confidence: 0.91 },
  { id: '9', name: 'Working Capital', category: 'Balance Sheet', value: null, unit: 'INR', year: 'FY2024', status: 'missing', source: '\u2014', confidence: 0 },
  { id: '10', name: 'Free Cash Flow', category: 'Cash Flow', value: 29840000000, unit: 'INR', year: 'FY2024', status: 'suspect', source: 'Derived', confidence: 0.68 },
]

export default function VerifyDataPage() {
  const [selectedDoc, setSelectedDoc] = useState('1')

  return (
    <Box sx={{ display: 'flex', gap: 3, height: 'calc(100vh - 140px)' }}>
      {/* Left: Document list */}
      <Card sx={{ width: 260, flexShrink: 0 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="overline" color="text.secondary" sx={{ px: 1 }}>
            Source Documents
          </Typography>
          <List disablePadding sx={{ mt: 1 }}>
            {mockDocuments.map((doc) => (
              <ListItemButton
                key={doc.id}
                selected={selectedDoc === doc.id}
                onClick={() => setSelectedDoc(doc.id)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(108,92,231,0.12)',
                    '&:hover': { backgroundColor: 'rgba(108,92,231,0.18)' },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />
                </ListItemIcon>
                <ListItemText
                  primary={doc.name}
                  primaryTypographyProps={{ variant: 'body2', fontSize: '0.813rem' }}
                />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Main: Metrics table */}
      <Card sx={{ flex: 1, overflow: 'auto' }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4">Extracted Metrics</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" variant="outlined" startIcon={<CheckCircleOutlineIcon />}>
                Verify All
              </Button>
            </Box>
          </Box>
          <TableContainer>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockMetrics.map((metric) => (
                  <TableRow key={metric.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {metric.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {metric.category}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontFamily="monospace">
                        {metric.value !== null ? formatCompactNumber(metric.value) : '\u2014'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {metric.year}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusChip status={metric.status as VerificationStatusType} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {metric.source}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {metric.status !== 'ok' && (
                        <Button size="small" startIcon={<HelpOutlineIcon />} sx={{ fontSize: '0.75rem' }}>
                          {metric.status === 'missing' ? 'Explain' : 'Verify'}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}
