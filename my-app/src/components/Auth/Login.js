/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import { useForm } from 'react-hook-form'
import { useNot } from 'react-hooks-helper'
import { Modal } from 'react-responsive-modal'

import Spinner from '../Elements/Spinner'
import Header from '../Header/Header'
import Spacer from '../Layout/Spacer'
import { useAuthState, useAuthDispatch } from '../../context'
import auth from '../../services/auth.service'
import eye from '../../assets/svg/eye.svg'
import eyeOff from '../../assets/svg/eye-off.svg'
import envelope from '../../assets/svg/email-envelope.svg'
import gsuite from '../../assets/svg/g-suite.svg'
import facebook from '../../assets/svg/facebookLetter.svg'

const REACT_APP_GOOGLE_ID = process.env.REACT_APP_GOOGLE_ID
const REACT_APP_FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID

const Login = ({ props }) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })

  const [show, notShow] = useNot(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [openModal, setOpenModal] = useState(false)    


  const dispatch = useAuthDispatch()
  const { loading, errorMessage } = useAuthState()

  const formData = {
    persist: true,
    local: {
      email: '',
      password: '',
    },
  }

  const socialAuthData = {
    persist: true,
    openId: {
      provider: '',
      token: '',
    },
  }

  const onOpenModal = () => setOpenModal(true)
  const onCloseModal = () => setOpenModal(false)



  const onSubmit = async (data, e) => {
    e.preventDefault()
    formData.local.email = email
    formData.local.password = password
    try {
      const response = await auth.login(formData, dispatch)
      if (response.user.data.id) {
        // Call getOwned from here, instead as from inside the Login response, to avoid cancellation 
        const payload = {uuid: response.user.data.uuid, type: 'user'}
        const userContent = await auth.getOwnedContentUUID(payload)
        window.location.reload()
        // return props.history.push('/explore')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const responseFacebook = async (response) => {
    socialAuthData.openId.provider = 'facebook'
    socialAuthData.openId.token = response.accessToken

    try {
      const responseFB = await auth.login(socialAuthData, dispatch)
      if (responseFB.user.data.id) {
        // Call getOwned from here, instead as from inside the Login response, to avoid cancellation 
        const payload = {uuid: responseFB.user.data.uuid, type: 'user'}
        const userContent = await auth.getOwnedContentUUID(payload)
        window.location.reload()
        // return props.history.push('/explore')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const responseGoogle = async (response) => {
    socialAuthData.openId.provider = 'google'
    socialAuthData.openId.token = response.accessToken

    try {
      const responseGl = await auth.login(socialAuthData, dispatch)
      console.log('responseGl => ', responseGl)
      if (responseGl.user.data.id) {
        // Call getOwned from here, instead as from inside the Login response, to avoid cancellation 
        const payload = {uuid: responseGl.user.data.uuid, type: 'user'}
        const userContent = await auth.getOwnedContentUUID(payload)
        window.location.reload()
        // return props.history.push('/')
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
    <section className="auth login-page">
      <Header title="Login to Arttice" className={'login-header'}/>
      <div>
        {errorMessage ? (
          <p className="center error">{errorMessage.toString()}</p>
        ) : null}
      </div>

      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="form-default full-width pb-2">
            <div className="input-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
                ref={register({
                  required: true,
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                  },
                })}
              />
            </div>
            {errors.email && <span className="error" role="alert">{errors.email.message}</span>}
            {errors.email && errors.email.type === 'required' && (
              <div className="error">Please enter your email</div>
            )}
            <div className="input-group input-with-icon">
              <input
                id="password"
                name="password"
                required
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                ref={register({
                  required: true,
                })}
                type={show ? 'text' : 'password'}
              />
              <i className="icon" onClick={notShow} aria-hidden="true">
                {show ? (
                  <img src={eyeOff} alt="eye icon" />
                ) : (
                  <img src={eye} alt="eye icon" />
                )}
              </i>
            </div>
            <div className="bold font-m cursor-p" style={{textAlign: 'right'}} onClick={()=>props.history.push('/request-password')}>
              forgot password?
            </div>
            <div className="center">
              <button className="btn-secondary login__btn pt-1 mt-2" type="submit">
                login
              </button>
            </div>
          </form>

          <div className="auth__btn-container login">
            <div>
              <FacebookLogin
                appId={REACT_APP_FACEBOOK_APP_ID}
                fields="name,email,picture"
                callback={responseFacebook}
                autoLoad={false}
                isMobile={false}
                disableMobileRedirect={true}
                render={(renderProps) => (
                  <button
                    type="submit"
                    className="btn-facebook"
                    onClick={renderProps.onClick}
                  >
                    <img className="vertical-align" src={facebook} alt="facebook icon"/>
                    <span className="vertical-align pl-1">login with facebook</span>
                  </button>
                )}
              />
            </div>
            <div>
              <GoogleLogin
                clientId={REACT_APP_GOOGLE_ID}
                render={(renderProps) => (
                  <div
                    className="btn btn-google full-width"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <img className="vertical-align" src={gsuite} alt="google icon"/>
                    <span className="vertical-align pl-1">login with google</span>
                  </div>
                )}
                accessType="offline"
                onSuccess={responseGoogle}
                onFailure = {err => err.error ==='idpiframe_initialization_failed' && onOpenModal()}
                cookiePolicy="single_host_origin"
              />
            </div>
          </div>
          <div className="rte center mb-1 mt-2 px-2-sm">
          It is free and open for anyone to explore.<br/>
          To register as an artist or organisation at Arttice you will need an invitation from a member. <br/>
          If you don’t have one and would like to join, <br/><a href="/request-invitation">complete this form</a>
          </div>
        </>
      )}
    </section>
    </>
  )
}

export default Login
