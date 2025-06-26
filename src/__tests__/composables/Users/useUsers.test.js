import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/services/UsersService', () => {
  return {
    default: {
      getUsers: vi.fn(),
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
import useUsers from '@/composables/Users/useUsers'

describe('useUsers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchUsers fetches users and sets values', async () => {
    const { fetchUsers, userList, loading } = useUsers()

    UsersService.getUsers.mockResolvedValueOnce({ data: [{ id: 1, name: 'Test' }] })
    await fetchUsers()

    expect(UsersService.getUsers).toHaveBeenCalled()
    expect(userList.value).toEqual([{ id: 1, name: 'Test' }])
    expect(loading.value).toBe(false)
  })

  it('fetchUsers shows error toast on failure', async () => {
    const { fetchUsers, loading } = useUsers()
    UsersService.getUsers.mockRejectedValueOnce(new Error('fail'))
    await fetchUsers()

    expect(UsersService.getUsers).toHaveBeenCalled()
    expect(showError).toHaveBeenCalledWith('There is an error while fetching users!')
    expect(loading.value).toBe(false)
  })
})
