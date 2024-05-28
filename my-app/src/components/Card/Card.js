import React from 'react'
import Image from '../Form/ImageLazyLoad'
import func from '../../utils/functions'
import './Card.scss'

import userWhite from '../../assets/svg/user-white.svg'
import arrowRight from '../../assets/svg/arrow-right.svg'

const Card = (cardProps) => {
  const color = func.typeToColor(cardProps.type)
  
  return(
  <div className={`card-wrapper ${cardProps.uuid}`} id={cardProps.uuid}>
  <div className="divider desktop-only"></div>
  <a href={`/page/${cardProps.uuid}`}>
  <div className="card">
    <div className="card__img">
      <div className={`avatar-wrapper ${color}`}>
        <Image
          url={cardProps.avatar || userWhite}
          className={`${
            !! cardProps.avatar
              ? `profile-avatar image-fit ${color}`
              : `default-avatar ${color}`
          }`}
        />
        </div>
      </div>
    <div className="card__info">
      <h2 className="card__info-title">{cardProps.name}</h2>
      <p className="card__info-description">{cardProps.tagline}</p>

    </div>
    <img className="pr-1 card__arrow" src={arrowRight} alt="arrow right" />
  </div>
  </a>
  <div className="divider"></div>
  </div>
)}

export default Card
