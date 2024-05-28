/* eslint-disable no-console */
/* eslint-disable func-names */
import axios from 'axios'
import http from './http'

// const REACT_APP_API_URL = 'http://localhost:8000/api'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const login = (payload, dispatch) =>
  axios(`${REACT_APP_API_URL}/auth/login`, {
    method: 'post',
    data: payload,
    withCredentials: true,
  })
    .then(
      (response) => {
        dispatch({ type: 'REQUEST_LOGIN' })
        const payload = {uuid: response.data.uuid, type: 'user'}
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        // const userContent = getOwnedContentUUID(payload)
        const data = {user: response}//, userContent: userContent}
        return data
      },
      (error) => {
        const { status } = error.response
        const message = 'Login credentials are not valid. Please try again'
        if (status === 400) {
          dispatch({
            type: 'LOGIN_ERROR',
            error: message,
          })
        }
        console.log(error)
      },
    )

const register = (payload, dispatch) =>
  axios(`${REACT_APP_API_URL}/auth/register`, {
    method: 'post',
    data: payload,
    withCredentials: true,
  })
    .then(
      (response) => {
        dispatch({ type: 'REQUEST_REGISTER' })
        return getUserByUUID(response.data.uuid)
      },
      (error) => {
        const { status } = error.response
        if (status === 400) {
          dispatch({
            type: 'REGISTER_ERROR',
            error: error.response.data.error,
          })
        }
        console.log(error.response)
      },
    )
    .then((response) => {
      if (typeof response !== 'undefined') {
        dispatch({ type: 'REGISTER_SUCCESS', payload: response })
        localStorage.setItem('currentUser', JSON.stringify(response))
        return response
      }
      return null
    })

  const registerConfirm = (payload) =>
  axios(`${REACT_APP_API_URL}/auth/register`, {
    method: 'post',
    data: payload,
    withCredentials: true,
  })
  .then((response) => {
    return response
  })
  .catch((error) => {
   console.log(error)
   return error.response
  })  

const logout = (dispatch) => {
  return http.axiosInstance
  .post('/auth/logout')
  .then((response) => {
    if(response.status === 200){
      dispatch({ type: 'LOGOUT' })
      localStorage.removeItem('currentUser')
      localStorage.removeItem('userPages')
      window.location.replace('/explore')
    } 
    return response
  })
  .catch((error) => {
    console.log(error)

  })
}

const requestInvite = (payload) =>
  axios(`${REACT_APP_API_URL}/invitation/requestInvite`, {
    method: 'post',
    data: payload,
    withCredentials: true,
  })
  .then((response) => {
    return response
  })
  .catch((error) => {
   console.log(error)
   return error.response
  }) 

const requestPasswordReset=(email)=>{
  return axios(`${REACT_APP_API_URL}/auth/sendRecoverEmail`, {
    method: 'post',
    data: {email},
    withCredentials: true,
  })
  .then((response) => {
    return response
  })
  .catch((error) => {
    console.log(error)
    return error.response
  })
}

const resetPassword=(payload)=>{
  return axios(`${REACT_APP_API_URL}/recoverPassword`, {
    method: 'post',
    data: payload,
    withCredentials: true,
  })
  .then((response) => {
    return response
  })
  .catch((error) => {
    console.log(error)
    return error.response
  })
}

const getUserByUUID = (uuid) =>{
  return http.axiosInstance
  .get(`/user/${uuid}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
     console.log(error)
    })
}

// const getOwnedContentUUID = (payload) =>{
//   return http.axiosInstance
//   .post(`/content/getOwned`, payload)
//   .then((response) => {
//     console.log('response in getusserowend ', response.data)
//     if (typeof response !== 'undefined') {
//       localStorage.setItem('userPages', JSON.stringify(response.data))
//     }
//     return response.data
//       }
//     )
//     .catch((error) => {
//       console.log(error.response)
//   })
// }

  const getOwnedContentUUID = (payload) =>
  axios(`${REACT_APP_API_URL}/content/getOwned`, {
    method: 'post',
    data: payload,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then((response) => {
    if (typeof response !== 'undefined') {
      localStorage.setItem('userPages', JSON.stringify(response.data))
    }
    return response.data
      }
    )
    .catch((error) => {
      console.log(error.response)  
  })

const generateInvitation = (pageId) =>{
  return http.axiosInstance
  .get(`/invitation/inviteWithLink?pageId=${pageId}`)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error.response
  }) 
}
// const generateInvitation = (pageId) =>{
//   return axios(`${REACT_APP_API_URL}/invitation/inviteWithLink?pageId=${pageId}`, {
//     method: 'get',
//     withCredentials: true,
//   })
//   .then((response) => {
//     return response
//   })
//   .catch((error) => {
//     return error.response
//   }) 
// }

const inviteByEmail = (pageId, email) =>{
  return http.axiosInstance
  .post(`/invitation/invite?pageId=${pageId}`, {email})
  .then((response) => {
    return response
    })
  .catch((error) => {
    console.log(error.response)
    return error.response
  })
}

// const inviteByEmail = (pageId, email) =>{
//   return axios(`${REACT_APP_API_URL}/invitation/invite?pageId=${pageId}`, {
//     method: 'post',
//     data: {email},
//     withCredentials: true,
//   })
//   .then((response) => {
//     return response
//     })
//   .catch((error) => {
//     console.log(error.response)
//     return error.response
//   })
// }

const updateUser = (payload) =>{
  return http.axiosInstance
  .patch(`/user`, payload)
    .then((response) => {
      return response
      })
    .catch((error) => {
      console.log(error.response)
      return error.response
    })
}

const deleteAccount = (payload) =>{
  return http.axiosInstance
  .delete(`/user`)
    .then((response) => {
      return response
      })
    .catch((error) => {
      console.log(error.response)
      return error.response
    })
}

const changePassword = (payload) =>{
  return http.axiosInstance
  .post(`/changeUserPassword`, payload)
  .then((response) => {
    return response
    })
  .catch((error) => {
    console.log(error.response)
    return error.response
  })
}

const confirmEmail =(key)=>{
  axios(`${REACT_APP_API_URL}/emailConfirmed?emailKey=${key}`, {
    method: 'post',
    withCredentials: true,
  })
  .then((response) => {
    return response
    })
  .catch((error) => {
    console.log(error.response)
    return error.response
  })
}

const preRegister =(payload, dispatch)=>{
  axios(`${REACT_APP_API_URL}/auth/sendConfirmationToEmail`, {
    method: 'post',
    withCredentials: true,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }

  })
  .then((response) => {

    if(response.status === 200){
      dispatch({
        type: 'REGISTER_EMAIL_SUCCESS',
      })
      console.log('reponse in preRegister ', response)
      window.location.replace('/thank-you')
    }
    return response
  })
  .catch((error) => {
    const { status } = error.response;
    // const message = 'Invitation has already been sent to this email'
    const message = error.response.data['error'];
    if (status === 400) {
      dispatch({
        type: 'REGISTER_ERROR',
        error: message,
      })
    }
   return console.log(error.response)  
  })
}


export default {
  login,
  register,
  registerConfirm,
  logout,
  requestInvite,
  requestPasswordReset,
  resetPassword,
  getUserByUUID,
  getOwnedContentUUID,
  generateInvitation,
  inviteByEmail,
  updateUser,
  deleteAccount,
  changePassword,
  confirmEmail,
  preRegister
}
