import React, { useEffect, useState } from 'react'
import {isEmpty } from 'lodash'
import { scroller } from "react-scroll"
import Header from './Header'
import Form from '../../Form/Form'
import func from '../../../utils/functions'
import constant from '../../../utils/constants'
import DisciplineOptions from '../../Form/selectOptions'

const Discipline = ({ formData, navigation, setMultiFormData }) => {
  const[selected, setSelected] = useState(formData.disciplines)
  const[error, setError] = useState(false)

  useEffect(() => {
    let effect = true
    let unique = [...new Set(selected)]
    const updatedForm = { ...formData, disciplines: unique }
    setMultiFormData(updatedForm)
    return () => {
      effect = false
    }
  }, [selected])

  const callback = (data) => {
    const {value} = data.target
    const {checked} = data.target


    if(checked){
      setError(false)
      setSelected(selected => ([...selected, value]));
    }else{
     const updated = func.removeElement(selected, value)
     setSelected(prevState => ([...prevState, ...updated]));
    }
  }

  const validateOptions = () => {
    if(!isEmpty(selected)){
      setError(false)
      navigation.go('connect-facebook')
    }else{
      setError(true)
    }
    scroller.scrollTo("error", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }

  return (
    <div className="reg-form__outer-container">
      <div className="step-indicator__container">
        <span className="step"></span>
        <span className="active step"></span>
        <span className="remaining step"></span>
        <span className="remaining step"></span>
        <span className="remaining step"></span>
      </div>
      <Header
        title="Select discipline(s)"
        subtitle="Select a discipline or few that best describe your practice"
      />
      <Form
        className="form-select mt-2"
        action={callback}
        preloadedValues={formData}
      >
        <DisciplineOptions
          callback={callback}
          formData={formData.disciplines}
          name={'type'} 
          error={error}
          options={constant.disciplineOptions}
        />
        <div className="sticky-bottom">
          <div className="btn-container">
            <button className="previous btn-default" onClick={ () => navigation.go('type')}>
              back
            </button>
            <div className={`btn next ${!isEmpty(selected) ? `btn-secondary` : `btn-primary`}`}  onClick={()=>validateOptions()}>
              next
            </div>
          </div>
      </div>
      </Form>
    </div>
  )
}

export default Discipline
