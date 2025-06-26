import { describe, it, expect, vi, beforeEach } from 'vitest'
vi.mock('@/constants/endpointList', () => ({
  postlyApi: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}))

let PostService
let postlyApi

describe('PostService', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    const endpointList = await import('@/constants/endpointList')
    postlyApi = endpointList.postlyApi

    const serviceModule = await import('@/services/PostService')
    PostService = serviceModule.default
  })

  it('should call getPostsByUserId with "userId", "start" and "limit"', async () => {
    await PostService.getPostsByUserId(1, 0, 3)
    expect(postlyApi.get).toHaveBeenCalledWith('/posts?userId=1&_start=0&_limit=3')
  })

  it('should call getAllPostsByUserId with "userId"', async () => {
    await PostService.getAllPostsByUserId(1)
    expect(postlyApi.get).toHaveBeenCalledWith('/posts?userId=1')
  })

  it('should call createPost with payload', async () => {
    const payload = { title: 'foo', body: 'bar', userId: 1 }
    await PostService.createPost(payload)
    expect(postlyApi.post).toHaveBeenCalledWith('/posts', payload)
  })

  it('should call deletePost with "postId"', async () => {
    await PostService.deletePost(30)
    expect(postlyApi.delete).toHaveBeenCalledWith('/posts/30')
  })
})
