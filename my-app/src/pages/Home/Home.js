import React, { useEffect, useState, useRef, useMemo } from 'react'
import {isEmpty, truncate} from 'lodash'
import { useNot } from 'react-hooks-helper'
import { Modal } from 'react-responsive-modal'
import {
  getUA
} from "react-device-detect"

import MainContainer from '../../components/Layout/MainContainer'
import Header from '../../components/Header/Header'
import LoadingSkeleteon from '../../components/Utils/SearchMapSkeleton'
import Loader from '../../components/Utils/Loader'
import ExploreMap from '../../components/Map/ExploreMapBounds'
import Search from '../../components/Search/Search'
import ResultList from '../../components/Search/ResultList'
import ReactTooltip from 'react-tooltip'
import ResultListEvents from '../../components/Search/ResultListEvents'
import map from '../../services/map.service'
import func from '../../utils/functions'
import hook from '../../utils/hook'
import filterEmpty from '../../assets/svg/filter-empty.svg'
import filter from '../../assets/svg/filterIcon.svg'
import lookingGlass from '../../assets/svg/lookingGlass.svg'
import calendarBlack from '../../assets/svg/calendar-black.svg'
import calendarWhite from '../../assets/svg/calendar-white.svg'
import userWhite from '../../assets/svg/search-user-white.svg'
import userBlack from '../../assets/svg/search-user-black.svg'
import './Home.scss'
import Spinner from '../../components/Elements/Spinner'
import { toast, ToastContainer } from 'react-toastify'
import arrowUp from '../../assets/svg/arrow-up.svg'
import arrowDown from '../../assets/svg/arrow-down.svg'
import questionMark from '../../assets/svg/question-mark.svg'


const LIMIT =10

