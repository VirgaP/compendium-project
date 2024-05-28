import React, {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Modal } from 'react-responsive-modal'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { useNot } from 'react-hooks-helper'
import { useAuthDispatch } from '../../context'

import MainContainer from '../Layout/MainContainer'
import ProfileContent from './ProfileContent'
import Carousel from '../Elements/Carousel'
import gifList from '../../utils/gifList'
import Header from '../Header/Header'
import Loader from '../Utils/Loader'
import PageList from '../Page/PageList'
import CardList from '../Card/PageCardList'
import CardSelect from '../Card/CardSelect'
import StyledLink from '../Elements/StyledLink'
import auth from '../../services/auth.service'
import hook from '../../utils/hook'
import func from '../../utils/functions'
import list from '../../utils/gifList';
import plus from '../../assets/svg/plus-sign.svg'


import './Profile.scss' 

const ProfileWrapper = ({props, events, pages, refresh, callback}) => {
    const dispatch = useAuthDispatch()

    const[notification, setNotification] = useState(
        {showToast: props.history.location.state ? props.history.location.state.toast.showToast : false,
        message: props.history.location.state ? props.history.location.state.toast.message : ''
        })
    const [invitation, setInvite] = useState(null)   
    const [email, setEmail] = useState('')
    const [sender, setSenderPage] = useState(null)
    const [open, setOpen] = useState(false)
    const [openLogout, setOpenLogout] = useState(false)    
    const [openTour, setOpenTour] = useState(false)    
    const [copied, setCopied] = useState(false)
    const [error , setError ] = useState(true)
    const [show, notShow] = useNot(false)
    const [gifsList, setList] = useState([])

    const onOpenModal = () => setOpen(true)
    const onCloseModal = () => {
        setOpen(false)
        notShow(false)
        setSenderPage(null)
        setInvite(null)
        setError('')
    }

    const onOpenLogoutModal = () => setOpenLogout(true)
    const onCloseLogoutModal = () => setOpenLogout(false)
    const onOpenTourModal = () => setOpenTour(true)
    const onCloseTourModal = () => setOpenTour(false)


    const [fetching] = hook.useAxiosLoader();

    const linkProps = { text: 'new page', icon2: plus, link: '/create-page' }

    const { width } = hook.useWindowSize()

  useEffect(() => {
    width > 600 ? setList(list.gifList) : setList(list.mobileGifList)

  }, [width])
    
    useEffect(() => {

        if(notification.showToast){
            toast(notification.message)
        }
        return () => {
            setNotification({showToast: false})
        }
    }, [])

    const handleClick = async(e)=>{
 
        if(sender) {
            try {
                const response = await auth.generateInvitation(sender)
                setInvite(response.data.invitationLink)
                setError ('')
            } catch (error) {
                console.log(error)
            }
        }else{
            setError ('please select a page first')
        }      
    }

    const handleChange =(e)=>{
        const {value} = e.target
        setEmail(value)
    }

    const handleShowPages=async()=>{
        const user = JSON.parse(localStorage.getItem('currentUser'))
        const payload = {uuid: user.uuid, type: 'user'}
        try {
            const response = await auth.getOwnedContentUUID(payload)
            if(response.length > 0 ){
                callback(response)        
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault()

        if(sender){
            setError('')
            try {
                const response = await auth.inviteByEmail(sender, email)
                if(response.status == 201 ){
                    setEmail(response.data.invitationLink)
                    toast('Your invitation is sent!')
                    onCloseModal()
                }else if(response.status == 400){
                    setEmail('')
                    let errorMsg = response.data.error || response.data.email[0]
                    toast.error(errorMsg)
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            setError('please select a page first')
        }
  
    }
    return (
        <>
        {fetching && <Loader/> }
        <Modal open={open} onClose={onCloseModal} center>
        <div className="center modal-select mt-2">
            <Header 
                title={'Send an invite'}
                subheading={'We’ll send them a short email with a registration link.'}
            />
                <div className="flex evenly">
                    <div className="font-l text-light">from: </div>
                    <div className="modal-select-col-wrapper">
                        <PageList userPages={pages}>
                            <CardSelect callback={setSenderPage} />
                        </PageList>
                        <span className="error fl-l">{error }</span>
                    </div>
                </div>
                {show ? <form onSubmit={handleSubmit} className="modal-form-select">
                <div className="flex evenly ">
                    <div className="font-l text-light">to: </div>
                    <div className="modal-select-col-wrapper pl-1">
                        <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="enter their email"
                        required 
                        onChange={(e)=>{handleChange(e)}}
                        />
                    </div>
                </div>
                <button type="submit" className="btn-secondary mt-2 half-width">send invite</button>
            </form>
           : <><div className="btn-secondary half-width" onClick={()=>notShow(false)}>invite via email</div><br/></>}
            {invitation && <CopyToClipboard text={invitation}
                    onCopy={() => setCopied(true)}> 
            <button className="btn-secondary mt-2 half-width">{!copied ?  'copy' : 'copied!'}</button>
            </CopyToClipboard>}
            {invitation && <><div className="invite-link">{invitation}</div><br/><div className="rte">the link will expire in 2 weeks</div></>}
            {!invitation && !show && <button className="btn-secondary mt-2 half-width" onClick={() => {handleClick()}}>generate link</button>}

        </div>
        </Modal>

        <Modal open={openLogout} onClose={onCloseLogoutModal} center>
        <div className="vertical-center">
            <Header 
                className={'modal'}
                title={'Logout'}
                subheading={'Do you wish to logout?'}
            />
            <button className="btn-secondary half-width" onClick={()=>auth.logout(dispatch)}>logout</button>
        </div>
        </Modal>

        <Modal open={openTour} onClose={onCloseTourModal} center>
        <div className="vertical-center">
            <Header 
                className={'modal no-header'}
                title={'Virtual Tour'}
            />
            <p>&nbsp;</p>
            {gifsList.length === 0 && <div>Loading...</div>}
                {gifsList.length > 0 &&
                    <Carousel imgList={gifsList}/>
                }
            <button className="btn-secondary half-width slider-button" onClick={onCloseTourModal}>close</button>
        </div>
        </Modal>

        <ToastContainer/>
        <MainContainer>
        <section className="profile">
        <div className="page__container flex-container">
            <div className="flex-col">
                <div className="px-2-lg">
                    <div className="page__link-wrapper full- width vertical- center">
                        <StyledLink {...linkProps} />
                    </div>
                </div> 
            {!refresh ? <PageList userPages={pages}>
                <CardList />
            </PageList> 
            : <button className="btn-default" onClick={handleShowPages}>show my pages</button>
            }
            </div>
            <div className="flex-col">
                <div className="font-l cursor-p py-1" onClick={onOpenModal}>invite someone to arttice</div>
                <div className="font-l cursor-p py-1" onClick={()=>{props.history.push('/settings')}}>account settings</div>
                <div className="font-l cursor-p py-1" onClick={onOpenTourModal}>virtual tour</div>
                
                <div className="font-l cursor-p py-1" onClick={onOpenLogoutModal}>log out</div>
            </div>    
        </div>
        </section>
           
        </MainContainer>
        </>
    )
}

export default ProfileWrapper

