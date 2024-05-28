import React from 'react'
import userIcon from '../../assets/svg/user-white.svg'


const Image = ({ url, className, action }) => {
  const addDefaultSrc=(e)=>{
    e.target.src = userIcon
    e.target.className += ' default-avatar'
  }
return(
  <div>
    <img src={url} className={`${className}`} onError={addDefaultSrc}
/>
  </div>
  )
}

export default Image
