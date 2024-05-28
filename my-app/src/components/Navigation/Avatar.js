import React from 'react'
import {Link} from 'react-router-dom'
import func from '../../utils/functions'
import Image from '../Form/Image'
import userWhite from '../../assets/svg/user-white.svg'

const Avatar = (avatarProps) =>  {
    const color = func.typeToColor(avatarProps.type)
return(
     <a href={avatarProps.link && avatarProps.link.substring(5)} className="user-page-avatar">
    <div className="avatar-wrapper-sidebar">
    <Image
     url={avatarProps.profilePhotoURL || userWhite}
     className={`${
        avatarProps.profilePhotoURL
         ? `profile-avatar-sidebar ${color}` 
         : `default-avatar-sidebar ${color}`
     }`}
     />
     </div>
</a>
)}


export default Avatar
