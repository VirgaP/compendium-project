import React, {useEffect, useState} from 'react'
import axios from 'axios'
import hook from '../../utils/hook'
import pin from '../../assets/svg/pin.svg'
import Spinner from '../Utils/Spinner'

const REACT_APP_MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const StaticMap = (props) => {
    const { width } = hook.useWindowSize()
    const [staticMap, setStaticMap] = useState()
    const [isLoading, setIsLaoding] = useState(false)

    useEffect(() => {
        const mapWidth = width > 768 ? 1200 : 768
        const height = width > 768 ? 400 : 250
        const zoom = props.zoom || 14
        const mapStyle = 'light-v10'
        setIsLaoding(true)
        async function fetchMap() {
          const request = await axios.get(
            `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/pin-s-circle+285A98(${props.longitude},${props.latitude})/${props.longitude},${props.latitude},${zoom},0/${mapWidth}x${height}?access_token=${REACT_APP_MAPBOX_ACCESS_TOKEN}`,
          )
          setIsLaoding(false)
          return setStaticMap(request.config.url)
        }
        fetchMap()
      }, [props.longitude, props.latitude])
      
    return (
        <div>
            {props.longitude && props.latitude &&(<div className="page__map-container">
                {!isLoading ? <img src={staticMap} alt="static map" /> : <Spinner/>}
            </div>)}
            {props.address && (<div className="page__link-container ">
                <div className="flex social-media-row">
                <img className="" src={pin} alt="pin icon" />
                    <span className="pl-3">{props.address}</span>
                </div>
            </div>)}
        </div>
    )
}

export default StaticMap
