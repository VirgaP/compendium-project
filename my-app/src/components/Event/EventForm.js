import React, { useState, useEffect } from 'react'
import { useNot } from 'react-hooks-helper'
import { useForm, Controller} from 'react-hook-form'
import {isEmpty} from "lodash"
import { Link } from 'react-router-dom'

import ReactDependentScript from 'react-dependent-script'
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify'
import { scroller } from "react-scroll"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal'
import Loader from '../Utils/Loader'

import  Header from '../Header/Header'
import Image from '../Form/Image'
import ImageDropzone from '../Form/ImageDropzone'
import PlacesAutocomplete from '../Map/PlacesAutocomplete'
import constant from '../../utils/constants'
import FadeDown from '../Utils/FadeDown'
import TagContainer from '../Form/TagContainer'
import DateAndTimePicker from '../Elements/DateAndTimePicker'
import StaticMap from '../../components/Elements/StaticMap'
import StickyContainerTop from '../Elements/StickyContainerTop'
import event from '../../services/event.services'
import func from '../../utils/functions'
import hook from '../../utils/hook'
import pin from '../../assets/svg/pin.svg'
import arrow from '../../assets/svg/arrow.svg'
import hashTag from '../../assets/svg/hashTag.svg'
import RadioOptions from '../Form/selectOptions'


