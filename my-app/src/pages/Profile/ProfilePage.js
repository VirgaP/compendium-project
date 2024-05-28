import React, {useState, useEffect} from 'react'
import Profile from '../../components/Profile/ProfileWrapper'
import Spinner from '../../components/Elements/Spinner'

const ProfilePage = (props) => {

    const [pages, setPages] = useState([])
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true) 


    const dataInStorage = JSON.parse(localStorage.getItem('userPages'))

    const userData = dataInStorage || []

    useEffect(() => {
        let effect = true

        userData ?  Object.keys(userData).map(key => {
            if(userData[key].contentType === 'page'){
                return setPages(prevState => [...prevState, userData[key]])
            }
            if(userData[key].contentType === 'event'){
                return setEvents(prevState => [...prevState, userData[key]])
            }
        }) : []
        setIsLoading(false)
        return () => {
            setIsLoading(false)
            effect = false
        }
    }, [userData.join(',')])

    return (
        <div>
            {isLoading ? <Spinner /> : <Profile pages={pages} events={events} callback={setPages} props={props} refresh={dataInStorage ? false : true}/>}
        </div>
    )
}

export default ProfilePage

