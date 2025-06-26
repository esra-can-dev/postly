import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/main', () => {
  const mockAdd = vi.fn()
  return {
    app: {
      config: {
        globalProperties: {
          $toast: {
            add: mockAdd,
          },
        },
      },
      _mockAdd: mockAdd,
    },
  }
})

import * as toastHelpers from '@/utils/toastUtils'
import { app as mockedApp } from '@/main'

describe('toastHelpers', () => {
  beforeEach(() => {
    mockedApp.config.globalProperties.$toast.add.mockClear()
  })

  it('showSuccess calls $toast.add with success severity', () => {
    toastHelpers.showSuccess('Success Message')
    expect(mockedApp.config.globalProperties.$toast.add).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'success',
        summary: 'Success',
        detail: 'Success Message',
        life: 3000,
      }),
    )
  })

  it('showError calls $toast.add with error severity', () => {
    toastHelpers.showError('Error Message')
    expect(mockedApp.config.globalProperties.$toast.add).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'error',
        summary: 'Error',
        detail: 'Error Message',
        life: 3000,
      }),
    )
  })
})
