import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNot } from 'react-hooks-helper'
import ReactDependentScript from 'react-dependent-script'
import ReactPlayer from 'react-player'
import ReactTooltip from 'react-tooltip'
import { ToastContainer, toast } from 'react-toastify'
import {isEmpty} from "lodash"
import FormData from 'form-data'
import { scroller } from "react-scroll"
import { Modal } from 'react-responsive-modal'

import Header from '../../Header/Header'
import PlacesAutocomplete from '../../Map/PlacesAutocomplete'
import Form from '../../Form/Form'
import TypeOptions from '../../Form/radioOptions'
import FadeDown from '../../Utils/FadeDown'
import Image from '../../Form/Image'
import AvatarUploader from '../../Form/AvatarUploader'
import ImageDropzone from '../../Form/ImageDropzone'
import DisciplineOptions from '../../Form/selectOptions'
import SocialMediaBlock from '../SocialMedia'
import StickyContainer from '../../Elements/StickyContainer'
import StickyContainerTop from '../../Elements/StickyContainerTop'
import TagContainer from '../../Form/TagContainer'
import Loader from '../../Utils/Loader'
import question from '../../../assets/svg/question-mark.svg'
import userWhite from '../../../assets/svg/user-white.svg'
import hashTag from '../../../assets/svg/hashTag.svg'
import func from '../../../utils/functions'
import constant from '../../../utils/constants'
import hook from '../../../utils/hook'
import page from '../../../services/page.service'

import '../MultiStepForm/styles.scss'



