import React, {useEffect, useState} from 'react'
import MainContainer from '../../components/Layout/MainContainer'
import { ToastContainer, toast } from 'react-toastify'
import EventEdit from '../../components/Event/EventForm'
import event from '../../services/event.services'


const EditEventPage = (props) => {

    const [requestData] = useState(props.location.state ? props.location.state.requestData : null)

    return (
        <MainContainer>
            <EventEdit requestData={requestData} edit={true}  props={props}/>
        </MainContainer>
    )
}

export default EditEventPage