const Home = (props) => {
  const [coordinates, setCoordinates] = useState({})
  const [search, setSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isSetting, setIsSetting] = useState(false)
  const [isLocationSearch, setIslocationSearch] = useState(true)
  const [markers, setMarkers] = useState([])
  const [features, setFeatures] = useState({})
  const [pageData, setPageData] = useState([])
  const [searchObject, setSearchObject] = useState(2)
  const [totalResults, setTotalResults] = useState(0)
  const [resultCount, setResultCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [payload, setPayload]  = useState({})
  const [currentLoc, setCurrentLoc] = useState('')
  const [pointSelected, setSelected] = useState('')
  const [open, setOpen] = useState(false)

  const [showUser, setActiveUser] = useNot(true)
  const [showEvent, setActiveEvent] = useNot(false)
  const [showArrowUp, setShowArrowUp] = useNot(true)
  const [filterActive, setFilterActive] = useState(false)


  const [loading] = hook.useAxiosLoader()

  const prevCoordinates = hook.usePrevious(coordinates)
  const prevSearchValue = hook.usePrevious(searchValue)
  const prevData = hook.usePrevious(pageData)
  const prevOffset = hook.usePrevious(offset)

  const [state, setState] = useState({
    pageType: null,
    discipline: [],
    onlineEvents: true,
    radius: 15,
  })
  const [address, setAddress] = useState('')
  const[lng, setLng] = useState(0)
  const[lat, setLat] = useState(0)

  const hasGeolocation = (position) => {
    const currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }

    setIsSetting(false)

    setCoordinates(currentLocation)
  }

  const noGeolocation = (error) => {
    setIsSetting(false)
    console.log(error)
  }

  const getLocation = () => {
    if ('geolocation' in navigator) {
      setIsSetting(true)
      navigator.geolocation.getCurrentPosition(
        (position) => hasGeolocation(position),
        (error) => noGeolocation(error),
      )
    }
  }
  const getLocationSeacrhResults =(object)=>{
      if(!isEmpty(coordinates) ){
      setIsSetting(isSetting=>!isSetting)
  
      let payload = {
        //maximum radius allowed 100km
          longitude: coordinates.lng, latitude: coordinates.lat, radius: 15000, objType: object
      }

      setSearchObject(object)

      async function fetchData() {
        const request = await map.searchLocation(payload)
        if(request.status === 200){
          const resultData = [] 
          for (let i = 0; i < request.data.results.length; i++) {
            resultData.push(request.data.results[i])
          }
          const newFeaturesList = func.getFeatures(request.data.results)
          const newMarkers = func.getMarkersCoords(request.data.results)
    
          setMarkers(newMarkers)
          setPageData(resultData)
          setFeatures(newFeaturesList)
          setIslocationSearch(isLocationSearch=>!isLocationSearch)
          setResultCount(request.data.totalResultsCnt)
        }
      }
      fetchData()
  
    }
  }

  useEffect(() => {
    async function fetchLocation() {
      const request = await map.getIpLocation()
      if(request === 'error'){
          onOpenModal()
      }else{
        setCoordinates({ 
            lat: request.data.latitude, 
            lng: request.data.longitude
          })
          setCurrentLoc(request.data.city +' '+request.data.country_name )
      }
  
    }
    if ("geolocation" in navigator && !isEmpty(navigator.geolocation) ) {
      getLocation()
    } else {
      fetchLocation()
    }    
  }, [])

  useEffect(() => {
    let effect = true
    setIsSetting(isSetting=>!isSetting)
    //default request object is page
    if(isLocationSearch===true){
      getLocationSeacrhResults(searchObject)
    }

    return () => {
      effect = false
    }
  }, [coordinates])

  useEffect(() => {
   if(address){
    setFilterActive(true)
   }
  }, [address])

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  const toggleSearch = () => {
    setSearch(!search)
    !showArrowUp && setShowArrowUp(true)
    setOffset(0)
  }

  const toggleSearchObject =(object)=>{
    setActiveUser(showUser => !showUser)
    setActiveEvent(showEvent => !showEvent)
    setSearchValue('')
    setOffset(0)
    getLocationSeacrhResults(object)
  }

  const searchValues = (e) => {
    setSearch(false)

    let objType = 1
    if(showUser){
      objType = 2
    }
    if(showEvent){
      objType = 3
    }

    if(!isEmpty(e.location)){
        (e.location.latitude && e.location.longitude) && setCoordinates({lng:e.location.longitude, lat: e.location.latitude} )
    }
  
    let data ={
      text: searchValue,
      offset,
      filters: {
        onlineEvents: e.onlineEvents,  
        objType,
        pageType: e.pageType,
        discipline: e.discipline,
        location: e.location
      }
    }
    
    Object.keys(data.filters).forEach((key) => (data.filters[key] === '') && delete data.filters[key])

    Object.keys(data).forEach((key) => (data[key] === '') && delete data[key])

    searchContent(data)
    setPayload(data)
  }

  const searchContent =async(payload, loadingStatus=false)=>{
    setIslocationSearch(false)
    try {
      const request = await map.searchContent(payload)
      if(request.status === 200){

        let newFeatures = []
        let newMarkers = []
        if(loadingStatus){
            const combined = pageData.concat(request.data.results)
            setPageData(combined)
            newFeatures = func.getFeatures(combined)
            newMarkers = func.getMarkersCoords(combined)

        }else if(!loadingStatus){
            setPageData(request.data.results)
            newFeatures = func.getFeatures(request.data.results)
            newMarkers = func.getMarkersCoords(request.data.results)
        }

        setMarkers(newMarkers)
        setFeatures(newFeatures)
        setTotalResults(request.data.totalResultsCnt)
        setResultCount(request.data.totalResultsCnt)

      }if(request.status === 400){
          toast.error('End of list. Please enter keyword or location')
      }else if(request.status === 422){
          toast.error(request.data.error)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const searchByKeyword=()=>{
    let searchObj = ''
    if(showUser){
      searchObj = 2
    }
    if(showEvent){
      searchObj = 3
    }
    const data = {
      text: searchValue,  
      offset,
      filters: {
      objType: searchObj
      }
    }
    setOffset(0)
    const newPayload = {...data, offset: 0}
    searchContent(newPayload)
    setIslocationSearch(false)
    setPayload(newPayload)
  }

  const mapProps = { lng: coordinates.lng , lat: coordinates.lat, zoom: 11, id:"search-map", isLocationSearch:isLocationSearch  }

  const onKeyPressHandler=(e)=>{
    if(e.key == 'Enter') {
        searchByKeyword()
        setSearchValue(e.target.value)
    }
  }

  const handelSearchField =(e)=>{
    setSearchValue(e.target.value)
  }

const filterResult =(e)=>{
   setSelected(e)
  }

  const loadMore=()=>{
    const loadingStatus= true
    const newOffset =  offset + 10 
    setOffset(offset=>offset + 10)
    setPayload({...payload, offset: newOffset})
    const newPayload = {...payload, offset: newOffset}
    searchContent(newPayload, loadingStatus)
  }

  const renderMap =()=>{
    if(pageData.length > 0 && features.length >0){
     return <ExploreMap {...mapProps} markers={markers} geoJson={features} callback={filterResult} />   
    }else if(pageData.length === 0){
      return <ExploreMap {...mapProps}  markers={markers} geoJson={features} />   
    }else if(pageData.length > 0 && features.length === 0){
        return <ExploreMap {...mapProps}  markers={markers} geoJson={features} />   
    //   return <LoadingSkeleteon/>
    }
}

    const renderList =()=>{
        if(searchObject === 2){
            return <ResultList data={pageData} action={loadMore} showBtn={(totalResults - offset) > LIMIT && !isLocationSearch ? true : false} pointSelected={pointSelected}/>
        }else if(searchObject === 3){
            return <ResultListEvents data={pageData} action={loadMore} showBtn={(totalResults - offset) > LIMIT && !isLocationSearch ? true : false} pointSelected={pointSelected}/>
        }
    }

    const toggleMap=()=>{
      const element = document.getElementById('page-result-container')
      const mapContainer = document.getElementById('map-container')
      if(showArrowUp){
        setShowArrowUp(false)
        element.classList+=" hide-map"
        mapContainer.classList+=' hidden cover'
      }else if(!showArrowUp){
        setShowArrowUp(true)
        element.classList.remove('hide-map')
        mapContainer.classList.remove('hidden')
        mapContainer.classList.remove('cover')
      }
    }

  const closeResults =()=>{
    document.getElementById('totalResults').classList +=' hidden' 
  }  
  return (
    <MainContainer>
    <ToastContainer/>
    <Modal open={open} onClose={onCloseModal} center>
        <div className="vertical-center">
            <Header 
                className={'modal'}
                title={'Content blocked!'}
                subheading={'Try dissabling add-blockers in your browser'}
            />
        </div>
    </Modal>
    <div className="home__container home" id="homePage">
      {loading && <Loader/>}

      {search ? (
        <Search 
          handleClick={toggleSearch} 
          callback={searchValues} 
          coordinates={coordinates} 
          searchObject={showUser ? 2 : 3 } 
          setFilters={setFilterActive} 
          state={state} 
          setState={setState}
          search={getLocationSeacrhResults}
          address={address}
          setAddress={setAddress}
          lng={lng}
          lat={lat}
          setLng={setLng}
          setLat={setLat}
          />
      ) : (
        <>
          <div className="home__map_wrapper home__col-right" id="map-container">
            <div className="map-toggle-wrapper">
              <div id="user-toggle" className={`${showEvent ? "bg-dark" : "bg-white"} round`}><img src={`${showEvent ? calendarWhite : calendarBlack}`} alt="calendar icon" onClick={()=>toggleSearchObject(3)}></img></div>
              <div id="event-toggle" className={`${showUser ? "bg-dark" : "bg-white"} round`}><img src={`${showUser ? userWhite : userBlack}`} alt="calendar icon" onClick={()=>toggleSearchObject(2)}></img></div>
            </div>
         
          {Object.keys(coordinates).length > 0 ? (
              renderMap()
          ):
          (<>{!isSetting ? <Header title={'Geolocation is disabled'} subheading={'In order to see aritists near you enable location on your device or use search to find pages and events'}/> : <LoadingSkeleteon/>} </>)
          }
        </div>
        <div className="home__col-left" id="homeColLeft">

         <div className="home__search-row px-1 mb-1">
            <img className="cursor-p filter-icon" src={filterActive ? filter : filterEmpty} alt="filter icon" onClick={toggleSearch}/>
            <div className="input-group flex full-width px-1">
              <input className="" name="search" type="text" value={searchValue} onChange={(e)=>handelSearchField(e)} placeholder="search for pages or events" onKeyPress={onKeyPressHandler}/>
              <img className="icon mr-1 search-input-icon" src={lookingGlass} alt="looking glass icon" onClick={()=>searchByKeyword()}/>
            </div>
            <div className="mobile-only m-auto arrow-icon">{showArrowUp ? <img src={arrowUp} onClick={()=>toggleMap()}/>: <img src={arrowDown} onClick={()=>toggleMap()}/>}</div>
        </div>
          
        <div className="home__search-result-container">
        {!loading && resultCount > 0 &&
          <div className="total-results" id="totalResults">
            <span>{resultCount} results found</span>
            <span data-tip data-for="locationTip" className="ml-1 vertical-align">
              <img className="cursor-p" src={questionMark} alt="question mark icon" width='12'/>
            </span>
            <ReactTooltip id="locationTip" place="bottom" effect="solid">
              not all results may appear in the map
            </ReactTooltip>
            <span className="vertical-align fl-r cursor-p pl-1 close-results" onClick={closeResults}>&#10005;</span>
          </div>
          }
          {!loading ? 
          renderList()
          : <div className="rte center py-2">loading...</div>
          }
        </div>
        </div>
        </>
      )}
    </div>
    </MainContainer>
  )
}

export default Home
