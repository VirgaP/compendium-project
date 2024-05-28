/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'

import ReactDependentScript from 'react-dependent-script'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import ReactTooltip from 'react-tooltip'
import PlacesAutocomplete from '../../Map/PlacesAutocomplete'
import LocationMap from '../../Map/LocationMap'
import StaticMap from '../../Elements/StaticMap'
import Header from './Header'
import Spinner from '../../Utils/Spinner'
import page from '../../../services/page.service'
import func from '../../../utils/functions'
import question from '../../../assets/svg/question-mark.svg'

const Location = ({ setMultiFormData, formData, navigation, props }) => {
  const preloadedValues = {
    hideLocation: formData.hideLocation,
  }
  const { register, handleSubmit } = useForm({ defaultValues: preloadedValues })

  const [address, setAddress] = useState()
  const [lng, setLongitude] = useState(5)
  const [lat, setLatitude] = useState(34)
  const [city, setCity] = useState()
  const [country, setCountry] = useState()
  const [hideLocation, setHideLocation] = useState(false)
  const [error, setError] = useState(false)
  const [isBlocking, setIsBlocking] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMsg] = useState('')

  const locationProps = {
    setAddress,
    setLongitude,
    setLatitude,
    setCity,
    setCountry,
    setIsBlocking,
    setError
  }

  const staticMapProps ={
    longitude: lng,
    latitude: lat,
    zoom: 16,
  }  

  const mapProps = { lng, lat }
  const { previous } = navigation

  const zoom = (lng === 5) & (lat === 34) ? 2 : 15

  const onSubmit = () => {
    formData.hideLocation = hideLocation
    if (address === '' || typeof address === 'undefined') {
      setError(true)
      return false
    }
    setError(false)
    submitForm()
  }

  const submitForm = async () => {
    setLoading(true)
    let payload = formData
    const parseDiscipline = formData.disciplines.map(function (x) {
      return parseInt(x, 10)
    })
    const parseType = parseInt(formData.type, 10)
    Object.keys(payload).forEach((key) => (payload[key] === '') && delete payload[key]);

    payload = { ...payload, disciplines: parseDiscipline }
    payload = { ...payload, type: parseType }
    try {
      const request = await page.createPage(payload)
      if (request.uuid) {
        setLoading(false)
      } else if (request.error) {
        setLoading(false)
        setErrorMsg(request.error)
      }
      if (request.uuid) {
        const slug = func.slugify(payload.name)
        props.props.history.push({
          pathname:`page/${request.uuid}`,
          state:{
              request
           }
         });
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    formData.location.latitude = lat
    formData.location.longitude = lng
    formData.address = address
    formData.city = city
    formData.country = country
  }, [lng, lat])

  return (
    <div className="reg-form__outer-container">
      <ToastContainer />
      <div className="step-indicator__container">
        <span className="step"></span>
        <span className="step"></span>
        <span className="step"></span>
        <span className="step"></span>
        <span className="active step"></span>
      </div>
      <Header
        title="Where are you based?"
        subtitle="Add a location and help others discover you"
      />
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="form-select">
              <LocationMap {...mapProps} id="location-map" zoom={zoom} />
              <div className="location-container pt-2">
              <ReactDependentScript
                loadingComponent={<Spinner/>}
                scripts={[
                  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`,
                ]}
              >
                <PlacesAutocomplete
                  {...locationProps}
                  defaultAddress={formData.address}
                />
              </ReactDependentScript>
              <div className="location-checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="hideLocation"
                    ref={register({})}
                    value="true"
                    onChange={() => setHideLocation(true)}
                  />
                  <span className="label-main label">
                    Hide my location, show only the city
                  </span>
                  <span data-tip data-for="locationTip" className="ml-1">
                  <img className="vertical-align cursor-p" src={question} alt="question mark icon" width='15'/>
                  </span>
                  <ReactTooltip id="locationTip" place="top" effect="solid">
                    if you choose to hide the location, it will not be shown to visitors, and your page will not be shown on the map, but will still appear in the search result list.
                  </ReactTooltip>
                </label>
              </div>
              {error ? (
                <div className="location__error error mt-1">
                  please enter a valid address or location
                </div>
              ) : (
                ''
              )}
              <div className="sticky-bottom mt-2">
                <div className="btn-container">
                    <div
                      className="btn-default previous btn"
                      onClick={previous}
                      role="button"
                      tabIndex="0"
                      onKeyPress={previous}
                    >
                      back
                  </div>
                    <button className="btn-secondary next btn-contain" type="submit" disabled={error}>
                      finish
                    </button>
                  </div>
                </div>
              </div>
            </form>
        </>
      )}
    </div>
  )
}

export default Location
