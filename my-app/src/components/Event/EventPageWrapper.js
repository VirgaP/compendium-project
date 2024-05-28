import React, {useEffect, useState} from 'react'
import EventPreview from './EventPreview'
import MainContainer from '../../components/Layout/MainContainer'

const EventPageWrapper = ({props, eventData}) => {

    const pageProps = {
        props, requestData: eventData.event, page:eventData.page
    }
    return (
        <MainContainer>
            <EventPreview {...pageProps} />
        </MainContainer>
    )
}

export default EventPageWrapper
