import { postlyApi } from '@/constants/endpointList'

const PostService = {
  getPostsByUserId: (userId, start, limit) =>
    postlyApi.get(`/posts?userId=${userId}&_start=${start}&_limit=${limit}`),
  getAllPostsByUserId: (userId) => postlyApi.get(`/posts?userId=${userId}`),
  createPost: (payload) => postlyApi.post('/posts', payload),
  deletePost: (postId) => postlyApi.delete(`/posts/${postId}`),
}
export default PostService
