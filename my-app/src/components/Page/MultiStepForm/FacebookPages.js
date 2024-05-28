/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { FacebookProvider, Initialize } from 'react-facebook'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import {isEmpty, matches} from "lodash"
import Header from './Header'
import Loader from '../../Utils/Loader'
import Spacer from '../../Layout/Spacer'
import Spinner from '../../Utils/Spinner'
import page from '../../../services/page.service'
import hook from '../../../utils/hook'
import 'react-toastify/dist/ReactToastify.css'

const REACT_APP_FACEBOOK_APP_ID = '2852101355034931'
const FacebookPages = ({ navigation, formData, fbPagesData, props, setMultiFormData }) => {
  const [submitting] = hook.useAxiosLoader();

  const { register, errors, handleSubmit } = useForm({
    mode: 'all',
  })

  const [errorMessage, setError] = useState('')

  const { previous } = navigation

  const handleChange = (e) => {
    const selected = e.target.value
    const splitString = selected.split(',')
    const pageId = splitString[0]
    const accessToken = splitString[1]
    getPageDetails(pageId, accessToken)
  }

  const validateSelection = () => {
    const radio = document.querySelectorAll('input[name="name"]:checked')
    if (radio.length > 0) {
      return true
    }
    return false
  }
  const getPageDetails = (pageId, accessToken) => {
    window.FB.api(
      `/${pageId}?fields=about%2Cid%2Cbio%2Cpicture.height(961)%2Clocation%2Cwebsite%2Cphone%2Ccurrent_location%2Ccover%2Cname%2Clink%2Ccontact_address%2Cdescription_html%2Cdescription%2Cemails&access_token=${accessToken}`,
      function (response) {
        console.log(response)
        formData.fbId = response.id
        formData.name = response.name ? response.name : ''
        formData.webpage = response.website ? response.website : ''
        formData.phone = response.phone ? response.phone : ''
        formData.links.push(response.link ? response.link : null)
        formData.description = response.about
          ? response.about
          : response.description
        formData.email = response.emails ? response.emails[0] : ''
        // formData.profilePhotoURL = response.picture
        //   ? response.picture.data.url
        //   : ''
        formData.profilePhotoURL = `https://graph.facebook.com/${response.id}/picture?type=large`
        
        formData.city = response.location ? response.location.city : ''
        formData.country = response.location ? response.location.country : ''

        formData.location.longitude = response.location
        && response.location.longitude

        formData.location.latitude = response.location
          && response.location.latitude
        
        formData.address = response.location
          ? `${response.location.street} , ${response.location.city} ${response.location.zip}, ${response.location.country}`
          : ''
      },
    )
  }

  const onSubmit = () => {
    submitForm()
  }

  const submitForm = async () => {
    let payload = formData
    const parseDiscipline = formData.disciplines.map(function (x) {
      return parseInt(x, 10)
    })

    Object.keys(payload).forEach((key) => (isEmpty(payload[key])) && delete payload[key])

    const parseType = parseInt(formData.type, 10)
    payload = { ...payload, disciplines: parseDiscipline }
    payload = { ...payload, type: parseType }

    if(typeof(payload.location.latitude)=== "undefined"){
      navigation.go('location')
    }else{
      try {
        const request = await page.createPage(payload)
          if (request.uuid) {
          } else if (request.error) {
            setError(request.error)
            setTimeout(function(){ window.location.reload() }, 3000)
          }
          if (request.uuid) {
            props.props.history.push(`page/${request.uuid}`)
          }
        } catch (error) {
          console.log(error)
        }
    } 
  }

  return (
    <div className="reg-form__outer-container">
    {submitting && <Loader/> }
    <ToastContainer />
      <div className="step-indicator__container">
        <span className="step"></span>
        <span className="step"></span>
        <span className="step"></span>
        <span className="active step"></span>
        <span className="remaining step"></span>
      </div>
      <Header
        title="Have a Facebook page already?"
        subtitle="Import the profile description, location and more from a page you manage."
      />
     
          <div className="desktop-only"><Spacer className="spacer-50" /></div>
          <p className="rte mt-2 pt-2">Which page do you want to connect to?</p>
          <FacebookProvider appId={REACT_APP_FACEBOOK_APP_ID}>
            <Initialize>
              <form onSubmit={handleSubmit(onSubmit)} className="form-select">
                {fbPagesData.length > 0 ? (
                  fbPagesData.map((i) =>
                    // only show pages managed by user
                    i.tasks.includes('MANAGE') &&
                      (<div className="cursor-p  radio-input option-input-group" key={i.id}>
                        <label className="label-container">
                        <span>{i.name}</span>
                          <input
                            type="radio"
                            name="name"
                            value={[i.id, i.access_token]}
                            id={i.id}
                            ref={register({
                              required: false,
                              validate: validateSelection,
                            })}
                            onChange={handleChange}
                          />
                          <span className="checkmark-radio"></span>
                        </label>
                      </div>))
                ) : (
                  <div className="py-2 rte">
                    It seems you did not provided persmission for Arttice to
                    access your page data, please go &quot;back&quot; to
                    continue facebook page selection
                  </div>
                )}
                {errors.name && errors.name.type === 'validate' && (
                  <div className="error mt-1">Please select one of the options</div>
                )}
                <div className="sticky-bottom mt-2">
                  <div className="btn-container">
                    <div
                      className="btn btn-default previous"
                      onClick={previous}
                      role="button"
                      tabIndex="0"
                      onKeyPress={previous}
                    >
                      back
                    </div>

                    {fbPagesData.length > 0 && (
                      <button className="btn-secondary next btn-contain" type="submit">
                        finish
                      </button>
                    )}
                    </div>
                  </div>
              </form>
            </Initialize>
          </FacebookProvider>
     
    </div>
  )
}

export default FacebookPages
