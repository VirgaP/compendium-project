import React, {useEffect, useRef} from 'react'
import LazyLoad from 'react-lazy-load'
import userIcon from '../../assets/svg/user-white.svg'


const ImageLazyLoad = ({url, className}) => {
    const addDefaultSrc=(e)=>{
        e.target.src = userIcon
        e.target.className += ' default-avatar'
      }

    return (
        <LazyLoad height={55} offsetVertical={110}>
            <img src={url} className={`${className}`} onError={addDefaultSrc}/>
        </LazyLoad>
    )
}

export default ImageLazyLoad