const EventForm= ({requestData, edit, props, pageId}) => {
  const editmode = edit
  const [loading] = hook.useAxiosLoader();

    const [title, setTitle] = useState()
    // const [date, setDate] = useState()
    // const [endDate, setEndDate] = useState()
    const [text, setText] = useState()
    const [imageURLPlaceholder, setImageURL] = useState(requestData.imageURL || '')
    const [disciplines, setDisciplines] = useState(!isEmpty(requestData.disciplines) ? func.disciplinestStrToInt(requestData.disciplines) : [])
    const [address, setAddress] = useState(requestData.address || '')
    const [venue, setVenue] = useState()
    const [tags, setTags] = useState(requestData.tags || [])
    const [imageFile, setImageFile] = useState({})
    const [lng, setLongitude] = useState(isEmpty(requestData.location) ? '' : requestData.location.longitude)
    const [lat, setLatitude] = useState(isEmpty(requestData.location) ? '' : requestData.location.latitude)
    const [onlineEvent, setOnlineEvent] = useState(requestData.onlineEvent || false)
    const [isBlocking, setIsBlocking] = useState()
    const [startDateDT, setStartDateDT] = useState()
    const [endDateDT, setEndDateDT] = useState('')
    const [errorTag, setErrorTag] = useState('')
    const [open, setOpen] = useState(false)    

    const [editDate, setEditDate] = useNot(false)
    const [editImage, setEditImage] = useNot(false)
    const [editTags, setEditTags] = useNot(false)
    const [editLocation, setEditLocation] = useNot(false)

    const [formData] = useState({
      imageURL: imageURLPlaceholder,
      title: title || requestData.title,
      date: requestData.date,
      endDate: requestData.endDate,
      text: text||requestData.text,
      disciplines: disciplines,
      onlineEvent: onlineEvent,
      location:{
          latitude: lat,
          longitude: lng
      },
      address: address || requestData.address,
      venue: venue || requestData.venue,
      tags: tags || requestData.tags
    })

    const { register, errors, watch, reset, handleSubmit, setValue, control } = useForm({
      defaultValues: formData,
      mode: 'all',
    })

    const { date, endDate } = watch(["date", "endDate"]);

  useEffect(() => {
    register({ name: 'date' }, { required: true });
    register({ name: 'endDate' }, { required: true });
  }, [])

  useEffect(() => {
    let effect = true
    let unique = [...new Set(disciplines)]
    formData.disciplines = unique

    return () => {
      effect = false
    }
  }, [disciplines.join(',')])

  const locationProps = {
    setAddress,
    setLongitude,
    setLatitude,
    setIsBlocking,
    placeholder: 'enter address of the event venue*'
  }

  const mapProps ={
    longitude: lng,
    latitude: lat,
    zoom: 16,
  }  
  // useEffect(() => {
  //     if (isBlocking) {
  //       window.addEventListener('beforeunload', (event) => {
  //         event.preventDefault()
  //         // Older browsers supported custom message
  //         event.returnValue =
  //           'You have unsaved information, are you sure you want to leave this page?'
  //       })
  //     }
  //   }, [isBlocking])  

  const handleTitle =(e)=> {
      setTitle(e.target.value)
      setValue("title", e.target.value)
      setIsBlocking(true)
  }

  const callbackImage= async (data) => {    
    const imageForm = new FormData()
    imageForm.append('name', `event_image`)
    imageForm.append("image", data[0]);
    setImageFile(imageForm)

    setEditImage(false)
    setImageURL(data[0].preview)
    setIsBlocking(true)

    if(editmode){
      setIsBlocking(false)
      try {
        const response = await event.postImage(requestData.uuid, requestData.parent.id, imageForm)
        if (response.status === 200) {
         toast.success('Image uploaded!')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleCheckbox = (e) => {
    setValue("onlineEvent", e.target.checked)
    setIsBlocking(true)
  }

  const handleText=(e)=>{
    // let text = e.target.value.replace(/\n|\r\n/g,"<br>")
    setText(e.target.value)
    setIsBlocking(true)
    setValue("text", e.target.value) 
   }

  const handleVenue =(e)=>{
    setVenue(e.target.value)
    setIsBlocking(true)
    setValue("venue", e.target.value)

  }

  const handleDisciplines =(data)=>{
    const {value} = data.target
    const {checked} = data.target

    if(checked){
      // setDiscipline(disciplines, value)
      setDisciplines(disciplines => ([...disciplines, value]));

    }else{
     const updated = func.removeElement(disciplines, value)
     setDisciplines(prevState => ([...prevState, ...updated]));
    }
    setIsBlocking(true)
  }

  const handleClear=()=>{
    // TODO: imporve celaring imageurl and tags
    reset()
    setIsBlocking(false)
    setImageFile({})
    setAddress(requestData.address)
    setOnlineEvent(requestData.onlineEvent)
    setLongitude(lng)
    setLatitude(lat)
    setStartDateDT(requestData.date)
    setEndDateDT(requestData.endDate)
    setTags(requestData.tags)
  }

  const callbackTags = (data) => {
    setIsBlocking(true)
  }

  const callbackStartDate =(data)=>{
    setStartDateDT(data.toString())
    let formatted = moment(data.toString()).format("YYYY-MM-DD HH:mm:ssZ");
    // setDate(formatted)
    setValue("date", formatted)

  }

  const callbackEndDate =(data)=>{
    setEndDateDT(data.toString())
    let formatted = moment(data.toString()).format("YYYY-MM-DD HH:mm:ssZ");
    // setEndDate(formatted)
    setIsBlocking(true)
    setValue("endDate", formatted)
  }
  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)


  const handleDeleteEvent = async()=>{
    const eventPageId = pageId || requestData.parent.id 
    try {
      const response = await event.deleteEvent(requestData.uuid, eventPageId)
        if(response.status === 200){
          props.history.push(`/page/${eventPageId}`)
        }
      } catch (error) {
        console.log(error)
      }
  }

  const onSubmit = async (data) => {
    let location = {longitude: lng, latitude: lat }

    let imageURL = ""
    if(watch('onlineEvent')===false && !address ){
        toast.error('Please enter the address')
        scroller.scrollTo("location-input", {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
        });
        return false
      }
     if (!editmode && imageURLPlaceholder.length === 0){
      toast.error('Please upload an image')
      scroller.scrollTo("image-upload", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
      return false
    }  
    let eventAddress = address || null

  
    let finalForm = {}
    let finalEditForm = {}
    if(!data.onlineEvent){
      finalForm = {...data, tags, location, address, imageURL}
      finalEditForm = {...data, tags, location, eventAddress}
    }else{
      finalForm = {...data, tags, imageURL}  
      finalEditForm = {...data, tags}
    }

    try {
      const request = editmode  ?  await event.updateEvent(finalEditForm, requestData.uuid, requestData.parent.id) : await event.createEvent(finalForm, imageFile, pageId)

      if (request.status===201 || request.status===200 ) {
        setIsBlocking(false)
        // window.removeEventListener('beforeunload', handler,true);
        const eventUuid = request.data.uuid || requestData.uuid
          return  props.history.push({
            pathname: `/event/${eventUuid}`,
            state: {
             showToast: true,
             message: 'Event created or updated succesfully!'
            },
          })
      }
      if(request.status===400){
        toast.error(request.data.error)
      }
    } catch (error) {
      console.log(error)
    }  
  }

  return (
      <>
       {loading && <Loader/> }
       <Modal open={open} onClose={onCloseModal} center>
       <div className="vertical-center">
          <Header 
            className={'modal'}
            title={'Delete this event?'}
            subheading={'The event will be deleted forever'}
          />
          <div className="btn btn-secondary half-width center" onClick={handleDeleteEvent}>delete</div>
        </div>
      </Modal>
      <ToastContainer />
      <div className="p-2 page__container">
      {editmode && (
            <div className="flex justify my-2">
                <Link to={{ pathname: `/event/${requestData.uuid}`, state:{ requestData }}}><img src={arrow}/></Link>
            </div>
        )}
      <form onSubmit={handleSubmit(onSubmit)}
        className="form-default"
        >
        <div className="form__input-outter-wrapper image-upload">
          {imageURLPlaceholder.length > 0 && !editImage ?(
            <div className="event__image-container" style={{overflow: 'auto'}}>
              <Image url={imageURLPlaceholder} className={"image-responsive"}/>
              {editmode && !editImage &&
              (<span
              className="fl-r btn-secondary"
              onClick={setEditImage}
            >
              change
          </span>)}
            </div>
               ) : (
              <ImageDropzone callback={callbackImage} dropZoneText={'add an event image*'} maxSize={3000000} multiple={false}/>
          )}
        </div>
      <div className="flex-container">
        <div className="flex-col">
          <div className="form__input-outter-wrapper">
              <div className="form__input-wrapper">
                <label>Event title*</label>
                    <input
                      className="input-active"
                      type="text"
                      name="title"
                      maxLength="70"
                      onChange={(e) => handleTitle(e)}
                      ref={register({ required: true, maxLength: 70 })}
                    />
              </div>
                <span>{watch('title').length} / 70</span>
                {errors.title && errors.title.type === 'required' && (
                  <div className="error">This field is required</div>
                )}
                {errors.title && errors.title.type === 'maxLength' && (
                  <div className="error">Plaese do not exceed 70 characters</div>
                )}
          </div>
 
          <div style={{ overflow: 'auto' }}>
          {(editmode || editDate) &&
              (<i
              className="fl-r icon"
              onClick={setEditDate}
              aria-hidden="true"
            >
              {editmode ? ' Change ' : 'Save'}
          </i>)}
      </div>
      <div className="form__input-outter-wrapper">
        <div className="event__calendar-container flex-container">
          {!editDate && requestData.date.length > 0 ?
          <>
          <div className='flex-col'>
            <label>Starts*</label>
            <div className="font-m mt-1">{func.truncateStr(0, 10, formData.date)} at {func.truncateStr(11, 16, formData.date)}</div>
          </div>
          <div className='flex-col'>
            <label>Ends*</label>
          <div className="font-m mt-1">{func.truncateStr(0, 10, formData.endDate)} at {func.truncateStr(11, 16, formData.endDate)}</div>
          </div>
          </>
          :
          <>
          <div className="flex-col">
            <label>Starts*</label>
              <Controller
                as={
                <DateAndTimePicker 
                  id="date"
                  date={new Date()}
                  callback={callbackStartDate}
                  inputProps={{
                    placeholder: 'enter start date and time'
                  }}
                />
              }
              rules={{ required: true }}
              errors={errors.date}
              name="date"
              control={control}
              valueName="startDate"
            />
              {errors.date && errors.date.type === 'required' && (
                  <div className="error">please select start date and time</div>
              )}
          </div>
        
          <div className="flex-col">
            <label>Ends*</label>
            <Controller
                as={
              <DateAndTimePicker 
                date={new Date()}
                inputProps={{
                  disabled: startDateDT ? false : true,
                  placeholder: 'enter end date and time'
                }}
                minDate={startDateDT}
                callback={callbackEndDate}
                />
              }
            name="endDate"
            rules={{ required: true }}
            errors={errors.endDate}
            control={control}
            valueName="endDate"
          />
          {errors.endDate && errors.endDate.type === 'required' && (
                  <div className="error">please select end date and time</div>
              )}
          </div>
          </>
          }
        </div>        
      </div>

      {watch('onlineEvent')===false && 

        <div className="form__input-outter-wrapper">
            <div className="form__input-wrapper location-input" id="location">
              <div className="my-2">
                {lng && lat && (<StaticMap {...mapProps} />)}
              </div>
          {!editLocation && editmode?
          (<>
          <label className="">Location*</label>
          <div className="page__link-container">
            <div className="flex social-media-row border-bottom mt-2 ">
              <img className="" src={pin} alt="pin icon" />
                <span className="pl-3 rte-location-nowrap">{address}</span>
            </div>
          </div>
          {editmode && !editLocation &&
            <i
              style={{marginTop: '-2rem'}}
              className="fl-r icon-b"
              aria-hidden="true"
              onClick={setEditLocation}
              >
              Change
            </i> 
          }
          </>
          ):(
          <>
              <ReactDependentScript
                loadingComponent={<div>loading...</div>}
                scripts={[
                `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`,
                ]}
                >
                <PlacesAutocomplete {...locationProps} id={"event-autocomplete-container"}/>
                </ReactDependentScript>
            </>
          )}
          </div>
        </div>
        }

      {watch('onlineEvent')===false &&(
        <div className="form__input-outter-wrapper">
          <div className="form__input-wrapper">
            <label>Venue*</label>
                <input
                  className=""
                  type="text"
                  name="venue"
                  onChange={(e) => handleVenue(e)}
                  ref={register({
                    validate: {
                      required: value => {
                        if (!value && !onlineEvent) return 'Required when online event is not online';
                        return true;
                      },
                    },
                  })}
                />
          </div>
          {errors.venue && errors.venue.type === 'required' && (
            <div className="error">This field is required</div>
          )}
      </div>
      )}

      <div className="form__input-outter-wrapper pb-1 pb-2-sm">
          <div className="form__input-wrapper">
            <div className="page_location-checkbox">
            <label>
              <input
                type="checkbox"
                name="onlineEvent"
                // checked={onlineEvent}
                ref={register({
                  required: false,
                })}
                onChange={(e)=>handleCheckbox(e)}
              />
              <span className="label-main cursor-p label">
                this event is online
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="form__input-outter-wrapper">
        <div className="form__input-wrapper">
          <label>Event description*</label>
            <textarea
              className="textarea mt-2 mb-1"
              type="text"
              name="text"
              maxLength="2000"
              onChange={(e) => handleText(e)}
              ref={register({ required: true, maxLength: 2000 })}
            />
           <span>{watch('text').length} / 2000</span>
        </div>
          {errors.text && errors.text.type === 'maxLength' && (
            <div className="error">Please do not exceed 500 characters</div>
          )}
           {errors.text && errors.text.type === 'required' && (
            <div className="error">Please provide event description</div>
          )}
      </div>
    </div>

    <div className="flex-col"> 
        <div className="form__input-outter-wrapper">
        <label>Disciplines</label>
          <div className="event__disciplines-wrapper">
          <RadioOptions register={register} callback={handleDisciplines} options={constant.disciplineOptions} name={'disciplines'} formData={formData.disciplines}/>
          </div>
        </div>

      <div className="form__input-outter-wrapper">
          <div className="form__input-wrapper">
            <label className="mb-1">tags to help others find this event</label>
            <div className="tag-container">
              <TagContainer
                tagsProps={formData.tags > 0 ? formData.tags :  tags}
                setTags={setTags}
                callback={callbackTags}
                readonly={!editTags}
                edit={editTags}
                setError={setErrorTag}
              />
            </div>
            {formData.tags.length === 0 && !editTags && (
              <div>
                <img src={hashTag} alt="hashtag icon" className="tag-icon" />
                <input className="pt-2" readOnly name='tags' />
              </div>
            )}
            <i className="icon-b" onClick={setEditTags} aria-hidden="true">
              {editTags ? 'confirm' : 'change'}
            </i>
          </div>
          {errorTag && <div className="error">{errorTag}</div>}
        </div>
        <div className="full-width ">
        <StickyContainerTop>
          <div className='sticky__btn-wrapper event-btn-container' >
          <span
              onClick={() => props.history.goBack()}
              className="cursor-p fl-r font-l bolder"
            ><img src={arrow}/></span>
            <button
              type="submit"
              className="cursor-p fl-l font-l btn-no-style bolder"
            >
              Post
            </button>
          </div>
        </StickyContainerTop>
        </div>  
         </div>
         </div>
      </form>
      </div>
      {editmode && (
        <div className="center mt-2-lg" >
        <button onClick={onOpenModal} className="bold p-2 btn-no-style font-l">delete event</button>
      </div>
      )}
      </>
    )
}

export default EventForm
