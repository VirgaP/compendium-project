import React from 'react'
import { Link } from 'react-router-dom'
import { useNot } from 'react-hooks-helper'
import Image from '../Form/ZoomedImage'
import func from '../../utils/functions'


const EventCard = ({title, date, endDate, uuid, imageURL}) => {
    const [zoom, showZoom] = useNot(false)

    return (
        <div className={`event-card__container ${uuid}`} key={uuid} id={uuid}>
            <div className="event-card__container-title">{title}</div>
            <div className="flex event-card__container-wrapper">
                <div className="column  event-card__container-column" onClick={showZoom}>
                    <Image url={imageURL} className={'image-responsive'} action={zoom}/>
                </div>
                <div className="space-between column event-card__container-column">
                    <div className="event-card__container-dates">
                    <span>{func.formatDate(date)}</span><br></br>
                    <span>{func.formatTime(date)}</span><span> ({func.formatTimeZone(date)})</span>
                    </div>

                    <div className="event-card__container-btn">
                        <Link to={`/event/${uuid}`}>
                            <button className="btn-secondary btn-full">view event</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="event-card__container-divider desktop-only"></div>
        </div>
    )
}

export default EventCard
