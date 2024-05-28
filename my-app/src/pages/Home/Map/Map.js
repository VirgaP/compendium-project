import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import './Map.scss'

// test api key
mapboxgl.accessToken =
  'pk.eyJ1IjoianVzdGluYWp1cmdlbGV2aWNpdXRlIiwiYSI6ImNrZzBra3NxdzB3cWIyenFmM2p2dDBmbjYifQ.STnDo5XdFl4InEUz8lzkyg'

const Map = ({ coordinates }) => {
  const mapContainerRef = useRef(null)

  const getMap = () => {
    const { lat, lon } = coordinates

    const map = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 12.5,
    })

    return () => map.remove()
  }

  useEffect(() => {
    if (Object.keys(coordinates).length > 0) {
      getMap()
    }
  }, [coordinates])

  return (
    <div className="map-container">
      <div className="map" ref={mapContainerRef} />
    </div>
  )
}

export default Map
