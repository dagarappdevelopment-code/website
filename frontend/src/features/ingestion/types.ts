export interface SourceDocument {
  id: string
  name: string
  type: string
  pages: number
  uploadedAt: string
  status: 'processing' | 'completed' | 'failed'
}

export interface IngestionProgress {
  documentId: string
  stage: 'uploading' | 'parsing' | 'extracting' | 'complete'
  progress: number
  message: string
}
