import { postlyApi } from '@/constants/endpointList'

const UsersService = {
  getUsers: () => postlyApi.get('/users'),
  getUserById: (id) => postlyApi.get(`/users/${id}`),
}
export default UsersService
