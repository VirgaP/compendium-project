import axios from 'axios'
import http from './http'


// mapbox reverse goecoding (get address from coordinates)
const getAddress = (lon, lat) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
  return axios
    .get(url, {
      headers: {
        authorization:
          `access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`,
      },
    })
    .then(
      (response) => response.data,
      (error) => {
        const { status } = error.response
        console.log(status)
      },
    )
}

const getIpLocation = ()=>{
  return axios(`https://ipapi.co/185.252.110.49/json/`,{
    method: 'get',
  })
  .then((response) => {
    return response
    })
  .catch((error) => {
    console.log(error)
    return 'error'
  })
}


const searchContent = payload => {
  return axios(`${process.env.REACT_APP_API_URL}/content/search`, {
    method: 'post',
    withCredentials: true,
    data: payload
  })
  .then((response) => {
    return response
    })
  .catch((error) => {
    console.log(error.response)
    return error.response
  })
}


const searchLocation = payload => {
  return axios(`${process.env.REACT_APP_API_URL}/location/search`, {
    method: 'post',
    withCredentials: true,
    data: payload
  })
  .then((response) => {
    return response
    })
  .catch((error) => {
    console.log(error.response)
    return error.response
  })
}

export default {
  getAddress,
  searchContent,
  searchLocation,
  getIpLocation
}
