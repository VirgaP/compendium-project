import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import {isEmpty} from "lodash"
import { Modal } from 'react-responsive-modal'
import AddToCalendar from '@culturehq/add-to-calendar'
import '@culturehq/add-to-calendar/dist/styles.css'

import  Header from '../Header/Header'
import Image from '../Form/Image'
import Map from '../Map/LocationMap'
import PageCard from '../Card/Card'
import arrow from '../../assets/svg/arrow.svg'
import online from '../../assets/svg/online.svg'
import func from '../../utils/functions'
import event from '../../services/event.services'


const EventPreview = (pageProps) => {

    const requestData = pageProps.requestData

    requestData.text = requestData.text.replace(/<br>/g,"\n")

    const page = pageProps.page
    const props = pageProps.props

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const pageAdminsIds = Object.keys(page.admins).map((key)=>(page.admins[key].id))
    const owner = currentUser && pageAdminsIds.includes(currentUser.id)
    const [showToast, setShowToast] = useState(false)
    const [open, setOpen] = useState(false)    

    const onOpenModal = () => setOpen(true)
    const onCloseModal = () => setOpen(false)
  
    // TODO: create custiom hook to retrieve dat afrom location state and clear after reload
    useEffect(() => {
        let effect = true
       setShowToast(props.history.location.state ? props.history.location.state.showToast : false) 
       const {location, history} = props;
        history.replace()
        return () => {
            effect =false
        }
    }, [])

    let mapProps ={}
    if(!isEmpty(requestData.location)|| !requestData.onlineEvent){
        mapProps = {
            lng: requestData.location.longitude,
            lat: requestData.location.latitude,
            zoom: 12,
            id: `event-preview-map`
        }
    }

    const cardProps = {
        uuid: page.uuid,
        name: page.name,
        avatar: page.profilePhotoURL,
        tagline: page.shortDescription,
        type: page.type
    }

    useEffect(() => {
        if(showToast){
            toast('Sucess!')
        }
    }, [showToast])

    const handleDeleteEvent = async()=>{
        try {
          const response = await event.deleteEvent(requestData.uuid, page.id)
            if(response.status === 200){
                props.history.push({
                    pathname: `/page/${page.uuid}`,
                    state: {
                    toast:{showToast: true, message: 'Event deleted'},
                },
              })
            }if(response.status === 400){
                onCloseModal()
                toast.error(response.data.error)
            }
          } catch (error) {
            console.log(error.response)
          }
      }

    return (
        <>
        <ToastContainer/>
        <Modal open={open} onClose={onCloseModal} center>
        <div className="vertical-center">
            <Header 
                className={'modal'}
                title={'Delete this event?'}
                subheading={'The event will be deleted forever'}
            />
            <div className="btn btn-secondary half-width center" onClick={handleDeleteEvent}>delete</div>
            </div>
        </Modal>
        <div className="page__container">
        {owner ? (
            <div className="flex justify my-2">
                <Link to={{ pathname: `/page/${page.uuid}`, state:{ requestData }}}><img src={arrow}/></Link>
                <div>
                <Link to={{ pathname: `/edit/event/${requestData.uuid}`,  state: {
                    requestData
                } }} className="font-l bold">edit</Link>
                    <span className="font-l bold pl-1 cursor-p" onClick={onOpenModal}>delete</span>
                </div>
            </div>
        ):(
            <div className="add-to-cal-wrapper">
            <AddToCalendar 
                event={{
                    name: requestData.title,
                    details: requestData.text,
                    location: requestData.address || '',
                    startsAt: requestData.date,
                    endsAt: requestData.endDate
                }}
            />
            </div>
        )}
            <div className="event__image-container">
                <Image url={requestData.imageURL || 'https://via.placeholder.com/800X300'} className={'image-responsive'} />
            </div>
            <div className="flex-container">
            <div className="flex-col">
                <div className="page__section-wrapper font-xl font-normal">{requestData.title}</div>
                {requestData.disciplines.length > 0 && 
                    (<div className="page__section-wrapper">
                        {requestData.disciplines && requestData.disciplines.map((item)=> 
                        (<span className="page__disciplines text-light font-l mr-1 lower-case" key={item}>{item}</span>)
                    )}
                </div>
                )}
                {requestData.tags.length >0 && 
                (<div className="page__section-wrapper mb-1">
                    <div className="event__tags-container">
                    {requestData.tags.map((item)=> 
                        <span key={item}className="text-light font-l">
                        #{item}&nbsp;
                        </span>
                    )}
                    </div>
                </div>)}

                <div className="page__section-wrapper">
                    <div className="rte rte-description">{requestData.text}</div>
                </div>
            </div>
            <div className="flex-col">
                <div className="pt-2-lg">
                    {requestData.onlineEvent ?
                    <div><img className="vertical-align" src={online} alt="globe icon"/><span className="font-l pl-1 text-light">this is an online event</span></div>
                    :
                    <> 
                        <Map {...mapProps} />   
                        <div className="rte py-1">
                            <div className="font-l pb-1">{requestData.address}</div>
                            <div className="font-l pb-2">{requestData.venue}</div>
                        </div>
                    </>
                    }
                </div>
                <div className="pt-2-lg">
                    <div className="rte">starts: 
                        <span className="mx-1">{func.formatDate(requestData.date)}</span>
                        <span>{func.formatTime(requestData.date)}</span>
                        <span> ({func.formatTimeZone(requestData.date)})</span>
                    </div>
                    <div className="rte py-1">ends: 
                        <span className="mx-1">{func.formatDate(requestData.endDate)}</span>
                        <span>{func.formatTime(requestData.endDate)}</span>
                        <span> ({func.formatTimeZone(requestData.endDate)})</span>
                    </div>
                </div>

                <div className="py-2-lg">
                    <div className="divider mobile-only"></div>
                {<PageCard {...cardProps}/>}
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default EventPreview
