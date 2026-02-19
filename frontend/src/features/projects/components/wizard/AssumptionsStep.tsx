import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { updateAssumptions } from '@/features/projects/store/projectWizardSlice'
import { ValuationMethod } from '@/shared/types/common'
import type { ProjectWizardData } from '@/features/projects/types'

const valuationMethodValues = Object.values(ValuationMethod) as [string, ...string[]]

const assumptionsSchema = z.object({
  taxRate: z.number().min(0).max(100),
  discountRate: z.number().min(0).max(100),
  terminalGrowthRate: z.number().min(0).max(20),
  valuationMethod: z.enum(valuationMethodValues),
})

type AssumptionsFormData = z.infer<typeof assumptionsSchema>

const methodOptions = [
  { value: ValuationMethod.DCF, label: 'DCF - Discounted Cash Flow' },
  { value: ValuationMethod.FCFF, label: 'FCFF - Free Cash Flow to Firm' },
  { value: ValuationMethod.FCFE, label: 'FCFE - Free Cash Flow to Equity' },
  { value: ValuationMethod.DDM, label: 'DDM - Dividend Discount Model' },
]

interface Props {
  onValidChange: (valid: boolean) => void
}

export default function AssumptionsStep({ onValidChange }: Props) {
  const dispatch = useAppDispatch()
  const assumptions = useAppSelector((state) => state.projectWizard.draft.assumptions)

  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<AssumptionsFormData>({
    resolver: zodResolver(assumptionsSchema),
    defaultValues: assumptions,
    mode: 'onChange',
  })

  useEffect(() => {
    onValidChange(isValid)
  }, [isValid, onValidChange])

  useEffect(() => {
    const subscription = watch((data) => {
      dispatch(updateAssumptions(data as Partial<ProjectWizardData['assumptions']>))
    })
    return () => subscription.unsubscribe()
  }, [watch, dispatch])

  return (
    <Box sx={{ maxWidth: 560 }}>
      <Typography variant="h3" gutterBottom>
        Valuation Assumptions
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Configure the key assumptions for your valuation model.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Controller
          name="valuationMethod"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Valuation Method"
              error={!!errors.valuationMethod}
              helperText={errors.valuationMethod?.message}
              fullWidth
            >
              {methodOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="taxRate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Tax Rate"
              type="number"
              error={!!errors.taxRate}
              helperText={errors.taxRate?.message}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                },
              }}
            />
          )}
        />

        <Controller
          name="discountRate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Discount Rate (WACC)"
              type="number"
              error={!!errors.discountRate}
              helperText={errors.discountRate?.message}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                },
              }}
            />
          )}
        />

        <Controller
          name="terminalGrowthRate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Terminal Growth Rate"
              type="number"
              error={!!errors.terminalGrowthRate}
              helperText={errors.terminalGrowthRate?.message}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                },
              }}
            />
          )}
        />
      </Box>
    </Box>
  )
}
