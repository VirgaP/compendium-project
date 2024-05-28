import React, { useState } from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import func from '../../utils/functions'

const PlacesAutocomplete = (props) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  })

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
  })

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()

    // Get latitude and longitude via utility functions getGeocode and getLatLng
    getGeocode({ address: description })
      .then(function (results) {
        // console.log(results)

        var country_index = results[0].address_components.findIndex(function(sub){
          return sub.types.indexOf('country') !== -1;
        });

        var country_index = results[0].address_components.findIndex(function(sub){
          return sub.types.indexOf('locality') !== -1;
        });


        var country = results[0].address_components[country_index].long_name;
        var city    = results[0].address_components[country_index].long_name;


        props.setAddress    && props.setAddress(results[0].formatted_address)
        props.setIsBlocking && props.setIsBlocking(true)
        
        if (
          results[0].types.includes('street_address')   ||
          results[0].types.includes('establishment')    ||
          results[0].types.includes('premises')         ||
          results[0].types.includes('point_of_interest')||
          results[0].types.includes('route')
        ) {
          // props.setCity && props.setCity(results[0].address_components[2].long_name)
          // props.setCountry && props.setCountry(results[0].address_components[5].long_name)
          props.setCity    && props.setCity(city)
          props.setCountry && props.setCountry(country)
        } else {
          // props.setCity && props.setCity(results[0].address_components[1].long_name)
          // props.setCountry && props.setCountry(results[0].address_components[4].long_name)
          props.setCity    && props.setCity(city)
          props.setCountry && props.setCountry(country)
        }
        return getLatLng(results[0])
      })
      .then(function ({ lat, lng }) {
        const validLng = func.removeDigits(lng, 12)
        const validLat = func.removeDigits(lat, 12)
      
        props.setLongitude(validLng)
        props.setLatitude(validLat)
        props.setError && props.setError(false)
      })
      .catch((error) => {
        console.log('Error: ', error)
        props.setError && props.setError(true)
      })
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  return (
    <div className="autocomplete-container full-width" ref={ref}>
      <input
        type="text"
        className="autocomplete-input"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={props.placeholder ? props.placeholder :"enter your address, must contain street and number"}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && (
        <ul className="autocomplete-dropdown">{renderSuggestions()}</ul>
      )}
    </div>
  )
}

export default PlacesAutocomplete
