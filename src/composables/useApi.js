import axios from 'axios'

export const useApi = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return {
    get: (url, config = {}) => instance.get(url, config),
    post: (url, data, config = {}) => instance.post(url, data, config),
    put: (url, data, config = {}) => instance.put(url, data, config),
    patch: (url, data, config = {}) => instance.patch(url, data, config),
    delete: (url, config = {}) => instance.delete(url, config),
  }
}
