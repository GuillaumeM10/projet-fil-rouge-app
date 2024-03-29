import api from "./api.service"

const ENDPOINT = "/posts"

const getAll = async (params) => {
  const response = await api.get(`${ENDPOINT}` + (params ? `?${params}` : ""))
  return response.data
}

const getAllByAuthor = async (author, page, limit) => {
  const response = await api.get(`${ENDPOINT}?author=${author}&page=${page? page : 1}&limit=${limit? limit : 10}`)
  return response.data
}

const getOneById = async (id) => {
  const response = await api.get(`${ENDPOINT}/${id}`)
  return response.data
}

const create = async (post) => {
  // convert the post object to a FormData object
  if(!post.files){
    const response = await api.post(ENDPOINT, post)
    return response.data
  }
  const formData = new FormData();

  formData.append('author', post.author)
  formData.append('content', post.content)

  if(post.cities) formData.append('cities', JSON.stringify(post.cities))
  if(post.skills) formData.append('skills', JSON.stringify(post.skills))

  if(post.published === true) formData.append('published', "true")
  if(post.published === false) formData.append('published', "false")

  // FILES
  const files = Array.from(post.files)
  files.forEach((file, index) => {
    formData.append('files', file)
  })
  
  const response = await api.post(ENDPOINT, formData, { formData: true })
  return response.data
}

const update = async (id, post) => {
  if(!post.files){
    const response = await api.put(`${ENDPOINT}/${id}`, post)
    return response.data
  }
  const formData = new FormData();

  formData.append('author', post.author)
  formData.append('content', post.content)

  if(post.cities) formData.append('cities', JSON.stringify(post.cities))
  if(post.skills) formData.append('skills', JSON.stringify(post.skills))

  if(post.published === true) formData.append('published', "true")
  if(post.published === false) formData.append('published', "false")

  const files = Array.from(post.files)
  files.forEach((file, index) => {
    formData.append('files', file)
  })

  const response = await api.put(`${ENDPOINT}/${id}`, formData, { formData: true })
  return response.data
}

const remove = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`)
  return response.data
}

const PostService = {
  getAll,
  getAllByAuthor,
  getOneById,
  create,
  update,
  remove
}

export default PostService