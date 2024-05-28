/* eslint-disable react/prop-types */
import React, { useState } from 'react'

import Map from '../../components/Map/LocationMap'
import ReactPlayer from 'react-player'
import { useNot } from 'react-hooks-helper'
import Image from '../Form/ZoomedImage'
import RegularImage from '../Elements/Image'
import StyledLink from '../Elements/StyledLink'
import SocialMediaBlock from './SocialMedia'
import EventList from '../Event/EventList'
import PastEventsList from '../Event/PastEventsList'
import userWhite from '../../assets/svg/user-white.svg'
import plus from '../../assets/svg/plus-sign.svg'
import arrowDown from '../../assets/svg/arrow-down.svg'
import arrowUp from '../../assets/svg/arrow-up.svg'
import func from '../../utils/functions'
import hook from '../../utils/hook'
import StickyContainer from '../Elements/StickyContainer'
import Loader from '../Utils/Loader'

import page from '../../services/page.service'


const PagePreview = ({ props, requestData, action, owner, events }) => {

  const description = requestData.description.replace(/<br>/g,"\n")

  const linkProps = { text: 'create a new event', icon2: plus, link: '/create-event', pageId: requestData.id }

  const showMap = !!requestData.location && !! requestData.location
  const staticMapProps ={
    lng: !!requestData.location ? requestData.location.longitude : '',
    lat: !! requestData.location ? requestData.location.latitude: '',
    zoom: 12,
    id: `event-preview-map`
  } 

  const [loading] = hook.useAxiosLoader()
  const [zoom, showZoom] = useNot(false)
  const [show, showEvents] = useNot(false)

  
  const [visible, setVisible] = useState(requestData.visible)
  const color = func.typeToColor(requestData.type)

  const handlePageVisible =async(data)=>{
    setVisible(data)
    try {
      const payload = {visible: data}
      const response = await page.updatePage(payload, requestData.uuid)
      console.log(response)
      if (response.status === 200) {
        props.history.push(`/page/${requestData.uuid}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const openUrl=(url)=>{
    if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
        return url
    }else{
      return `//${url}`
    }
  }
  return (
    <>
    {loading && <Loader/> }
    {!visible && 
    <StickyContainer>
      <div className="sticky-page-hidden"><span>this page is currently hidden. </span><span className="bolder font-l cursor-p" onClick={()=>(handlePageVisible(true))}>unhide</span></div>
    </StickyContainer>}
    <div className="page__container flex-container">
      <div className="flex-col mt-2-lg">
     {owner && (<div className="desktop-only" style={{overflow:'auto'}}>
        <button onClick={action} className="bold p-1 fl-r font-l btn-no-style">edit</button>
      </div>)}
      <div className="page__header">
        <div className="page__header-left">
          <div className={`avatar-wrapper ${color}`} onClick={showZoom}>
            <Image
            action={zoom}
              url={requestData.profilePhotoURL || userWhite}
              className={`${
                !! requestData.profilePhotoURL
                  ? 'profile-avatar image-fit'
                  : `default-avatar ${color}`
              }`}
            />
          </div>
        </div>
        <div className="page__header-right">
          <div className="page__title">{requestData.name && requestData.name}</div>
          <div className={`font-l  pb-1 lower-case ${color}`}>
            {func.typeToString(requestData.type)}
          </div>
          <div className="rte desktop-only">{requestData.shortDescription}</div>
        </div>
      </div>

      {requestData.shortDescription && <div className="page__section-wrapper mobile-only">
        <div className="rte mobile-only">{requestData.shortDescription}</div>
      </div>}

      <div className="page__section-wrapper">
        {requestData.disciplines && requestData.disciplines.map((item, index)=> 
          (<span className="page__disciplines lower-case text-light font-l" key={item}>{item}{index < requestData.disciplines.length -1 ? ', ': ''}</span>)
        )}
      </div>
 
      {requestData.tags.length >0 && 
        (<div className="page__section-wrapper mb-1 tags-container">
          {requestData.tags.map((item)=> 
          <span key={item}className="text-light font-l">
          #{item}&nbsp;&nbsp;
          </span>
        )}
      </div>)}  
         
     {!requestData.hideLocation && showMap  &&
     (
        <div className="pb-2 mt-1">
          <Map {...staticMapProps} />
        </div>
      )}
      <div className="py-1">
          {!requestData.hideLocation ? (
            <>
            <span className="font-l">{requestData.address}</span>
            </>
          ) : (
            <>
            <span className="font-l">
              {requestData.city}, {requestData.country}
            </span>
            </>
          )}
        </div>

        {requestData.webpage && (
          <div className="font-l py-1">
            {/* <a href={`${requestData.webpage}`} target="blank" rel="noreferrer"> */}
            <a href={openUrl(requestData.webpage)} target="blank" rel="noreferrer">
             {requestData.webpage}
            </a>
          </div>
        )}
     
        {requestData.email && (
          <div className="py-1">
            <span className="font-l">{requestData.email}</span>
          </div>
        )}
     
        {requestData.phone && (
          <div className="font-l py-1">
            <a href={`tel:${requestData.phone}`}>
            {requestData.phone}
            </a>
          </div>
        )}
      
      <div className="py-1 align-vertical">
          <SocialMediaBlock data={requestData.links} edit={false} />  
      </div>  

      <hr></hr>
      {description.length > 0 && <div className="page__section-wrapper">
        <div className="rte rte-description">{description}</div>
      </div>}
     
      {requestData.imagesURL.length > 0 ? (
        <>
          {requestData.imagesURL.map((link) => (
            <div className="page__image-container mt-2"  key={link}>
            <RegularImage url={link}/>
            </div>
          ))}
          </>
      ) : (
        <div></div>
      )}
      {requestData.youtubeLinks.length > 0 ? (
        <div className="page__media-wrapper video-wrapper">
          {requestData.youtubeLinks.map((link) => (
            <div key={link} className="container-responsive my-2">
              <ReactPlayer url={link} />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      {requestData.soundcloudLinks.length > 0 ? (
        <div className="page__media-wrapper">
          {requestData.soundcloudLinks.map((link) => (
            <div className="container-responsive">
              <ReactPlayer url={link} />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      </div> 
      <div className="flex-col mt-2-lg pt-2-lg">
        {owner && (
          <div className="px-2-lg">
              <div className="page__link-wrapper full- width vertical-center">
                <StyledLink {...linkProps} />
              </div>
          </div> 
        )}
        <div id="page-events">
          <EventList requestData={events} />
        </div>
        <div id="page-events">
          <div onClick={showEvents} className="center cursor-p">
            {!show 
            ? <><span className="font-l">view past events </span><img src={arrowDown} alt="icon down arrow"/></>
            : <><span className="font-l">hide past events </span><img src={arrowUp} alt="icon down arrow"/></>
            }
          </div>
          <div className="page__expired-events-container">{show && <PastEventsList pageId={requestData.id} />}</div>
        </div>
      </div>
    </div>
    </>
  )
}

export default PagePreview
