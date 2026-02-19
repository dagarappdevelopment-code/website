import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { nextStep, prevStep, setActiveStep, resetWizard } from '@/features/projects/store/projectWizardSlice'
import BasicsStep from '../components/wizard/BasicsStep'
import DataStep from '../components/wizard/DataStep'
import AssumptionsStep from '../components/wizard/AssumptionsStep'
import ReviewStep from '../components/wizard/ReviewStep'

const steps = ['Basics', 'Data', 'Assumptions', 'Review']

export default function CreateProjectPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const activeStep = useAppSelector((state) => state.projectWizard.activeStep)
  const [stepValid, setStepValid] = useState(true)

  const handleValidChange = useCallback((valid: boolean) => {
    setStepValid(valid)
  }, [])

  const handleNext = () => {
    dispatch(nextStep())
  }

  const handleBack = () => {
    dispatch(prevStep())
  }

  const handleSubmit = () => {
    // Mock submit — in production, dispatch createProject thunk
    dispatch(resetWizard())
    navigate('/projects')
  }

  const handleStepClick = (step: number) => {
    if (step < activeStep) {
      dispatch(setActiveStep(step))
    }
  }

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <BasicsStep onValidChange={handleValidChange} />
      case 1:
        return <DataStep />
      case 2:
        return <AssumptionsStep onValidChange={handleValidChange} />
      case 3:
        return <ReviewStep />
      default:
        return null
    }
  }

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              onClick={() => handleStepClick(index)}
              sx={{ cursor: index < activeStep ? 'pointer' : 'default' }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ minHeight: 400, mb: 4 }}>{renderStep()}</Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext} disabled={!stepValid}>
            Continue
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSubmit}>
            Create Project
          </Button>
        )}
      </Box>
    </Box>
  )
}
