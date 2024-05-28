import React from 'react'
import whiteUser from '../../../assets/svg/user-white.svg'
import user from '../../../assets/svg/user.svg'
import plusSign from '../../../assets/svg/plus-black.svg'


const Prompt = ({ navigation, promptText }) => {
  const { next } = navigation
  return (
    <span className="cursor-p " onClick={next}>
    <div className="prompt__container">
      <div className="user-icon-bg">
        <img src={user} />
      </div>
      <div className="font-l">{promptText || ' create a page'}</div>
      <div>
        <img className="icon-plus vertical-align" src={plusSign} />
      </div>
    </div>
    </span> 
  )
}

export default Prompt
