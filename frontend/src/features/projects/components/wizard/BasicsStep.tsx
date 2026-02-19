import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { updateBasics } from '@/features/projects/store/projectWizardSlice'

const basicsSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  cin: z.string().min(1, 'CIN is required'),
  statementType: z.union([z.literal('standalone'), z.literal('consolidated')]),
})

type BasicsFormData = z.infer<typeof basicsSchema>

interface Props {
  onValidChange: (valid: boolean) => void
}

export default function BasicsStep({ onValidChange }: Props) {
  const dispatch = useAppDispatch()
  const basics = useAppSelector((state) => state.projectWizard.draft.basics)

  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<BasicsFormData>({
    resolver: zodResolver(basicsSchema),
    defaultValues: basics,
    mode: 'onChange',
  })

  useEffect(() => {
    onValidChange(isValid)
  }, [isValid, onValidChange])

  useEffect(() => {
    const subscription = watch((data) => {
      dispatch(updateBasics(data as BasicsFormData))
    })
    return () => subscription.unsubscribe()
  }, [watch, dispatch])

  return (
    <Box sx={{ maxWidth: 560 }}>
      <Typography variant="h3" gutterBottom>
        Project Basics
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Enter the basic details for your valuation project.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Controller
          name="projectName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Project Name"
              placeholder="e.g., Reliance Industries DCF Analysis"
              error={!!errors.projectName}
              helperText={errors.projectName?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Name"
              placeholder="e.g., Reliance Industries Ltd"
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="cin"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="CIN (Corporate Identity Number)"
              placeholder="e.g., L17110MH1973PLC019786"
              error={!!errors.cin}
              helperText={errors.cin?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="statementType"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel>Statement Type</FormLabel>
              <RadioGroup {...field} row>
                <FormControlLabel value="standalone" control={<Radio />} label="Standalone" />
                <FormControlLabel value="consolidated" control={<Radio />} label="Consolidated" />
              </RadioGroup>
            </FormControl>
          )}
        />
      </Box>
    </Box>
  )
}
