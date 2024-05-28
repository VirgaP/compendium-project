import React from 'react'
import { Controlled as Zoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ZoomedImage = ({ url, className, action }) => {

return(
  <Zoom isZoomed={action}>
    <img src={url} className={`${className}`} width="100"/>
  </Zoom>
  )
}

export default ZoomedImage
