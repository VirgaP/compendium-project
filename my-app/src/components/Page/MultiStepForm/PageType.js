import React, { useEffect, useState } from 'react'
import Form from '../../Form/Form'
import RadioOptions from '../../Form/radioOptions'
import Header from './Header'
import constant from '../../../utils/constants'

import {isEmpty } from 'lodash'

const PageType = ({formData, navigation, setMultiFormData }) => {
  const[selected, SetSelected] = useState([formData.type])
  const[error, SetError] = useState(false)

  const callback = (data) => {
    const {value} = data.target

    if(data.target.checked){
      SetError(false)
      SetSelected(value)
      const updatedForm = { ...formData, type: value }
      setMultiFormData(updatedForm)
    }
  
  }

  const validateOptions = () => {
    if(!isEmpty(selected[0])){
      SetError(false)
      navigation.go('discipline')
    }
      return SetError(true)
  }
  return (
    <div className="reg-form__outer-container">
      <div className="step-indicator__container">
        <span className="active step"></span>
        <span className="remaining step"></span>
        <span className="remaining step"></span>
        <span className="remaining step"></span>
        <span className="remaining step"></span>
      </div>
      <Header
        title="Choose a page category"
        subtitle="You can change it anytime later"
      />
      <Form
        className="form-select mt-2"
        action={callback}
        preloadedValues={formData}
      >

        <RadioOptions formData={formData.type} callback={callback} name={'type'} validate={validateOptions} error={error} options={constant.pageTypeOptions}/>
        <div className="sticky-bottom">
          <div className="btn-container">
          <button onClick={()=>validateOptions()} className={`next ${!isEmpty(selected[0]) ? `btn-secondary` : `btn-primary`}`} type="submit">
            next
          </button>
        </div>
      </div>
      </Form>
    </div>
  )
}

export default PageType
