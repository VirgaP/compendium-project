import moment from "moment"
require('moment-timezone')


/* eslint-disable eqeqeq */
const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'))

function getJsonFromUrl(url) {
  if (url.length > 0) {
    const link = new URL(url)
    const result = link.searchParams.get('v')
    return result
  }
}

function disciplinestToString(arr) {
  const result = arr.reduce((acc, int) => {
    // if (typeof int === 'string'){
    //   acc.push(int)
    // }
    if (int == 1) {
      acc.push('Music')
    }
    if (int == 2) {
      acc.push('Visual Arts')
    }
    if (int == 3) {
      acc.push('Performing Arts')
    }
    if (int == 4) {
      acc.push('Literary Arts')
    }
    if (int == 5) {
      acc.push('Architecture')
    }
    if (int == 6) {
      acc.push('Sculpture')
    }
    if (int == 7) {
      acc.push('Painting')
    }
    if (int == 8) {
      acc.push('Multidisciplinary')
    }
    if (int == 9) {
      acc.push('Dance')
    }
    if (int == 10) {
      acc.push('Film')
    }
    if (int == 11) {
      acc.push('Conceptual Art')
    }
    if (int == 12) {
      acc.push('Photography')
    }
    if (int == 13) {
      acc.push('Design and Applied Arts')
    }
    return acc
  }, [])
  return result
}

function disciplinestStrToInt(arr) {
  const result = arr.reduce((acc, str) => {
    if (str === 'Music') {
      acc.push("1")
    }
    if (str === 'Visual Arts') {
      acc.push("2")
    }
    if (str === 'Performing Arts') {
      acc.push("3")
    }
    if (str === 'Literary Arts') {
      acc.push("4")
    }
    if (str === 'Architecture' ) {
      acc.push("5")
    }
    if (str === 'Sculpture') {
      acc.push("6")
    }
    if (str === 'Painting') {
      acc.push("7")
    }
    if (str === 'Multidisciplinary') {
      acc.push("8")
    }
    if (str === 'Dance') {
      acc.push("9")
    }
    if (str === 'Film') {
      acc.push("10")
    }
    if (str === 'Conceptual Art') {
      acc.push("11")
    }
    if (str === 'Photography') {
      acc.push("12")
    }
    if (str ==='Design and Applied Arts') {
      acc.push("13")
    }
    return acc
  }, [])
  return result
}

const intToString = (arr) => {
  arr.map(function (x) {
    return x.toString()
  })
}

const strToIntArr = (arr) => {
  const result = arr.reduce((acc, str) => {
    acc.push(parseInt(str, 10))
    return acc
  }, [])
  return result
}

function typeToString(value) {

  if (value === 0) {
    return 'Individual Creator'
  }
  if (value === 1) {
    return 'Organization'
  }
  if (value === 2) {
    return 'Field Professional'
  }
  if (value === 3) {
    return 'Space'
  }
  return null
}

function typeToColor(value) {

  if (value === 0) {
    return 'red'
  }
  if (value === 1) {
    return 'blue'
  }
  if (value === 2) {
    return 'orange'
  }
  if (value === 3) {
    return 'violet'
  }
  return null
}

const removeObjectKeys = (array1, array2) => {
  const arr = []
  for (let i = 0; i < array1.length || i < array2.length; i++) {
    const key = array2[i]
    arr.push(array1[i][key])
  }
  return arr
}

