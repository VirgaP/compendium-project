import React from 'react'
import { FacebookProvider, Initialize } from 'react-facebook'
import Header from './Header'
import facebook from '../../../assets/svg/facebookLetter.svg'

// Facebook for developers app_id
const REACT_APP_FACEBOOK_APP_ID = '2852101355034931'

const ConnectFacebook = ({ navigation, setMultiFormData, setFbPagesData }) => {
  const { next, previous } = navigation

  const goTo = () => navigation.go('name')

  const getFacebookPages = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log(
            'Welcome!  Fetching your information.... ',
            response.authResponse,
          )

          window.FB.api('/me', function (response) {})

          window.FB.api('/me/accounts', function (response) {
            const pagesArr = []
            response.data.forEach(function (page) {
              const resObj = {
                access_token: page.access_token,
                id: page.id,
                name: page.name,
                tasks: page.tasks,
              }
              pagesArr.push(resObj)
            })
            setFbPagesData(pagesArr)
          })

          navigation.go('facebook-pages')
        } else {
          console.log('User cancelled login or did not fully authorize.')
        }
      },
      { scope: 'public_profile,email,pages_show_list,pages_read_engagement' },
    )
  }

  return (
    <div className="connect-fb__container reg-form__outer-container">
      <div className="step-indicator__container">
        <span className="step"></span>
        <span className="step"></span>
        <span className="active step"></span>
        <span className="remaining step"></span>
        <span className="remaining step"></span>
      </div>
      <Header
        title="Have a Facebook page already?"
        subtitle="Import the profile description, location and more from a page you manage."
      />
      <div className="center form-select form-page-spacer mt-2">
        <FacebookProvider appId={REACT_APP_FACEBOOK_APP_ID}>
          <Initialize>
            <div
              className="btn-facebook m-auto"
              style={{width: 'fit-content'}}
              onClick={getFacebookPages}
              role="button"
              tabIndex="0"
              onKeyPress={getFacebookPages}
            >
              <img className="vertical-align" src={facebook} alt="facebook icon"/>
                   <span className="vertical-align pl-1"> connect to a facebook page</span>
             
            </div>
          </Initialize>
        </FacebookProvider>
        <div className="sticky-bottom mt-2">
          <div className="btn-container">
            <div
              className="btn-default previous btn"
              onClick={previous}
              role="button"
              tabIndex="0"
              onKeyPress={previous}
            >
              back
            </div>
            <div
              className="btn-secondary next btn"
              onClick={goTo}
              role="button"
              tabIndex="0"
              onKeyPress={goTo}
            >
              skip
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectFacebook
