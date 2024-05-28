import axios from 'axios'
import { toast } from 'react-toastify'
import func from '../utils/functions'
import http from './http'

// const REACT_APP_API_URL = 'https://arttice.itideja.lt/api'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const createPage = (payload) =>{
  return http.axiosInstance
  .post('/page', payload)
  .then((response) => {
    const { data } = response
    if(response.status === 201){
      let userData = JSON.parse(localStorage.getItem('userPages'))
      let newPage = {
        contentType: "page",
        contentId: data.id,
        contentUUID: data.uuid,
      }
    // let updatedStorage = {...userData, [lastIdx]: newEvent }
    let updatedStorage = [...userData, newPage ]
    localStorage.setItem('userPages', JSON.stringify(updatedStorage))
    let lastIdx =  Object.keys(userData).length; 
    // let updatedStorage = {...userData, [lastIdx]: newEvent }
    console.log('updatedStorage ', updatedStorage, 'index', lastIdx)
    localStorage.setItem('userPages', JSON.stringify(updatedStorage))
    }
    return getPage(data.uuid)
  })
  .catch((error) => {
    const { status } = error.response
    const msg = error.response.data.name ?  error.response.data.name [0] : ''

    if (status === 401) {
      toast.error('It seems you are not logged in')
      return { error: status }
    }
    if (status === 400) {
      toast.error(
        msg.length > 0 ? msg : 'Oops something went wrong please try again'
      )
      return {
        error: error.response,
      }
    }
    console.log(error.response)
    return error.response
  })
}
 
const updatePage = (payload, id) => {
  return http.axiosInstance
  .patch(`/page/${id}`, payload)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error.response
    })
  }    


const uploadImage = (formData) =>{
  return axios(`${process.env.REACT_APP_API_URL}/media/uploadImage`, {
    method: 'post',
    data: formData,
    withCredentials: true,
    headers: { 'Content-type': 'multipart/form-data' },
  })
  .then(
    (response) => {
      return response
    },
    (error) => {
      const { status } = error.response
      console.log(error.response)
      return status
    },
  )}


  const postAvatar = (payload, formData) =>{
    return http.axiosInstance
    .patch(`/page/${payload.id}`, {[payload.field] :''})
    .then((response) => {
      const { data } = response  
      formData.append('field', data.uploadTokens[0].field)
      formData.append('token', data.uploadTokens[0].token)
      return uploadImage(formData)
    })
  }


const postImage = (payload, formData) =>{
  return http.axiosInstance
  .patch(`/page/${payload.id}`, {[payload.field] :['']})
  .then((response) => {
    const { data } = response
    formData.append('field', data.uploadTokens[0].imagesURL[0].field)
    formData.append('token', data.uploadTokens[0].imagesURL[0].token)
    return uploadImage(formData)
  })
}


const deletePage = (uuid) =>{
  return http.axiosInstance
  .delete(`/page/${uuid}`)
  .then((response) => {
    return response.status
  })
  .catch((error) => {
    return error.response
  }) 
}


const getDisciplines = () =>
{
  return http.axiosInstance
  .get('/disciplines')
  .then((response) => {
    return response.data
    })
  .catch((error) => {
      return error.response
    })
}

const getPage = (uuid) => {
  return axios(`${process.env.REACT_APP_API_URL}/page/byUuid/${uuid}`, {
    method: 'get',
    withCredentials: true,
  })
  .then((response) => {
  const { data } = response
    return data
  })
  .catch((error) => {
    console.log(error.response)
    return error.response
  })
}


const getPageWithToken = (uuid) => {
  return http.axiosInstance
  .get(`${process.env.REACT_APP_API_URL}/page/byUuidAuth/${uuid}`)
  .then((response) => {
    const { data } = response
    return data
  })
  .catch((error) => {
    console.log(error.response)
    return error.response
  })
}
  
const getPageEvents = (uuid) => {
  return axios(`${process.env.REACT_APP_API_URL}/content/getOwned`,{
    method: 'post',
    data: {uuid, type: "page" },
    withCredentials: true,
  })
  .then((response) => {
  const { data } = response
    return data
  })
  .catch((error) => {
    console.log(error.response)
    return error.response
  })
 
}    
  
export default {
  createPage,
  updatePage,
  deletePage,
  uploadImage,
  getDisciplines,
  getPage,
  getPageWithToken,
  postImage,
  postAvatar,
  getPageEvents
}
