export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

export interface ApiError {
  message: string
  code: string
  status: number
}

export const ProjectStatus = {
  DRAFT: 'draft',
  INGESTING: 'ingesting',
  VERIFYING: 'verifying',
  READY: 'ready',
  COMPLETED: 'completed',
} as const

export type ProjectStatusType = (typeof ProjectStatus)[keyof typeof ProjectStatus]

export const ValuationMethod = {
  DCF: 'dcf',
  FCFF: 'fcff',
  FCFE: 'fcfe',
  DDM: 'ddm',
} as const

export type ValuationMethodType = (typeof ValuationMethod)[keyof typeof ValuationMethod]

export const DataSourceType = {
  PDF: 'pdf',
  XBRL: 'xbrl',
  EXCEL: 'excel',
  ZIP: 'zip',
} as const

export type DataSourceTypeValue = (typeof DataSourceType)[keyof typeof DataSourceType]

export const VerificationStatus = {
  OK: 'ok',
  MISSING: 'missing',
  SUSPECT: 'suspect',
} as const

export type VerificationStatusType = (typeof VerificationStatus)[keyof typeof VerificationStatus]

export const StatementType = {
  STANDALONE: 'standalone',
  CONSOLIDATED: 'consolidated',
} as const

export type StatementTypeValue = (typeof StatementType)[keyof typeof StatementType]
