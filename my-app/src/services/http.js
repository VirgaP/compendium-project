import axios        from "axios"
import { Promise }  from "es6-promise"
import func         from '../utils/functions'
import reducer      from '../context/reducer'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }
})

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
       const originalRequest = error.config

        //Prevent infinite loops, if 400 error is from refresh log out and redirect to login
        if (error.response.status === 400 && originalRequest.url === '/auth/refresh') {
            return axiosInstance
              .post('/auth/logout')
              .then((response) => {
                if(response.status === 200){
                  reducer.AuthReducer(reducer.initialState, { type: 'LOGOUT' })
                  localStorage.removeItem('currentUser')
                  localStorage.removeItem('userPages')
                  window.location.replace('/login')
                }
                return response
              })
              .catch((error) => {
                console.log(error)
              })
        }

        const tokenExpiration = func.getCurrentUser
        const tokenValid = tokenExpiration.expires < new Date()

        if (!tokenValid){
                return axiosInstance
                .post('/auth/refresh')
                .then((response) => {
                  if(response.status === 200){
                    return axios(originalRequest);
                  }
                })

        }else{
            window.location.href = '/login';
        }
  return Promise.reject(error);
});

export default {
  axiosInstance
}