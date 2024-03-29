import api from "./api.service";

const ENDPOINT = "/users-details"

const update = async (id, userDetail) => {
  const formData = new FormData();

  if(userDetail.contactEmail) formData.append('contactEmail', userDetail.contactEmail) 
  if(userDetail.country) formData.append('country', userDetail.country)
  if(userDetail.status) formData.append('status', userDetail.status)
  if(userDetail.formation) formData.append('formation', userDetail.formation)
  if(userDetail.description) formData.append('description', userDetail.description)
  if(userDetail.range) formData.append('range', userDetail.range)
  if(userDetail.school) formData.append('school', userDetail.school)

  formData.append('profilComplet', "true")
  // formData.append('displayedOnFeed', "true")

  if(userDetail.displayedOnFeed === true) formData.append('displayedOnFeed', "true")
  if(userDetail.displayedOnFeed === false) formData.append('displayedOnFeed', "false")

  // if(userDetail.profilComplet === true) formData.append('profilComplet', "true")
  // if(userDetail.profilComplet === false) formData.append('profilComplet', "false")


  if(userDetail.skills) formData.append('skills', JSON.stringify(userDetail.skills))
  if(userDetail.experiences) formData.append('experiences', JSON.stringify(userDetail.experiences))
  if(userDetail.cities) formData.append('cities', JSON.stringify(userDetail.cities))
  if(userDetail.links) formData.append('links', JSON.stringify(userDetail.links))

  const fileType = (name, filesObj) => {
    const files = Array.from(filesObj)

    files.forEach((file, index) => {
      formData.append(name, file)
    })
  }
  if(userDetail.files === null) {
    formData.append('files', null)
  }else if(userDetail.files) fileType('files', userDetail.files)
  
  if(userDetail.cv === null) {
    formData.append('cv', null)
  }else if(userDetail.cv) fileType('cv', userDetail.cv)

  if(userDetail.banner === null) {
    formData.append('banner', null)
  }else if(userDetail.banner) fileType('banner', userDetail.banner)

  if(userDetail.personalPicture === null) {
    formData.append('personalPicture', null)
  }else if(userDetail.personalPicture) {
    fileType('personalPicture', userDetail.personalPicture)
  }

  const response = await api.put(`${ENDPOINT}/${id}`, formData, { formData: true })

  return response.data
}

const UserDetailService = {
  update
}

export default UserDetailService