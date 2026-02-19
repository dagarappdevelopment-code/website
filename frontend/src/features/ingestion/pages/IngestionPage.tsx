import { useCallback, useState } from 'react'
import type { DragEvent } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import type { SourceDocument } from '../types'

const mockDocuments: SourceDocument[] = [
  { id: '1', name: 'Annual_Report_2024.pdf', type: 'pdf', pages: 142, uploadedAt: '2026-02-15T10:30:00Z', status: 'completed' },
  { id: '2', name: 'Balance_Sheet_Q3.xbrl', type: 'xbrl', pages: 1, uploadedAt: '2026-02-15T10:32:00Z', status: 'completed' },
  { id: '3', name: 'PnL_Statement.pdf', type: 'pdf', pages: 24, uploadedAt: '2026-02-15T10:35:00Z', status: 'processing' },
]

const statusConfig: Record<string, { color: 'success' | 'warning' | 'error'; label: string }> = {
  completed: { color: 'success', label: 'Processed' },
  processing: { color: 'warning', label: 'Processing' },
  failed: { color: 'error', label: 'Failed' },
}

export default function IngestionPage() {
  const [documents, setDocuments] = useState<SourceDocument[]>(mockDocuments)
  const [uploading, setUploading] = useState(false)

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (e.dataTransfer.files.length > 0) {
        setUploading(true)
        const newDoc: SourceDocument = {
          id: crypto.randomUUID(),
          name: e.dataTransfer.files[0].name,
          type: 'pdf',
          pages: 0,
          uploadedAt: new Date().toISOString(),
          status: 'processing',
        }
        setDocuments((prev) => [newDoc, ...prev])
        setTimeout(() => {
          setDocuments((prev) =>
            prev.map((d) => (d.id === newDoc.id ? { ...d, status: 'completed' as const, pages: 42 } : d)),
          )
          setUploading(false)
        }, 3000)
      }
    },
    [],
  )

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Data Ingestion
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Upload and manage source financial documents for data extraction.
      </Typography>

      {/* Upload area */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 5,
              textAlign: 'center',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(108,92,231,0.04)',
              },
            }}
          >
            <CloudUploadOutlinedIcon sx={{ fontSize: 56, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Upload Financial Documents
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Drag and drop PDF, XBRL, or Excel files here, or click to browse
            </Typography>
            <Button variant="outlined" component="label">
              Browse Files
              <input type="file" hidden multiple accept=".pdf,.xbrl,.xml,.xlsx,.xls,.zip" />
            </Button>
          </Box>
          {uploading && <LinearProgress sx={{ mt: 2 }} />}
        </CardContent>
      </Card>

      {/* Document list */}
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Source Documents
          </Typography>
          <List disablePadding>
            {documents.map((doc) => (
              <ListItem
                key={doc.id}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  border: 1,
                  borderColor: 'divider',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <DescriptionOutlinedIcon sx={{ color: 'text.secondary' }} />
                </ListItemIcon>
                <ListItemText
                  primary={doc.name}
                  secondary={`${doc.type.toUpperCase()} · ${doc.pages} pages`}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
                <Chip
                  label={statusConfig[doc.status]?.label ?? doc.status}
                  size="small"
                  color={statusConfig[doc.status]?.color ?? 'default'}
                  variant="outlined"
                  sx={{ fontSize: '0.688rem' }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}
