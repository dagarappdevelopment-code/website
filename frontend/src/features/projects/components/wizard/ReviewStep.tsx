import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import { useAppSelector } from '@/app/store'
import { formatFileSize } from '@/shared/utils/format'

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {value}
      </Typography>
    </Box>
  )
}

export default function ReviewStep() {
  const { basics, data, assumptions } = useAppSelector((state) => state.projectWizard.draft)

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h3" gutterBottom>
        Review & Submit
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Review your project configuration before creating the valuation.
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            Project Basics
          </Typography>
          <Divider sx={{ my: 1 }} />
          <SummaryRow label="Project Name" value={basics.projectName || '—'} />
          <SummaryRow label="Company Name" value={basics.companyName || '—'} />
          <SummaryRow label="CIN" value={basics.cin || '—'} />
          <SummaryRow
            label="Statement Type"
            value={basics.statementType === 'consolidated' ? 'Consolidated' : 'Standalone'}
          />
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            Uploaded Files
          </Typography>
          <Divider sx={{ my: 1 }} />
          {data.files.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
              No files uploaded
            </Typography>
          ) : (
            <List disablePadding dense>
              {data.files.map((file) => (
                <ListItem key={file.id} disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <InsertDriveFileOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    secondary={formatFileSize(file.size)}
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                  <Chip
                    label={file.status}
                    size="small"
                    color={file.status === 'completed' ? 'success' : 'default'}
                    variant="outlined"
                    sx={{ textTransform: 'capitalize', fontSize: '0.688rem' }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            Valuation Assumptions
          </Typography>
          <Divider sx={{ my: 1 }} />
          <SummaryRow label="Valuation Method" value={assumptions.valuationMethod.toUpperCase()} />
          <SummaryRow label="Tax Rate" value={`${assumptions.taxRate}%`} />
          <SummaryRow label="Discount Rate (WACC)" value={`${assumptions.discountRate}%`} />
          <SummaryRow label="Terminal Growth Rate" value={`${assumptions.terminalGrowthRate}%`} />
        </CardContent>
      </Card>
    </Box>
  )
}
