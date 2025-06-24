import { postlyApi } from '@/constants/endpointList'

const UsersService = {
  getUsers: () => postlyApi.get('/users'),
}
export default UsersService
