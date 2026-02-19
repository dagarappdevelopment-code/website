import type { ProjectStatusType, StatementTypeValue, ValuationMethodType } from '@/shared/types/common'

export interface Project {
  id: string
  name: string
  companyName: string
  cin: string
  statementType: StatementTypeValue
  status: ProjectStatusType
  valuationMethod: ValuationMethodType
  createdAt: string
  updatedAt: string
}

export interface ProjectWizardData {
  basics: {
    projectName: string
    companyName: string
    cin: string
    statementType: StatementTypeValue
  }
  data: {
    files: UploadedFile[]
  }
  assumptions: {
    taxRate: number
    discountRate: number
    terminalGrowthRate: number
    valuationMethod: ValuationMethodType
  }
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'failed'
}
