import React, {useState} from "react"
import ReactMapGL, { Marker, NavigationControl, FlyToInterpolator } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useNot } from 'react-hooks-helper'
import Markers from './Markers'
import hook from '../../utils/hook'

const ExploreMapTest= ( { lng, lat, zoom, id, markers, geoJson, object, callback } ) => {
  const [stateZoom, setZoom] = React.useState(zoom)
  const [zooming, setZooming] = useNot(false)

  const MAP_CONFIG = {
    maxZoom: stateZoom,
    mapStyle: "mapbox://styles/mapbox/light-v10",
    mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
  };
  const mapRef = React.useRef(null);
  const mapContainerRef = React.useRef(null)
  const { width, height } = hook.useWindowSize(mapContainerRef)

  const mapWidth = width > 768 ? width/2 : width
  const mapHeight = width > 768 ? height : 310
  const { viewport, onViewportChange } = hook.useMap({
    width: mapWidth,
    height: mapHeight,
    markers
  })

  const onMarkeClicked=(e)=>{
    setZoom(18)
    if(!zooming){
    const newViewport = {
      ...viewport,
      longitude: e.longitude,
      latitude: e.latitude,
      transitionDuration: 2000,
      zoom: 18,
      transitionInterpolator: new FlyToInterpolator(),
    }
    setZooming(true)
    onViewportChange(newViewport)
    callback(e.uuid)
    }else if(zooming){
    const prevViewport = {
      ...viewport,
      longitude: e.longitude,
      latitude: e.latitude,
      transitionDuration: 2000,
      zoom: 12,
      transitionInterpolator: new FlyToInterpolator(),
      }
      setZooming(false)
      onViewportChange(prevViewport)
      callback('revert')
    }
  }

  return (
    <div ref={mapContainerRef} id={id}>
      <ReactMapGL
        ref={mapRef}
        // maxZoom={20}
        {...MAP_CONFIG}
        {...viewport}
        onViewportChange={onViewportChange}
      >
        <NavigationControl className="navigation-control" showCompass={true} />
        <Markers data={markers} action={onMarkeClicked}/>
      </ReactMapGL>
    </div>
  );
};

export default ExploreMapTest