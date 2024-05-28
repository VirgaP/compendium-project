import React, { useState } from 'react'
import Slider from 'react-slider'
import ReactDependentScript from 'react-dependent-script'
import StickyContainer from '../Elements/StickyContainer'
import PlacesAutocomplete from '../Map/PlacesAutocomplete'
import func from '../../utils/functions'
import constant from '../../utils/constants'
import arrow from '../../assets/svg/arrow.svg'
import markerIcon from '../../assets/svg/pin.svg'

import './Search.scss'
import { ar } from 'date-fns/locale'

const Search = ({ handleClick, callback, searchObject, setFilters, state, setState, search, address, setAddress, lng, lat, setLat, setLng}) => {

  const setLongitude =(data)=>{
    setLng(data)
  }

  const setLatitude =(data)=>{
    setLat(data)
  }

  const {pageTypeOptions} = constant
  const optionsDisciplines = constant.disciplineOptions

  const handleType =(e)=>{
    setState({...state, pageType: e.target.value})
    setFilters(true)
  }

  const handleDiscipline =(data)=>{
    const {value} = data.target
    const {checked} = data.target
    const { discipline } = state
    const newArr = [...discipline]
    let selected = {}
    newArr.push(value)
     if(checked){
      selected = {...state, discipline: newArr}
      setState(selected)
      setFilters(true)
    }else{
     const updated = func.removeElement(newArr, value)
     selected = {...state, discipline: updated}
     setState(selected)
     setFilters(false)
    }
  }

  const onSliderChange = value => {
    setState({...state, radius: value})
    setFilters(true)
  }

  const locationProps = {
    setLongitude,
    setLatitude,
    setAddress,
    placeholder: 'enter adress or location'
  }

  const clearFilters = () => {
    setState({
      keyword: '',
      pageType: '',
      discipline: '',
      onlineEvents: true,
      radius: 1
    })
    setLng(0)
    setLat(0)
    setAddress('')
    clearAllInputFields()
    setFilters(false)
    search(searchObject)
  }

  const clearAllInputFields = () => {
    ;[...document.querySelectorAll('input')].map((input) => {
      if (input.checked) {
        input.checked = !input.checked
      }
      return null
    })
  }

  const handleCheckbox = (e) => {
    e.persist()
    setState({...state, onlineEvents: !e.target.checked })
    setFilters(true)
  }


  const handleFilter =()=>{
   const { pageType } = state
   const { discipline } = state
   const { radius } = state
   const { onlineEvents } = state
  
   let newRadius = radius * 1000
    const callbackData = lng !== 0  && lat !== 0 ? {pageType, discipline, onlineEvents, location: {radius: newRadius, longitude: lng, latitude: lat}} : {pageType, discipline, onlineEvents} 
    callback(callbackData)
  }

  return (
    <div className="search">
      <div className="search__header">
        <div className="search__header-icon" onClick={handleClick}>
          <img alt="user-foto" src={arrow} />
        </div>
      </div>
  
    <div className="flex-container">
      <div className="flex-col"> 
          {searchObject ===2 ? <div className="search__profile">
            {Object.keys(pageTypeOptions).map((key) => (
              <div className="cursor-p radio-input option-input-group" key={pageTypeOptions[key].id}>
                  <label className="label-container" htmlFor={key}>
                      <input
                        type="radio"
                        name="type"
                        onChange={(e)=>handleType(e)}
                        id={pageTypeOptions[key].id}
                        value={parseInt(pageTypeOptions[key].id)}
                        defaultChecked={state.pageType && state.pageType == pageTypeOptions[key].id}
                      />
                      <span className="option-title">{pageTypeOptions[key].title}</span>
                      <span className="checkmark-radio"></span>
                </label>
              </div>
            ))}
          </div>: <div className="py-2"></div>}

          <div className="search__discipline">
            {Object.keys(optionsDisciplines).slice(1).map((key) => (
            <div className="cursor-p discipline-input-group" key={optionsDisciplines[key]}>
              <label className="discipline-label-container" htmlFor={optionsDisciplines[key]}> 
                <input
                    className="discipline-input"
                    type="checkbox"
                    name="discipline"
                    onChange={(e)=>handleDiscipline(e)}
                    id={optionsDisciplines[key]}
                    value={key}
                    defaultChecked={state.discipline.includes(key)}
                />
                <span className="option-title">{optionsDisciplines[key]}</span>
                </label>
            </div>
              ))}
          </div>
      </div>

      <div className="flex-col">        
          <div className="flex pb-2 py-2-lg font-normal">
                <img src={markerIcon} alt="icon" />
                <span className="pl-1">search location: </span><span className="pl-1">{address}</span>
          </div>
          <>
            <ReactDependentScript
              loadingComponent={<div>loading...</div>}
              scripts={[
              `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`,

              ]}
              >
              <PlacesAutocomplete {...locationProps} id={"search-autocomplete-container"}/>
              </ReactDependentScript>
          </>
        
        <div className="search__slider">
          <label>distance</label>
          <div className="input">{state.radius} km</div>
        
          <Slider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            onChange={val => onSliderChange(val)}
            max={120}
            min={1}
            value={state.radius}
            defaultValue={15}
          />
        </div>
        {searchObject === 3 &&<div className="form-select location-checkbox">
          <label>
            <input
              type="checkbox"
              name="onlineEvents"
              checked={!state.onlineEvents}
              onChange={(e)=>{handleCheckbox(e)}}
            />
            <span className="label-main label cursor-p">
              do not show events online
            </span>
          </label>
        </div>}

        </div>
      </div>
      <StickyContainer>
          <div className="search__btn-container">
          <button className="btn-default search__button" onClick={clearFilters}>clear filters</button>
          <button className="btn-secondary search__button" onClick={() => handleFilter()}>filter</button>
        </div>
      </StickyContainer>
    </div>
  )
}

export default Search
