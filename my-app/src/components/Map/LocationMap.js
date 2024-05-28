import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


const LocationMap = ({ lng, lat, zoom, id }) => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

  useEffect(() => {
    let effect = true
    const map = new mapboxgl.Map({
      attributionControl: false,
      container: id,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom,
    })
    if (lng !== 5 && lat !== 34) {
      new mapboxgl.Marker({color:'#878EA1'}).setLngLat([lng, lat]).addTo(map)
    }

    // map.addControl(new mapboxgl.NavigationControl());

    return () => {
      effect = false
    }
  }, [lng, lat])

  return (
    <>
      <div id={id}></div>
    </>
  )
}

export default LocationMap
