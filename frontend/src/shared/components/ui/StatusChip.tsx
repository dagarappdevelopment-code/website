import Chip from '@mui/material/Chip'
import type { ChipProps } from '@mui/material/Chip'
import { VerificationStatus } from '@/shared/types/common'
import type { VerificationStatusType } from '@/shared/types/common'

const statusConfig: Record<
  VerificationStatusType,
  { label: string; color: ChipProps['color'] }
> = {
  [VerificationStatus.OK]: { label: 'OK', color: 'success' },
  [VerificationStatus.MISSING]: { label: 'Missing', color: 'error' },
  [VerificationStatus.SUSPECT]: { label: 'Suspect', color: 'warning' },
}

interface StatusChipProps {
  status: VerificationStatusType
  size?: ChipProps['size']
}

export default function StatusChip({ status, size = 'small' }: StatusChipProps) {
  const config = statusConfig[status]
  return <Chip label={config.label} color={config.color} size={size} variant="outlined" />
}
