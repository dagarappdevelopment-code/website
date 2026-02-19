import type { VerificationStatusType } from '@/shared/types/common'

export interface ExtractedMetric {
  id: string
  name: string
  category: string
  value: number | null
  unit: string
  year: string
  status: VerificationStatusType
  source: string
  confidence: number
}

export interface ValuationResult {
  projectId: string
  narrative: string
  intrinsicValueLow: number
  intrinsicValueMid: number
  intrinsicValueHigh: number
  currentMarketPrice: number
  upsidePercent: number
  confidenceScore: number
  method: string
}

export interface SensitivityDriver {
  id: string
  name: string
  baseValue: number
  impact: number
  unit: string
}

export interface ForecastDataPoint {
  year: string
  revenue: number
  ebitda: number
  fcf: number
}
