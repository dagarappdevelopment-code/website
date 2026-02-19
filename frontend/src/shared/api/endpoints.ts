export const endpoints = {
  projects: {
    list: '/projects',
    detail: (id: string) => `/projects/${id}`,
    create: '/projects',
    update: (id: string) => `/projects/${id}`,
    delete: (id: string) => `/projects/${id}`,
  },
  ingestion: {
    upload: (projectId: string) => `/projects/${projectId}/upload`,
    status: (projectId: string) => `/projects/${projectId}/ingestion/status`,
    documents: (projectId: string) => `/projects/${projectId}/documents`,
  },
  verification: {
    metrics: (projectId: string) => `/projects/${projectId}/metrics`,
    verify: (projectId: string, metricId: string) =>
      `/projects/${projectId}/metrics/${metricId}/verify`,
    explain: (projectId: string, metricId: string) =>
      `/projects/${projectId}/metrics/${metricId}/explain`,
  },
  valuation: {
    overview: (projectId: string) => `/projects/${projectId}/valuation`,
    sensitivity: (projectId: string) => `/projects/${projectId}/valuation/sensitivity`,
    forecast: (projectId: string) => `/projects/${projectId}/valuation/forecast`,
  },
  chat: {
    send: '/chat/message',
    history: (projectId: string) => `/chat/${projectId}/history`,
  },
} as const
