import React, { useEffect, useState } from 'react'
import EventPageWrapper from '../../components/Event/EventPageWrapper'
import event from '../../services/event.services'
import page  from '../../services/page.service'
import axios from 'axios'
import Spinner from '../../components/Utils/Spinner'
import EventSkeleton from '../../components/Utils/EventSkeletonLoader'

const EventPage = (props) => {
    const [eventId] = useState(props.match.params.eventId)
    const [pageData, setPageData] = useState()
    const [eventData, setEvent] = useState({})
    const [isLoading, setIsLaoding] = useState()
    useEffect(() => {
        
    async function fetchEvent() {
        setIsLaoding(true)
            const eventRequest=  await event.getEvent(eventId)
            const eventPage = await event.getPage(eventRequest.parent.uuid)
            setEvent({event: eventRequest, page: eventPage })
        }
     fetchEvent()   
        setIsLaoding(false)
    }, [])


    return (
        <div>
            {Object.keys(eventData).length !== 0 ? <EventPageWrapper eventData={eventData} props={props}/> : <EventSkeleton/>}
        </div>
    )
}

export default EventPage
