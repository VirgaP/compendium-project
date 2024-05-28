import React, {useEffect, useState} from 'react'
import axios from 'axios'
import event from '../../services/event.services'
import hook from '../../utils/hook'
import EventCard from './EventCard'
import EventCardSkeleton from '../Utils/EventCardSkeleton'

import './Event.scss'
import Spinner from '../Utils/Spinner'

const EventList = ({requestData}) => {

const [isLoading, setIsLoading] = useState(false) 
const [eventsData, setEventsData] = useState([])   

const [loading] = hook.useAxiosLoader()

    useEffect(() => {
    let effect = true
    const source = axios.CancelToken.source()

    setIsLoading(true)
    if(requestData.length > 0){
        for (let i = 0; i < requestData.length; i++) {
            async function fetchData() {
                const request = await event.getEvent(requestData[i].contentUUID)
                setEventsData(prevState => [...prevState, request])
            }
            fetchData()
            i+1 === requestData.length && setIsLoading(false)
            }
        }
        setIsLoading(false)
        return () => {
            effect = false
            setIsLoading(effect)
            source.cancel('Component got unmounted')
        } 
    }, [])

    const cardObj = Object.keys(eventsData).map(idx => {
        return <EventCard key={eventsData[idx].uuid} imageURL={eventsData[idx].imageURL} title={eventsData[idx].title} date={eventsData[idx].date} endDate={eventsData[idx].endDate} uuid={eventsData[idx].uuid} />
    }) 

    return (
        <>
        {!loading ?
        <div className="event-list__container">
            {eventsData.length > 0 
            ? <div>{cardObj}</div>  
            : <div className="rte center">No current events published yet</div>
            }        
        </div>
        : <div className="py-2-lg"><EventCardSkeleton/></div>
        }
        </>
    )
}

export default EventList
