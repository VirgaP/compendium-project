import React from 'react'
import MultiStepForm from '../../components/Page/MultiStepForm/MultiStepFrom'
import MainContainer from '../../components/Layout/MainContainer'
import '../../components/Page/MultiStepForm/styles.scss'
const CreatePage = (props) => {
  const promptText = props.location.state ? props.location.state.text : ''
  const formProps ={ props, promptText }
  return (
    <MainContainer>
      <MultiStepForm {...formProps}/>
    </MainContainer>
  )
}

export default CreatePage
