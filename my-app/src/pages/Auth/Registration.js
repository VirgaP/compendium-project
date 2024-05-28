import React from 'react'
import RegistrationForm from '../../components/Auth/Register'
import MainContainer from '../../components/Layout/MainContainer'

const Registration = (props) => {

  const query = new URLSearchParams(props.location.search);

  const invitationToken = query.get('invitationToken')

  const inviteId = query.get('id')
  const inviteKey = query.get('key')

  const invitation = {id: inviteId, key: inviteKey}

  return (
    <MainContainer>
      <RegistrationForm invitationToken={invitationToken} props={props} invitation={invitation}/>
    </MainContainer>
  )
}

export default Registration
