import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { useApi } from '@/composables/useApi'

vi.mock('axios')

describe('useApi', () => {
  let axiosInstanceMock

  const mockUrl = 'https://jsonplaceholder.typicode.com'

  beforeEach(() => {
    axiosInstanceMock = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    }

    axios.create.mockReturnValue(axiosInstanceMock)
  })

  it('creates axios instance with baseURL', () => {
    useApi(mockUrl)

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: mockUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })

  it('calls get method with correct arguments', () => {
    const api = useApi(mockUrl)
    api.get('/users', { params: { id: 1 } })

    expect(axiosInstanceMock.get).toHaveBeenCalledWith('/users', {
      params: { id: 1 },
    })
  })

  it('calls post method with correct arguments', () => {
    const api = useApi(mockUrl)
    api.post('/posts', { title: 'Title 1' }, { headers: { foo: 'bar' } })

    expect(axiosInstanceMock.post).toHaveBeenCalledWith(
      '/posts',
      { title: 'Title 1' },
      { headers: { foo: 'bar' } },
    )
  })

  it('calls put method with correct arguments', () => {
    const api = useApi(mockUrl)
    api.put('/posts/1', { title: 'Title 1 - Updated' })

    expect(axiosInstanceMock.put).toHaveBeenCalledWith(
      '/posts/1',
      { title: 'Title 1 - Updated' },
      {},
    )
  })

  it('calls patch method with correct arguments', () => {
    const api = useApi(mockUrl)
    api.patch('/posts/1', { title: 'Title 1 - Updated' })

    expect(axiosInstanceMock.patch).toHaveBeenCalledWith(
      '/posts/1',
      { title: 'Title 1 - Updated' },
      {},
    )
  })

  it('calls delete method with correct arguments', () => {
    const api = useApi(mockUrl)
    api.delete('/posts/11')

    expect(axiosInstanceMock.delete).toHaveBeenCalledWith('/posts/11', {})
  })
})
