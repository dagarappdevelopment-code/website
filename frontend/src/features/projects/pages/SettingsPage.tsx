import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function SettingsPage() {
  return (
    <Box sx={{ maxWidth: 640 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your account and application preferences
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="Full Name" defaultValue="Analyst User" fullWidth />
            <TextField label="Email" defaultValue="analyst@finalyze.com" fullWidth />
            <TextField label="Organization" defaultValue="Finalyze" fullWidth />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Preferences
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Dark Mode"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Show AI Chat Panel"
            />
            <FormControlLabel
              control={<Switch />}
              label="Email Notifications"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Auto-save Wizard Progress"
            />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Default Assumptions
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="Default Tax Rate (%)" type="number" defaultValue={25} fullWidth />
            <TextField label="Default WACC (%)" type="number" defaultValue={10} fullWidth />
            <TextField label="Default Terminal Growth Rate (%)" type="number" defaultValue={3} fullWidth />
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Save Changes</Button>
      </Box>
    </Box>
  )
}
