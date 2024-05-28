/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNot } from 'react-hooks-helper'
import { useAuthState, useAuthDispatch } from '../../context'

import auth from '../../services/auth.service'
import Loader from '../Utils/Loader'

import eye from '../../assets/svg/eye.svg'
import eyeOff from '../../assets/svg/eye-off.svg'

const EmailPwd = ({ formData, props, invitationToken }) => {
  const { register, watch, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })

  const dispatch = useAuthDispatch()
  const { loading, errorMessage } = useAuthState()
  const [show1, notShow1] = useNot(false)
  const [show2, notShow2] = useNot(false)

  const onSubmit = async (data) => {
    formData.email = data.email
    formData.password = data.password
    formData.name = data.name
    Object.keys(formData).forEach((key) => (formData[key] === '') && delete formData[key]);
    
    dispatch({ type: 'REQUEST_REGISTER' })

    try {
      const response = auth.preRegister(formData, dispatch)

      if (response===200) {
        props.history.push('/thank-you')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const password = useRef({})
  password.current = watch('password', '')

  return (
    <>
      {loading && (<Loader/> )}
      <div>
        {errorMessage ? (
          <p className="center error">{errorMessage.toString()}</p>
        ) : null}
      </div>
          <form onSubmit={handleSubmit(onSubmit)} className="form-default">
            <div className="input-group">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="name"
                ref={register({
                  required: 'required',
                  minLength: {
                    value: 2,
                    message: 'Name must be least 2 charecters long',
                  },
                })}
              />
            </div>
            {errors.name && <span className="error" role="alert">{errors.name.message}</span>}
            <div className="input-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="email"
                required
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
            <div className="input-group input-with-icon">
              <input
                id="password"
                name="password"
                required
                placeholder="password"
                ref={register({
                  required: 'required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 charecters long',
                  },
                })}
                type={show1 ? 'text' : 'password'}
              />
              <i className="icon" onClick={notShow1} aria-hidden="true">
                {show1 ? (
                  <img src={eyeOff} alt="user icon" />
                ) : (
                  <img src={eye} alt="user icon" />
                )}
              </i>
            </div>
            {errors.password && (
              <span role="alert" className="error">{errors.password.message}</span>
            )}
            <div className="input-group input-with-icon">
              <input
                id="password_repeat"
                name="password_repeat"
                type={show2 ? 'text' : 'password'}
                placeholder="repeat password"
                ref={register({
                  validate: (value) =>
                    value === password.current || 'The passwords do not match',
                })}
              />
              <i className="icon" onClick={notShow2} aria-hidden="true">
                {show2 ? (
                  <img src={eyeOff} alt="user icon" />
                ) : (
                  <img src={eye} alt="user icon" />
                )}
              </i>
            </div>
            {errors.password_repeat && <span className="error">{errors.password_repeat.message}</span>}
            <div className="input-grou p py-2">
            <label htmlFor="terms">
                <input
                  id="terms"
                  name="terms"
                  ref={register({
                    required: true,
                  })}
                  type="checkbox"
                />
                <span className="label-main label">
                  I agree to Arttice’s{' '}
                  <a href="/terms-and-conditions" target="_blank">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy-policy" target="_blank">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>
            {errors.terms && errors.terms.type === 'required' && (
              <div className="error">
                To continue please agree with terms and conditions
              </div>
            )}
            <div className="center center half-width mx-auto pt-2">
              <button className="btn-secondary" type="submit">
                register
              </button>
            </div>
          </form>
        </>
  )
}

export default EmailPwd
