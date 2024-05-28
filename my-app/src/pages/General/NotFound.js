import React from 'react'
import { ToastContainer } from 'react-toastify'
import MainContainer from '../../components/Layout/MainContainer'
import Header from '../../components/Header/Header'

const NotFound = () => (
  <div>
    <ToastContainer />
    <MainContainer>
            <section className="page half-width mx-auto center column justify">
            <Header title={'404 error'} subheading={'The page you were looking for is not found'} className={'jusitify'}/>
            <a href='/explore' className="btn-secondary quarter-width-lg m-auto">to main page</a>
            </section>
        </MainContainer>
  </div>
)

export default NotFound
