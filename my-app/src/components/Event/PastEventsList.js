import React, {useEffect, useState} from 'react'
import axios from 'axios'
import event from '../../services/event.services'
import hook from '../../utils/hook'
import EventCard from './EventCard'
import EventCardSkeleton from '../Utils/EventCardSkeleton'

import './Event.scss'

const PastEventsList = ({pageId}) => {

const [eventsData, setEventsData] = useState([])   
const [loading] = hook.useAxiosLoader()


    useEffect(() => {
    let effect = true
    const source = axios.CancelToken.source()

        async function fetchData() {
            const request = await event.getExpiredEvents(pageId)
            if(request.status==200){
                setEventsData(request.data) 
            }
        }
        fetchData()
        return () => {
            effect = false
            source.cancel('Component got unmounted')
        } 
    }, [])

    const cardObj = eventsData.map(idx => {
        return <EventCard key={idx.uuid} imageURL={idx.imageURL} title={idx.title} date={idx.endDate} uuid={idx.uuid} />
    }) 
  
    return (
        <>
        {!loading ?
        <div className="event-list__container">
            {eventsData.length > 0 
            ? <div>{cardObj}</div>  
            : <div className="rte center mt-1">no past events</div>
            }        
        </div>
        : <div className="py-2-lg"><EventCardSkeleton/></div>
        }
        </>
    )
}

export default PastEventsList
