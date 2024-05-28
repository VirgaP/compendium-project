import React, {useEffect} from 'react'
import MainContainer from '../../components/Layout/MainContainer'
import auth from '../../services/auth.service'
import Header from '../../components/Header/Header'
import { toast, ToastContainer } from 'react-toastify'


const Confirm = (props) => {
    // https://www.arttice.com/emailConfirmed?invitationToken={token}&emailKey={key}
    useEffect(() => {
        const sidebar = document.getElementById('sidebar')
        // sidebar.style="display:none"
    }, [])

    const query = new URLSearchParams(props.location.search);
    const key = query.get('emailKey')
    const token = query.get('invitationToken')

    const inviteId = query.get('invitationId')
    const inviteKey = query.get('invitationKey')

    const invitation = {id: inviteId, key: inviteKey}

    const handleSubmit=async(e)=>{
        let payload = {}
        e.preventDefault()

        if(token){
            payload={
                emailKey: key,
                invitationToken: token,
            } 
        }else{
            payload={
                emailKey: key,
                invitation,
            }
        }

        try {
            const response = await auth.registerConfirm(payload) 
            console.log(response) 
            if (response.status===201) {
                props.history.push('/login')
            }else if(response.status===400){
                toast.error('The link is not valid or expired')
            }else if(response.status===500){
                toast.error('Oops something went wrong')
            }
          } catch (error) {
            console.log(error)
          }
    }
    return (
        <MainContainer>
            <ToastContainer/>
            <section className="page half-width mx-auto center column justify">
            <Header title={'Almost there!'} subheading={'click button below to complete your registration'} className={'jusitify'}/>
                <form onSubmit={handleSubmit} className="center">
                    <button type="submit" className="btn-secondary" disabled={!key}>confirm email</button>
                </form>
            </section>
        </MainContainer>
    )
}

export default Confirm