function removeElement(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

const replaceObject = (object, list) => {
  const newList = []
  list.map(function (item) {
    if (
      JSON.stringify(Object.keys(item)) === JSON.stringify(Object.keys(object))
    ) {
      newList.push(object)
    } else {
      newList.push(item)
    }
  })
  newList.push(object)
  return newList
}

const getIndexByKeyValue =(object, value)=> {
  return Object.keys(object).find(key =>object[key]['contentUUID'] === value)
}

const addHoursAndMinutes=(time, timeToAdd)=>{
  let timeHours = time.getHours()
  let addHours = timeToAdd.getHours()

  let timeMinutes = time.getMinutes()
  let addMinutes = timeToAdd.getMinutes()

  timeHours += addHours
  timeMinutes += addMinutes

  time.setHours(timeHours)
  time.setMinutes(timeMinutes)

  return time
}

const truncateInt =(maxLength , value)=>{
  let str = value.toString();
  if(str.length > maxLength){
    let i =  maxLength - str.length
    str = str.slice(0, i);
    return parseInt(str);
  }
  return value
}

const truncateStr =(start, maxLength , str)=>{
  if(str.length > maxLength){
    let i =  maxLength - str.length
    str = str.slice(start, i);
    return str;
  }
  return str
}

const formatDate =(str)=> {
  let date = moment(str).format("dddd, M D YYYY")
  return date
}

const formatTime =(str)=> {
  let time =  moment(str).format("HH:mm")
  return time
}

const formatTimeZone =(str)=> {
  const zone = moment(str).format('Z')
  // let timeZone = moment.tz(str).format('Z z')
  const abbr = moment.tz(zone, "GMT");
  const gmt = `${ abbr._i} ${abbr._z.name}`
  return gmt
}

const slugify=(string)=> {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

function isEmail(val) {
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!regEmail.test(val)){
    return false;
  }
  return true
}

function constructGeoJson(data){
  const newFeaturesList =[]
  for (let i = 0; i < data.length; i++) {
    if(typeof (data[i].location) ==='undefined'){
     break;
    }else{
      newFeaturesList.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [data[i].location.longitude, data[i].location.latitude]
        },
        properties: {
          id: data[i].uuid,
          name: data[i].name,
        }
      })
    }
  }
 const geoJsonObject = {
  
    'type': 'FeatureCollection',
    // 'features': newFeaturesList
    'features': JSON.stringify(newFeaturesList)
 }
  return geoJsonObject
}

function getFeatures(data){
  const newFeaturesList =[]
  for (let i = 0; i < data.length; i++) {
      if(typeof (data[i].location) ==='undefined'){
       continue;
      }else if(data[i].location){
        newFeaturesList.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [data[i].location.longitude, data[i].location.latitude]
          },
          properties: {
            id: data[i].uuid,
            name: data[i].name,
            type: data[i].pageType
          }
        })
      }else if(data.length === 1){
        break;
      }
  }
  return newFeaturesList
}

function getMarkersCoords(data){
  const newMarkers =[]
  for (let i = 0; i < data.length; i++) {  
    if(typeof (data[i].location) ==='undefined'){
    continue;
    }else if(data[i].location){
      const { longitude } = data[i].location
      const { latitude } = data[i].location
      const { uuid } = data[i]
      const { name } = data[i]
    newMarkers.push({longitude, latitude, uuid, name })
    }else if(data.length === 1){
      break;
    }
  }
  return newMarkers
}

function getFirstResultCoords(data){
  let coordinates = {}
  for (let i = 0; i === 0; i++) {
    const { longitude } = data[i].location
    const { latitude } = data[i].location

    coordinates = {
      lat: latitude,
      lng: longitude,
    }    
  }
  return coordinates
}

function getOffset(total, resultCount){
  const limit = 10
  let offset = 0
  if(resultCount > limit){
    offset = resultCount - limit
  }
  
  return offset 

}

function removeDigits(x, n){ 
  var str = x.toString();
  str = str.slice(0, n);
  var num = parseFloat(str);
    return num
  }

export default {
  getCurrentUser,
  getJsonFromUrl,
  typeToString,
  typeToColor,
  disciplinestToString,
  disciplinestStrToInt,
  intToString,
  strToIntArr,
  removeObjectKeys,
  removeElement,
  replaceObject,
  getIndexByKeyValue,
  addHoursAndMinutes,
  formatDate,
  formatTime,
  formatTimeZone,
  truncateStr,
  truncateInt,
  slugify,
  isEmail,
  constructGeoJson,
  getMarkersCoords,
  getFirstResultCoords,
  getOffset,
  getFeatures,
  removeDigits
}
