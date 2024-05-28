import React from 'react'
import MainContainer from '../../components/Layout/MainContainer'
import EventCreate from '../../components/Event/EventForm'

const requestData = {
    title: '',
    date: '',
    endDate: '',
    text: '',
    imageURL: '',
    disciplines: '',
    relatedLink:'',
    address:'',
    venue: '',
    location: {
        latitude:'',
        longitude:''
    },
    onlineEvent: false,
    tags: []
}
function CreateEventPage(props) {
    const pageId = props.history.location.state
    return (
        <MainContainer>
            <EventCreate requestData={requestData} edit={false} props={props} pageId={pageId}/>
        </MainContainer>
    )
}

export default CreateEventPage
