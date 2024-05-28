import React from 'react'
import MainContainer from '../../components/Layout/MainContainer'
import LoginForm from '../../components/Auth/Login'

const Login = (props) => (
  <MainContainer>
    <LoginForm props={props} />
  </MainContainer>
)

export default Login
