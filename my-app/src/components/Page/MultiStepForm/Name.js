import React from 'react'
import { useForm } from 'react-hook-form'
import Header from './Header'
import Spacer from '../../Layout/Spacer'

const Name = ({ formData, navigation, setMultiFormData }) => {
  const preloadedValues = {
    name: formData.name,
  }
  const { next } = navigation
  const { register, errors, handleSubmit } = useForm({
    defaultValues: preloadedValues,
  })

  const onSubmit = (data) => {
    const updatedForm = { ...formData, name: data.name }
    setMultiFormData(updatedForm)
    navigation.go('location')
  }

  const goTo = () => {
    navigation.go('location')
  }

  const goBack = () => {
    navigation.go('connect-facebook')
  }

  return (
    <div className="reg-form__outer-container">
      <div className="step-indicator__container">
        <span className="step"></span>
        <span className="step"></span>
        <span className="step"></span>
        <span className="active step"></span>
        <span className="remaining step"></span>
      </div>
      <Header title="What’s the name of your practice?" />
        <form onSubmit={handleSubmit(onSubmit)} className="form-select form-page-spacer">
          <div className="my-auto half-width-lg">
            <input
              className="single-input"
              type="text"
              id="name"
              name="name"
              placeholder="Your name or title here"
              ref={register({
                required: true,
              })}
            />
          {errors.name && errors.name.type === 'required' && (
            <div className="error mt-1">this field is required</div>
          )}
          </div>
          <div className="sticky-bottom mt-2">
            <div className="btn-container">
              <button className="btn-default previous" onClick={goBack}>
                back
              </button>
              <button className={`next ${formData.name.length > 0 ? `btn-secondary` : `btn-primary`}`} type="submit">
                next
              </button>
            </div>
          </div>
        </form>
      </div>
  )
}

export default Name
