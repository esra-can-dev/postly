import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/services/UsersService', () => {
  return {
    default: {
      getUserById: vi.fn(),
    },
  }
})
vi.mock('@/utils/toastUtils', () => {
  return {
    showError: vi.fn(),
  }
})

import UsersService from '@/services/UsersService'
import { showError } from '@/utils/toastUtils'
import useUserDetailCard from '@/composables/Users/useUserDetailCard'

describe('useUserDetailCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchUserById fetches user and sets values', async () => {
    const { fetchUserById, userDetail, loading } = useUserDetailCard()

    UsersService.getUserById.mockResolvedValueOnce({ data: { id: 1, name: 'Test' } })
    await fetchUserById()

    expect(UsersService.getUserById).toHaveBeenCalled()
    expect(userDetail.value).toEqual({ id: 1, name: 'Test' })
    expect(loading.value).toBe(false)
  })

  it('fetchUserById shows error toast on failure', async () => {
    const { fetchUserById, loading } = useUserDetailCard()
    UsersService.getUserById.mockRejectedValueOnce(new Error('fail'))
    await fetchUserById()

    expect(UsersService.getUserById).toHaveBeenCalled()
    expect(showError).toHaveBeenCalledWith('There is an error while fetching the user!')
    expect(loading.value).toBe(false)
  })
})
