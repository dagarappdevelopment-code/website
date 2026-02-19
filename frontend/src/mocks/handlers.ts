import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/projects', () => {
    return HttpResponse.json({
      data: [
        { id: '1', name: 'Reliance Industries DCF', companyName: 'Reliance Industries Ltd', status: 'completed', valuationMethod: 'dcf', createdAt: '2026-02-01T00:00:00Z', updatedAt: '2026-02-15T00:00:00Z' },
        { id: '2', name: 'Bosch Ltd Valuation', companyName: 'Bosch Limited', status: 'verifying', valuationMethod: 'fcff', createdAt: '2026-02-05T00:00:00Z', updatedAt: '2026-02-12T00:00:00Z' },
      ],
      total: 2,
      page: 1,
      pageSize: 10,
    })
  }),

  http.post('/api/projects', () => {
    return HttpResponse.json({
      id: crypto.randomUUID(),
      name: 'New Project',
      status: 'draft',
      createdAt: new Date().toISOString(),
    })
  }),

  http.post('/api/chat/message', async ({ request }) => {
    const body = (await request.json()) as Record<string, string>
    return HttpResponse.json({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `This is a mock AI response to: "${body.message}"`,
      timestamp: new Date().toISOString(),
    })
  }),
]
