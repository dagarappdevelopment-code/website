import { useCallback } from 'react'
import type { DragEvent } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { addFile, removeFile, updateFileProgress } from '@/features/projects/store/projectWizardSlice'
import { formatFileSize } from '@/shared/utils/format'

const ACCEPTED_TYPES = ['.pdf', '.xbrl', '.xml', '.xlsx', '.xls', '.zip']

function simulateUpload(fileId: string, dispatch: ReturnType<typeof useAppDispatch>) {
  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 25
    if (progress >= 100) {
      progress = 100
      clearInterval(interval)
      dispatch(updateFileProgress({ id: fileId, progress: 100, status: 'completed' }))
    } else {
      dispatch(updateFileProgress({ id: fileId, progress, status: 'uploading' }))
    }
  }, 500)
}

export default function DataStep() {
  const dispatch = useAppDispatch()
  const files = useAppSelector((state) => state.projectWizard.draft.data.files)

  const handleFiles = useCallback(
    (fileList: FileList) => {
      Array.from(fileList).forEach((file) => {
        const fileId = crypto.randomUUID()
        dispatch(
          addFile({
            id: fileId,
            name: file.name,
            size: file.size,
            type: file.type,
            progress: 0,
            status: 'uploading',
          }),
        )
        simulateUpload(fileId, dispatch)
      })
    },
    [dispatch],
  )

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles],
  )

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files)
      }
    },
    [handleFiles],
  )

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h3" gutterBottom>
        Upload Financial Data
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Upload annual reports, financial statements, or XBRL filings.
      </Typography>

      {/* Dropzone */}
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        sx={{
          border: '2px dashed',
          borderColor: 'divider',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'rgba(108,92,231,0.04)',
          },
        }}
      >
        <CloudUploadOutlinedIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1.5 }} />
        <Typography variant="body1" gutterBottom>
          Drag and drop files here
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          Supports {ACCEPTED_TYPES.join(', ')}
        </Typography>
        <Button variant="outlined" component="label" size="small">
          Browse Files
          <input
            type="file"
            hidden
            multiple
            accept={ACCEPTED_TYPES.join(',')}
            onChange={handleFileInput}
          />
        </Button>
      </Box>

      {/* File list */}
      {files.length > 0 && (
        <List sx={{ mt: 2 }}>
          {files.map((file) => (
            <ListItem
              key={file.id}
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 1,
                mb: 1,
                border: 1,
                borderColor: 'divider',
              }}
              secondaryAction={
                <IconButton edge="end" size="small" onClick={() => dispatch(removeFile(file.id))}>
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              }
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {file.status === 'completed' ? (
                  <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 20 }} />
                ) : file.status === 'failed' ? (
                  <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: 20 }} />
                ) : (
                  <InsertDriveFileOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                secondary={formatFileSize(file.size)}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
              {file.status === 'uploading' && (
                <Box sx={{ width: 100, mr: 2 }}>
                  <LinearProgress variant="determinate" value={file.progress} />
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}
