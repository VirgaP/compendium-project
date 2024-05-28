import React, { useState, useEffect, useMemo, useCallback } from 'react'
import ReactMapGL, {Source, Layer, Marker, NavigationControl, FlyToInterpolator, Popup, GeolocateControl } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useNot } from 'react-hooks-helper'
import hook from '../../utils/hook'
import {clusterLayer, clusterCountLayer, unclusteredPointLayer, unclusteredPointLayerText} from './layer'


const ExploreMapBounds = ({ lng, lat, zoom, id, markers, geoJson, object, callback, isLocationSearch }) => {
    const [initialViewport, setInitialViewport] = useState({initialZoom: '', initialCenter: []})

    const MAP_CONFIG = {
        maxZoom: 20,
        // mapStyle: "mapbox://styles/mapbox/light-v10",
        mapStyle:'mapbox://styles/ideasblocklt/cklfnlfri6x7917rzk2nfahau',
        mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
      }
      const mapRef = React.useRef(null)
      const mapContainerRef = React.useRef(null)
      const sourceRef = React.useRef(null)

      const { width, height } = hook.useWindowSize(mapContainerRef)

      const mapWidth = width > 768 ? width/2 : width
      const mapHeight = width > 768 ? height : 310
      const { viewport, onViewportChange } = hook.useMap({
        width: mapWidth,
        height: mapHeight,
        zoom: zoom,
        lat: lat,
        long: lng,
        markers,
        isLocationSearch: isLocationSearch
      })

    const mapData = useMemo(() => {
        return {
            "type": "FeatureCollection",
            "features": geoJson,
        }
      }, [geoJson]);

    const onPointClick = event => {
        const feature = event.features[0]
        if(feature){
            if(initialViewport.initialZoom.length === 0){
                setInitialViewport({initialZoom: viewport.zoom, initialCenter: [viewport.center]})
            }

            if(feature && feature.layer.id==='cluster-count'){
            const clusterId = feature.properties.cluster_id;
        
            const mapboxSource = sourceRef.current.getSource()
        
            mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) {
                return;
                }
        
                onViewportChange({
                ...viewport,
                longitude: feature.geometry.coordinates[0],
                latitude: feature.geometry.coordinates[1],
                zoom: 13,
                transitionDuration: 500
                })
            })
        }else if(feature.layer.id === 'unclustered-point' || feature.layer.id === 'unclustered-point-text'){
            callback(feature.properties.id)       

            onViewportChange({
                ...viewport,
                    longitude: event.lngLat[0],
                    latitude: event.lngLat[1],
                    center: [event.lngLat[0], event.lngLat[1]],
                    transitionDuration: 500,
                    transitionInterpolator: new FlyToInterpolator(),
                })
            }
        }
    }

    const handleZoomLevel =(vZoom)=>{
        if(vZoom > 4){
            return 10
        }else if(vZoom > 6){
            return 12
        }else if(vZoom > 10){
            return 14
        }else if(vZoom >= 10 && vZoom <= 14){
            return null
        }
    } 

    return (
        <div ref={mapContainerRef} id={id}>            
        <ReactMapGL
             ref={mapRef}
             maxZoom={20}
             {...MAP_CONFIG}
             {...viewport}
             onViewportChange={onViewportChange}
             onClick={onPointClick}
             interactiveLayerIds={[clusterLayer.id, clusterCountLayer.id, unclusteredPointLayer.id, unclusteredPointLayerText.id]}
            >
                <Source
                    type="geojson"
                    data={mapData}
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                    ref={sourceRef}
                    >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer}/>
                    <Layer {...unclusteredPointLayerText}/>
                </Source>     
                <NavigationControl className="navigation-control" showCompass={true} />
                <div className="map-arrow-icon"><GeolocateControl trackUserLocation={true} /></div>
            </ReactMapGL>
        </div>
    )
}

export default ExploreMapBounds
