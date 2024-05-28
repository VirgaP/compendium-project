/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import { useNot } from 'react-hooks-helper'
import { Modal } from 'react-responsive-modal'
import Header from '../Header/Header'
import RegisterForm from './EmailPwd'
import { useAuthState, useAuthDispatch } from '../../context'
import { registerUser } from '../../context/actions'
import auth from '../../services/auth.service'
import envelope from '../../assets/svg/email-envelope.svg'
import gsuite from '../../assets/svg/g-suite.svg'
import facebook from '../../assets/svg/facebookLetter.svg'
import logo from '../../assets/svg/logo-color-w-text.svg'
import arrow from '../../assets/svg/arrow.svg'

import './Auth.scss'


const REACT_APP_GOOGLE_ID = process.env.REACT_APP_GOOGLE_ID

const REACT_APP_FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID

const Register = ({ invitationToken, props, invitation }) => {
  const formData = {
    password: '',
    email: '',
    name: '',
    invitationToken: invitationToken || '',
    invitationId: invitation.id || '',
    invitationKey: invitation.key || '',
  }

  let socialAuthData = {
    openId: {
      provider: '',
      token: '',
      email: '',
    },
    name: '',
    invitation : {
      id: invitation.id || 0,
      key: invitation.key || null
    },
    invitationToken: invitationToken || '',
  }

  const [show, setShow] = useNot(false)
  const [openModal, setOpenModal] = useState(false)    

  const onOpenModal = () => setOpenModal(true)
  const onCloseModal = () => setOpenModal(false)

  const dispatch = useAuthDispatch()
  const { loading, errorMessage } = useAuthState()

  const responseFacebook = async (response) => {
    socialAuthData.openId.provider = 'facebook'
    socialAuthData.openId.token = response.accessToken
    socialAuthData.openId.email = response.email
    socialAuthData.name = response.name

    try {
      const responseFb = await auth.register(socialAuthData, dispatch)
      if (responseFb.uuid) {
        props.history.push('/create-page')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const responseGoogle = async (response) => {
    socialAuthData.openId.provider = 'google'
    socialAuthData.openId.token = response.accessToken
    socialAuthData.openId.email = response.profileObj.email
    socialAuthData.name = response.profileObj.name

    try {
      const responseGl = await auth.register(socialAuthData, dispatch)

      if (responseGl.uuid) {
        props.history.push('/create-page')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Modal open={openModal} onClose={onCloseModal} center>
      <div className="vertical-center">
        <Header 
          className={'modal'}
          title={'Disabled cookies'}
          subheading={'To continue enable cookies in your browser'}
        />
      </div>
    </Modal>
    <section className="auth">
     
      {!show ? (
        <>
        <Header icon={logo} title="Register to Arttice platform" subheading="A lattice of culture"/>
        <div className="auth__btn-container">
          <div>
            {errorMessage ? (
              <p className="center error">{errorMessage.toString()}</p>
            ) : null}
          </div>
          <div>
            <FacebookLogin
              appId={REACT_APP_FACEBOOK_APP_ID}
              fields="name,email,picture.height(961)"
              callback={responseFacebook}
              isMobile={false}
              disableMobileRedirect={true}
              render={(renderProps) => (
                <button className="btn-facebook" onClick={renderProps.onClick}>
                   <img className="vertical-align" src={facebook} alt="facebook icon"/>
                   <span className="vertical-align pl-1">continue with facebook</span>
                </button>
              )}
            />
          </div>
          <div>
            <GoogleLogin
              clientId={REACT_APP_GOOGLE_ID}
              render={(renderProps) => (
                <button
                  className="btn-google"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img className="vertical-align" src={gsuite} alt="google icon"/>
                  <span className="vertical-align pl-1">continue with google</span>
                </button>
              )}
              prompt="consent"
              approvalPrompt="force"
              accessType="offline"
              onSuccess={responseGoogle}
              cookiePolicy={'single_host_origin'}
              onFailure = {err => err.error ==='idpiframe_initialization_failed' && onOpenModal()}
              />
          </div>
          <div>
            <button className="btn-secondary" onClick={setShow}>
            <img className="vertical-align" src={envelope} alt="email icon"/>
              <span className="vertical-align pl-1">register with email</span>
            </button>
          </div>
        </div>
        <br/>
        <p className="rte mb-1" style={{"text-align":"justify", "text-justify":"inter-word", "margin":"15px"}}>
        Arttice is a platform for networking - mapping cultural players, providing a tool for contemporary artists, organisations and the culture curious to explore, discover, connect and collaborate.
        </p>
        <p className="rte mb-1" style={{"text-align":"justify", "text-justify":"inter-word", "margin":"15px"}}>
        With Arttice we want to create a free tool that helps artists and organisations of all disciplines find each other and be found by the public. We want the public to find new and interesting content around in the culture scene. 
        </p>
        <br/>
        <p className="rte mb-1" style={{"text-align":"justify", "text-justify":"inter-word", "margin":"15px"}}>
        Content in Arttice is added by the creators themselves by issuing invitations to other creators.  Therefore fostering a type of openness for the self-curated cultural content.  If you are an artist or an organisation, join us and invite others and contribute to the idea! By joining you are part of the seed of the community we want to sow for this network to have relevant art and culture.
        </p>
        <br/>
        <p className="rte mb-1" style={{"text-align":"justify", "text-justify":"inter-word", "margin":"15px"}}>
        Arttice is currently in its version 2.1.beta. We are continuously working on improving and welcome bug and feature-request <a href="https://github.com/IdeasBlockLT/Arttice-project/issues">reports</a>
        </p>
        

        </>
      ) : (
        <>
        <img className="back-arrow cursor-p" src={arrow} alt="arrow icon" onClick={setShow}/>
         <Header title="Register to Arttice" className={'height-100'}/>
        <RegisterForm formData={formData} props={props} invitationToken={invitationToken} invitation={invitation}/>
        </>
      )}
    </section>
    </>
  )
}

export default Register