const EditPage = ({ props, requestData, pageUuid, action }) => {

  const [username, setUsername] = useState(requestData.name)
  const [type, setType] = useState(requestData.type)
  const [disciplines, setDisciplines] = useState(!isEmpty(requestData.disciplines) ? func.disciplinestStrToInt(requestData.disciplines) : [])
  const [shortDescription, setShortDescription] = useState(
    requestData.shortDescription,
  )
  const [hideLocation, setHideLocation] = useState(requestData.hideLocation)
  const [address, setAddress] = useState(requestData.address)
  const [lng, setLongitude] = useState(requestData.location ? requestData.location.longitude : '')
  const [lat, setLatitude] = useState(requestData.location ? requestData.location.latitude : '')
  const [city, setCity] = useState(requestData.city)
  const [country, setCountry] = useState(requestData.country)
  const [webpage, setwebpage] = useState(requestData.webpage)
  const [email, setEmail] = useState(!isEmpty(requestData.email) ? requestData.email : '' )
  const [tags, setTags] = useState(requestData.tags)
  const [phone, setPhone] = useState(requestData.phone)
  const [profilePhotoURL, setProfilePhotoURL] = useState(
    requestData.profilePhotoURL,
  )
  const [errorMessage, setErrorMessage] = useState(false)
  const [errorTag, setErrorTag] = useState('')
  const [description, setDescription] = useState(requestData.description)
  // const [avatarFile, setAvatarFile] = useState(null)
  const [imageOne, setImageOne] = useState({})
  const [imageOneUrl, setImageOneUrl] = useState(requestData.imagesURL[0] || '')
  const [videoURL, setVideoURL] = useState(requestData.youtubeLinks[0])
  const [soundCloudLink, setSoundcloudLink] = useState(
    requestData.soundcloudLinks[0],
  )
  const [socialLinks, setSocialLinks] = useState(requestData.links || [])
  const [isBlocking, setIsBlocking] = useState(false)
  const [visible, setVisible] = useState(requestData.visible)
  const [uploadTokens, setUplaodTokens] = useState([])
  const [avatarFormData, setAvatarFormData] = useState(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)    
  const [openHideModal, setOpenHideModal] = useState(false)  
  const [openChangesModal, setOpenChangesModal] = useState(false) 
  const [error, setError] = useState(false)     



  const preloadedValues = {
    hideLocation: hideLocation || requestData.hideLocation,
    address: address || requestData.address,
    city: city || requestData.city,
    country: country || requestData.country,
    type: type || requestData.type,
    disciplines: disciplines,
    latitude: lat ? lat : '',
    longitude: lng ? lng : '',
    webpage: webpage || requestData.webpage,
    email: email,
    phone: phone || requestData.phone,
    profilePhotoURL,
    username: username || requestData.name,
    shortDescription: shortDescription || requestData.shortDescription,
    description: description || requestData.description,
    imageOne: imageOne || requestData.imageOne,
    videoURL: videoURL || requestData.youtubeLinks[0],
    soundCloudLink: soundCloudLink || requestData.soundcloudLinks[0],
    links: socialLinks || requestData.links,
    visible: visible || requestData.visible,
  }

  const [formData, setMultiFormData] = useState(preloadedValues)
  // in case reg data sent separetly
  let registrationData = {
    type,
    email,
    name: username,
    links: socialLinks,
    city,
    country,
    address,
    hideLocation,
    description,
    shortDescription,
    webpage,
    phone,
    imagesURL: requestData[0] || requestData[1] && [requestData[0], requestData[1]],
    soundCloudLinks: soundCloudLink ? [soundCloudLink] : [],
    youtubeLinks: videoURL ? [videoURL] : [],
    location: { latitude: lat, longitude: lng },
    disciplines,
    tags,
    openForCollab: true,
    visible: visible,
    admins: [],
  }
  const [loading] = hook.useAxiosLoader();

  const [editType, setEditType] = useNot(false)
  const [editDiscipline, setEditDiscipline] = useNot(false)
  const [editLocation, setEditLocation] = useNot(false)
  const [editProfileImage, setEditProfileImage] = useNot(false)
  const [editDescription, setEditDescription] = useNot(false)
  const [editImageOne, setEditImageOne] = useNot(false)
  const [editTags, setEditTags] = useNot(false)

  const { register, errors, handleSubmit, watch } = useForm({
    defaultValues: preloadedValues,
    mode: 'all',
  })

  const locationProps = {
    setAddress,
    setLongitude,
    setLatitude,
    setCity,
    setCountry,
    setIsBlocking,
    setError
  }

  const color = func.typeToColor(requestData.type)
  // TODO: show promot unsaved changes when user leaves page
  // hook.useUnload(e => {
  //   e.preventDefault();
  //   e.returnValue = ''
  //   return onOpenChangesModal()
  // })
  useEffect(() => {
    let effect = true
    let unique = [...new Set(disciplines)]
    formData.disciplines = unique

    return () => {
      effect = false
    }
  }, [disciplines.join(',')])


  useEffect(() => {
    const newUrl = watch('videoURL')
    setVideoURL(newUrl)
    const newLink = watch('soundCloudLink')
    setSoundcloudLink(newLink)
    setUsername(watch('username'))
    setwebpage(watch('webpage'))
    setPhone(watch('phone'))
    setShortDescription(watch('shortDescription'))
    setSoundcloudLink(watch('soundCloudLink'))
  }, [watch])

  const handleCheckbox = (e) => {
    e.persist()
    setHideLocation(e.target.checked)
    setIsBlocking(true)
  }

  const handleDelete = async () => {
    setIsBlocking(false)
    try {
      const response = await page.deletePage(pageUuid)
      if (response === 200) {
        let pages = JSON.parse(localStorage.getItem('userPages')) 
        let idx = func.getIndexByKeyValue(pages, pageUuid)
        pages.splice(idx, 1);
        localStorage.setItem('userPages', JSON.stringify(pages))
        toast.success('Page deleted')
        props.history.push('/profile')
      }
    } catch (error) {
      console.log(error)
    }
  }


  const validateCheckboxes = () => {
    const checkbox = document.querySelectorAll(
      'input[name="disciplines"]:checked',
    )
    if (checkbox.length > 0 || disciplines.length > 0) {
      setErrorMessage(false)
      return true
    }
    setErrorMessage(true)
    return false
  }

  const onSubmit = async () => {
    const parseType = parseInt(type, 10)
    registrationData = { ...registrationData, type: parseType }
    registrationData = { ...registrationData, hideLocation: hideLocation}
     if(imageOneUrl===''){
      registrationData = {...registrationData, imagesURL: []}
     }

    const errors = document.querySelectorAll('.error')
    const valid = validateCheckboxes()

    if(!errors.length > 0 && valid){
      try {
        const response = await page.updatePage(registrationData, requestData.uuid)
        if (response.status === 200) {
          setIsBlocking(false)
          window.location.reload()
        }
      } catch (error) {
        console.log(error)
      }
      }else{
        scroller.scrollTo("error", {
          duration: 800,
          offset: -30,
          delay: 0,
          smooth: "easeInOutQuart",
        })
      }
  }

  const handlePageVisible = async(data)=>{
    try {
      const payload = {visible: data}
      const response = await page.updatePage(payload, requestData.uuid)
      if (response.status === 200 ){
        setOpenHideModal(false)
        setVisible(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const callbackAvatar = async (data) => {
    setEditProfileImage(false)
    setProfilePhotoURL(data[0].preview)

    const avatarForm = new FormData()
    avatarForm.append('name', `${username}_avatar`)
    avatarForm.append("image", data[0])

    const payload = { field: 'profilePhotoURL', id: pageUuid }
    try {
      const response = await page.postAvatar(payload, avatarForm)
      if (response.status === 200) {
        toast.success('Image uploaded!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAvatarRemove = () => {
    setProfilePhotoURL('')
    setEditProfileImage(false)
    setIsBlocking(true)
  }

  const callbackType = (data) => {
    setEditType(false)
    setType(parseInt(data.target.value, 10))
    setIsBlocking(true)
  }

  const callbackDiscipline =(data)=>{
    const {value} = data.target
    const {checked} = data.target

    if(checked){
      setErrorMessage(false)   
      setDisciplines(disciplines => ([...disciplines, value]));

    }else{
     const updated = func.removeElement(disciplines, value)
     setDisciplines(prevState => ([...prevState, ...updated]));
    }
    setIsBlocking(true)
  }

  const handleDescription = (e) => {
    const { value } = e.target
    // value = value.replace(/\n|\r\n/g,"<br>")
    setDescription(value)
    setIsBlocking(true)
  }

  const callbackImageOne = async (data) => {
    setImageOneUrl(data[0].preview)
    setEditImageOne(false)

    const imageOneForm = new FormData()
    imageOneForm.append('name', `${username}_image_1`)
    imageOneForm.append("image", data[0]);
    setImageOne(imageOneForm)

    const payload = { field: `imagesURL`, id: pageUuid }
    try {
      const response = await page.postImage(payload, imageOneForm)
      if (response.status === 200) {
        toast.success('Image uploaded!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageOneRemove = () => {
    setImageOneUrl('')
    setImageOne({})
    setEditImageOne(false)
    setIsBlocking(true)
  }

  const callbackSocialMedia = (data) => {
    setSocialLinks(data)
    setIsBlocking(true)
  }

  const handleEmailChange = (e) => {
    setIsBlocking(true)
    setEmail(e.target.value)
  }

  const callbackTags = () => {
    setIsBlocking(true)
  }

  const onOpenDeleteModal = () => setOpenDeleteModal(true)
  const onClosDeleteModal = () => setOpenDeleteModal(false)

  const onOpenHideModal = () => setOpenHideModal(true)
  const onCloseHideModal = () => setOpenHideModal(false)

  const onOpenChangesModal = () => setOpenChangesModal(true)
  const onCloseChangesModal = () => setOpenChangesModal(false)
  const onAbandonChanges = () => {
    setOpenChangesModal(false)
    window.location.reload();
  }

  return (
    <>
    <Modal open={openChangesModal} onClose={onCloseChangesModal} center>
      <div className="vertical-center">
        <Header 
          className={'modal'}
          title={'There are unsaved changes?'}
          subheading={'Save changes or cancel'}
        />
        <div className="btn btn-secondary half-width center" onClick={onAbandonChanges}>continue</div>
        <div className="btn btn-secondary half-width center" onClick={onSubmit}>save</div>
      </div>
    </Modal>
    <Modal open={openDeleteModal} onClose={onClosDeleteModal} center>
      <div className="vertical-center">
        <Header 
          className={'modal'}
          title={'Delete this page?'}
          subheading={'All contents on this page will be lost forever.'}
        />
        <div className="btn btn-secondary half-width center" onClick={handleDelete}>delete</div>
      </div>
    </Modal>
    <Modal open={openHideModal} onClose={onCloseHideModal} center>
      <div className="vertical-center">
        <Header 
          className={'modal'}
          title={'Hide this page temporarily?'}
          subheading={'Nobody will be able to find it untill you make it visible again.'}
        />
        <div className="btn btn-secondary half-width center" onClick={()=>{handlePageVisible(false)}}>hide</div>
      </div>
    </Modal>
    {!visible && <StickyContainer>
      <div className="sticky-page-hidden"><span>this page is currently hidden. </span><span className="bolder font-l cursor-p" onClick={()=>(handlePageVisible(true))}>unhide</span></div>
    </StickyContainer>}
      <div className="page__container" id="edit-form">
        {loading && <Loader/> }
      <StickyContainerTop>       
         <div className="sticky-save"><button onClick={onSubmit} className="bold font-m btn-no-style">save</button></div>
      </StickyContainerTop>
      <ToastContainer />
      <Form
        className="form-default mt-2-lg"
        action={onSubmit}
        preloadedValues={formData}
      >

        <div className="form__input-outter-wrapper mt-1">
          <div className="form__input-wrapper page__avatar-section my-2-lg">
                {!editProfileImage ? (
                  <>
                    <div className={`avatar-wrapper ${color}`}>
                    <Image
                      url={profilePhotoURL || userWhite}
                      className={`${
                        !!profilePhotoURL
                          ? `profile-avatar image-fit ${color}`
                          : `default-avatar ${color}`
                        }`}
                    />
                  </div>
                    <div className="uploader-btn-wrapper">
                      <div
                        className="icon avatar-control-icon"
                        onClick={setEditProfileImage}
                        role="button"
                        tabIndex="0"
                        onKeyPress={setEditProfileImage}
                      >
                        Change
                    </div>
                    </div>
                  </>
                ) : (
                    <>
                      <ImageDropzone callback={callbackAvatar} maxSize={2000000} multiple={false} dropZoneText="add a profile image"/>
                      {!editProfileImage && profilePhotoURL.length > 0 ? (
                        <div className="uploader-btn-wrapper">
                          <i
                            className="avatar-control-icon"
                            onClick={setEditProfileImage}
                            aria-hidden="true"
                          >
                            Change
                    </i>
                          <div
                            role="button"
                            tabIndex="0"
                            onKeyPress={handleAvatarRemove}
                            className="btn-primary"
                            onClick={handleAvatarRemove}
                          >
                            Remove
                    </div>
                        </div>
                      ) : (
                          ''
                        )}
                    </>
                  )}
            </div>
        </div>

        <div className="flex-container">
          <div className="flex-col py-2-lg pb-2-sm">

            <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                <label>Name</label>
                  <input
                    className="input-active"
                    type="text"
                    name="username"
                    onChange={() => setIsBlocking(true)}
                    ref={register({ required: true })}
                  />
              </div>
              <span className="length fl-r">{watch('username').length} / 100</span>
              {errors.username && errors.username.type === 'required' && (
                <div className="error">This field is required</div>
              )}
            </div>

            <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                <label>Tagline</label>
                  <input
                    type="text"
                    name="shortDescription"
                    onChange={() => setIsBlocking(true)}
                    maxLength="40"
                    ref={register({ maxLength: 40 })}
                  />
              </div>
              <span className="length fl-r">{watch('shortDescription').length} / 40</span>
              {errors.shortDescription &&
                errors.shortDescription.type === 'maxLength' && (
                  <div className="error">
                    Please do not exceed 40 characters
                </div>
              )}
            </div>

            <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                <label>Website / Portfolio link</label>
                <input
                    type="text"
                    id="webpage"
                    name="webpage"
                    onChange={() => setIsBlocking(true)}
                    ref={register({
                      required: false,
                      pattern: {
                        value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                        message: 'Please enter a valid url',
                      },
                    })}
                  />
              </div>
              {errors.webpage && <div className="error" role="alert">{errors.webpage.message}</div>}
            </div>

            <div className="form__input-outter-wrapper">
                <label>Contact Email</label>
                  <input
                    type="text"
                    name="email"
                    onChange={(e) => handleEmailChange(e)}
                    ref={register({
                      required: false,
                      pattern: {
                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email',
                      },
                    })}
                  />
              {errors.email && <div className="error" role="alert">{errors.email.message}</div>}
            </div>

            <div className="form__input-outter-wrapper">
              <SocialMediaBlock
                data={socialLinks}
                edit
                callback={callbackSocialMedia}
              />
            </div>

            <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                <label>Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={() => setIsBlocking(true)}
                  ref={register({
                    required: false,
                    pattern: {
                      value: /\+?[\d ]+/,
                      message: 'Please enter a valid phone number',
                    },
                  })}
                />
              </div>
              {errors.phone && <div className="error" role="alert">{errors.phone.message}</div>}
            </div>

            <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                <label>Profile type</label>
                <>
                  <FadeDown show={editType}>
                    <TypeOptions
                      formData={preloadedValues.type} 
                      callback={callbackType} 
                      name={'type'} 
                      register={register}
                      options={constant.pageTypeOptions}
                    />
                  </FadeDown>
                  {!editType && (
                    <>
                      <div className="input-group">
                        <input
                          type="text"
                          className="no-border lower-case"
                          readOnly
                          name="type"
                          defaultValue={func.typeToString(type)}
                        />
                      </div>
                      <i
                        className="icon-b"
                        onClick={setEditType}
                        aria-hidden="true"
                      >
                        change
                  </i>
                    </>
                  )}
                </>
              </div>
            </div>

            <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                <label>Disciplines</label>
                <>
                  <FadeDown show={editDiscipline}>
                    <div className="page__disciplines-wrapper">
                    <DisciplineOptions
                      name={'disciplines'} 
                      options={constant.disciplineOptions}
                      callback={callbackDiscipline}
                      formData={registrationData.disciplines}
                    />
                    </div>
                  </FadeDown>
                  {!editDiscipline && (
                    <>
                      <div className="no-border lower-case rte">{func.disciplinestToString(registrationData.disciplines).join(', ')}</div>
                      <i
                        className="icon-b"
                        onClick={setEditDiscipline}
                        aria-hidden="true"
                      >
                        change
                  </i>
                    </>
                  )}
                </>
              </div>
              {errorMessage && (
                <div className="error">Select one of the options</div>
              )}
            </div>
            <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                <label className="mb-1">Tags to discover your by</label>
                <div className="tag-container">
                  <TagContainer
                    tagsProps={tags}
                    setTags={setTags}
                    callback={callbackTags}
                    readonly={!editTags}
                    edit={editTags}
                    setError={setErrorTag}
                  />
                </div>
                {tags.length === 0 && !editTags && (
                  <div>
                    <img src={hashTag} alt="hashtag icon" className="tag-icon" />
                    <input className="pt-2" readOnly type="text"/>
                  </div>
                )}
                <i className="icon-b" onClick={setEditTags} aria-hidden="true">
                  {editTags ? 'confirm' : 'change'}
                </i>
              </div>
                {errorTag && <div className="error">{errorTag}</div>}
            </div>

            <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                <label>Location</label>
                {!editLocation ? (
                  <>
                    <div>
                      {hideLocation ? (
                        <input
                          type="text"
                          readOnly
                          name="address"
                          value={`${preloadedValues.city}, ${preloadedValues.country}`}
                        />
                      ) : (
                          <input
                            readOnly
                            type="text"
                            name="address"
                            value={preloadedValues.address}
                          />
                        )}
                      <i
                        className="icon-b"
                        onClick={setEditLocation}
                        aria-hidden="true"
                      >
                        change
                  </i>
                    </div>
                    <div className="page_location-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          name="hideLocation"
                          checked={hideLocation}
                          onChange={(e)=>{handleCheckbox(e)}}
                        />
                        <span className="label-main label cursor-p">
                          hide my location, show only the city
                        </span>
                        
                      </label>
                      <div data-tip data-for="locationTip" className="ml-1 fl-r" style={{overflow: 'auto'}}>
                          <img className="vertical-align cursor-p" src={question} alt="question mark icon" width='15'/>
                        </div>
                        <ReactTooltip id="locationTip" place="top" effect="solid">
                          if you choose to hide the location, it will not be shown to visitors, and your page will not be shown on the map, but will still appear in the search result list.
                        </ReactTooltip>
                    </div>
                  </>
                ) : (
                    <div>
                      <ReactDependentScript
                        loadingComponent={<div>Script is loading...</div>}
                        scripts={[
                          `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`,
                        ]}
                      >
                        <PlacesAutocomplete
                          {...locationProps}
                          id="profile__autocomplete-container"
                        />
                      </ReactDependentScript>
                      <i
                        className="icon-t"
                        onClick={setEditLocation}
                        aria-hidden="true"
                      >
                        confirm
                  </i>
                      <div className="">
                        <label>
                          <input
                            type="checkbox"
                            name="hideLocation"
                            ref={register({})}
                            value="true"
                            onChange={() => setHideLocation(true)}
                          />
                          <span className="label-main label mt-1 cursor-p">
                            Hide my location, show only the city
                    </span>
                        </label>
                      </div>
                    </div>
                  )}
              </div>
              {error ? (
                <div className="location__error error mt-1">
                  please enter a valid address or location
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="flex-col py-2-lg">
            <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                <label>About</label>
                {!editDescription ? (
                  <div className="rte rte-description py-1">{description}</div>
                ) : (
                    <>
                      <textarea
                        rows="10" 
                        id="description"
                        name="description"
                        className="textarea"
                        onChange={(e) => handleDescription(e)}
                        maxLength="5000"
                        value={description}
                      />
                    </>
                  )}
              </div>
              <span className="length">{description.length} / 5000</span>
              <div className="mt-1" style={{ position: 'relative' }}>
                <i
                  className="icon-b"
                  onClick={setEditDescription}
                  aria-hidden="true"
                >
                  {editDescription ? 'confirm' : 'change'}
                </i>
              </div>
            </div>

            <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                {imageOneUrl.length > 0 && !editImageOne ? (
                  <>
                    <Image url={imageOneUrl} className="image-responsive" />
                    <div className="uploader-btn-wrapper">
                      <div
                        className="btn-primary"
                        onClick={setEditImageOne}
                        role="button"
                        tabIndex="0"
                        onKeyPress={setEditImageOne}
                      >
                        Change
                  </div>
                      <div
                        className="btn-primary"
                        onClick={handleImageOneRemove}
                        role="button"
                        tabIndex="0"
                        onKeyPress={handleImageOneRemove}
                      >
                        Delete
                  </div>
                    </div>
                  </>
                ) : (
                    <>
                      <ImageDropzone callback={callbackImageOne} maxSize={3000000} multiple={false}/>
                      {!editImageOne && imageOneUrl.length > 0 ? (
                        <div className="uploader-btn-wrapper">
                          <i
                            className="btn-primary"
                            onClick={setEditImageOne}
                            aria-hidden="true"
                          >
                            Change
                    </i>
                          <div
                            role="button"
                            tabIndex="0"
                            onKeyPress={handleImageOneRemove}
                            className="btn-primary"
                            onClick={handleImageOneRemove}
                          >
                            Remove
                    </div>
                        </div>
                      ) : (
                          ''
                        )}
                    </>
                  )}
              </div>
            </div>

            <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                {soundCloudLink && soundCloudLink.length > 0 && (
                  <div className="container-responsive mb-1">
                    <ReactPlayer url={soundCloudLink} />
                  </div>
                )}
                <label>Soundcloud link</label>
                  <input
                        type="text"
                        id="soundCloudLink"
                        name="soundCloudLink"
                        onChange={() => setIsBlocking(true)}
                        ref={register({
                          required: false,
                          pattern: {
                            value: /^(https?:\/\/)?(www\.)?(soundcloud\.com|snd\.sc)\/.*$/,
                            message: 'Please enter a valid url',
                          },
                        })}
                      />
              </div>
              {errors.soundCloudLink && (
                <div className="error" role="alert">{errors.soundCloudLink.message}</div>
              )}
            </div>

            <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                {videoURL && videoURL.length > 0 && (
                  <div className="container-responsive mb-1">
                    <ReactPlayer url={videoURL} />
                  </div>
                )}
                <label>Video link</label>
                <input
                  type="text"
                  id="videoURL"
                  name="videoURL"
                  onChange={() => setIsBlocking(true)}
                  ref={register({})}
                />
              </div>
              {errors.videoURL && <div className="error" role="alert">{errors.videoURL.message}</div>}
            </div>
      
          </div>
        </div>
      </Form>
      <div className="center mt-2-lg edit-page-btn-container">
        <div onClick={onOpenDeleteModal} className="bold p-2 btn-no-style font-m btn">delete page</div>
        {visible ? <div onClick={onOpenHideModal} className="bold p-2 btn-no-style font-m btn">hide page</div> : <div onClick={()=>{handlePageVisible(true)}} className="bold p-2 btn-no-style font-m btn">unhide page</div>}
      </div>
    </div>
    </>
  )
}

export default EditPage
