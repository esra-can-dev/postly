import { describe, it, expect, vi, beforeEach } from 'vitest'
vi.mock('@/constants/endpointList', () => ({
  postlyApi: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}))

let UsersService
let postlyApi

describe('UsersService', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    const endpointList = await import('@/constants/endpointList')
    postlyApi = endpointList.postlyApi

    const serviceModule = await import('@/services/UsersService')
    UsersService = serviceModule.default
  })

  it('should call getUsers', async () => {
    await UsersService.getUsers()
    expect(postlyApi.get).toHaveBeenCalledWith('/users')
  })

  it('should call getUserById with "id"', async () => {
    await UsersService.getUserById(1)
    expect(postlyApi.get).toHaveBeenCalledWith('/users/1')
  })
})
