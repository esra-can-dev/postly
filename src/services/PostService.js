import { postlyApi } from '@/constants/endpointList'

const UsersService = {
  getPostsByUserId: (userId, start, limit) =>
    postlyApi.get(`/posts?userId=${userId}&_start=${start}&_limit=${limit}`),
  getAllPostsByUserId: (userId) => postlyApi.get(`/posts?userId=${userId}`),
}
export default UsersService
