import axios from 'axios'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import func from '../utils/functions'
import http from './http'
import { get } from 'react-scroll/modules/mixins/scroller'


const REACT_APP_API_URL = process.env.REACT_APP_API_URL
// const REACT_APP_API_URL = 'http://localhost:8000/api'

const createEvent = (payload, formData, pageId) => {
return http.axiosInstance
.post(`/event?pageId=${pageId}`, payload)
.then((response) => {
  const { data } = response
    formData.append('field', data.uploadTokens[0].field)
    formData.append('token', data.uploadTokens[0].token)
    uploadImage(formData)
    return response
  })
  .catch((error) => {
    return error.response
  })
}


const postImage = (uuid, pageId, formData) =>{
return http.axiosInstance
.patch(`/event/${uuid}?pageId=${pageId}`, {imageURL :''}) 
  .then((response) => {
    const { data } = response

    formData.append('field', data.uploadTokens[0].field)
    formData.append('token', data.uploadTokens[0].token)
    return uploadImage(formData)
  })
  .catch((error) => {
    return error.response
  })  
}


const deleteEvent = (uuid, pageId) => {
return http.axiosInstance
    .delete(`/event/${uuid}?pageId=${pageId}`)
    .then((response) => {
      if(response.status===200){
        toast.success('Event deleted')
      }
      return response
    })
    .catch((error) => {
      return error.response
  }) 
}

const updateEvent = (payload, uuid, pageId) =>{
return http.axiosInstance
  .patch(`${REACT_APP_API_URL}/event/${uuid}?pageId=${pageId}`, payload)
  .then((response) => {
    if(response.status===200){
      toast.success('Event deleted')
    }
    return response
    })
    .catch((error) => {
      return error.response
  }) 
}

const getEventAndPage = (uuid) => {
  return axios(`${process.env.REACT_APP_API_URL}/event/byUiid/${uuid}`, {
    method: 'get',
    withCredentials: true,
  })
  .then((response) => {
    const { data } = response
    const parentUuid = req.data.parent.uuid
    const request = getPage(parentUuid)
    const eventandPage = {event: data, page: request.data}
    return eventandPage
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

  const getEvent = (uuid) => {
    return axios(`${process.env.REACT_APP_API_URL}/event/byUiid/${uuid}`, {
      method: 'get',
      withCredentials: true,
    })
    .then((response) => {
    const { data } = response
      return data
    })
    .catch((error) => {
      if(error.response.data.error==="Content not found"){
        window.location.replace("/error")
      }
      return error.response
    })
  }

  const getExpiredEvents = (pageId) => {
    return axios(`${process.env.REACT_APP_API_URL}/expiredEvents?pageId=${pageId}`,{
      method: 'get',
      withCredentials: true,
    })
    .then((response) => {
      const { data } = response
      return response
    })
    .catch((error) => {
      if(error.response.data.error==="Content not found"){
        window.location.replace("/error")
      }
      return error.response
    }) 
  }

  // const getExpiredEvents = (pageId) => {
  //   return http.axiosInstance
  //   .get(`/expiredEvents?pageId=${pageId}`)
  //   .then((response) => {
  //     const { data } = response
  //     return response
  //   })
  //   .catch((error) => {
  //     if(error.response.data.error==="Content not found"){
  //       window.location.replace("/error")
  //     }
  //     return error.response
  //   }) 
  // }

  const uploadImage = (formData) =>
  axios(`${REACT_APP_API_URL}/media/uploadImage`, {
    method: 'post',
    data: formData,
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  .then((response) => {
    const { data } = response
    console.log('uploadimage response ', data)
    return data
  })
  .catch((error) => {
    console.log('error in upload image ', error.response)
    return error.response
})

  
export default {
    createEvent,
    deleteEvent,
    updateEvent,
    uploadImage,
    getEventAndPage,
    getEvent,
    getExpiredEvents,
    getPage,
    postImage,
  }