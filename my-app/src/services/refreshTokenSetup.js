import http from './http'
import { Promise } from "es6-promise";



const refreshTokenSetup = () =>
  axios(`${REACT_APP_API_URL}/auth/refresh`, {
    method: 'post',
    withCredentials: true,
  })
    .then((response) => {
      const { data } = response
      console.log(data)
    })
    .catch((error) => {
      console.log(error.response)
  })

http.interceptors.response.use(
  response => response,
  error => {
      const originalRequest = error.config;

      // Prevent infinite loops
      if (error.response.status === 401 && originalRequest.url === baseURL+'/auth/refresh') {
          window.location.href = '/login';
          return Promise.reject(error);
      }

      if (error.response.data.code === "token_not_valid" &&
          error.response.status === 401 && 
          error.response.statusText === "Unauthorized") 
          {
              const refreshToken = localStorage.getItem('refresh_token');

              if (refreshToken){
                  const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                  // exp date in token is expressed in seconds, while now() returns milliseconds:
                  const now = Math.ceil(Date.now() / 1000);

                  if (tokenParts.exp > now) {
                      return axiosInstance
                      .post('/auth/refresh', {refresh: refreshToken})
                      .then((response) => {
          
                          localStorage.setItem('access_token', response.data.access);
                          localStorage.setItem('refresh_token', response.data.refresh);
          
                          axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                          originalRequest.headers['Authorization'] = "JWT " + response.data.access;
          
                          return axiosInstance(originalRequest);
                      })
                      .catch(err => {
                          console.log(err)
                      });
                  }else{
                      window.location.href = '/login/';
                  }
              }else{
                  window.location.href = '/login/';
              }
      }
    
    
    // specific error handling done elsewhere
    return Promise.reject(error);
    }
)
