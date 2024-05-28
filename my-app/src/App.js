import React,{useState, useEffect} from 'react'
import { Router, Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context'
import AppRoute from './components/AppRoute'
import routes from './config/routes'

import WelcomePage from './pages/General/Welcome'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import NotFound from './pages/General/NotFound'
import Registration from './pages/Auth/Registration'
import Confirm from './pages/Auth/Confirm'
import Page from './pages/Page/Page'
import PageEdit from './pages/Page/EditPage'
import CreatePage from './pages/Page/CreatePage'
import CreateEventPage from './pages/Event/CreateEventPage'
import EditEventPage from './pages/Event/EditEventPage'
import EventPage from './pages/Event/EventPage'
import Profile from './pages/Profile/ProfilePage'
import Settings from './pages/Settings/SettingsPage'
import TermsAndConditions from './pages/General/TermsAndConditions'
import AboutPage from './pages/General/About'
import PrivacyPolicy from './pages/General/PrivacyPolicy'
import ThankYouPage from './pages/General/ThankYou'
import ResetPassword from './pages/Auth/PasswordReset'
import RequestPassword from './pages/Auth/RequestPassword'
import RequestInvitation from './pages/Auth/RequestInvitation'
import history from './utils/history'
import func from './utils/functions'
import { useAuthState } from './context'
import PageSidebar from './components/Navigation/PageSidebar'


const PrivateRoute = ({ component, ...options }) => {
  const {user}  = useAuthState()
  const finalComponent = user ? component : Login;
  return <Route {...options} component={finalComponent} />
}

function App() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter history={history}>
          <Switch>
          <PageSidebar>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/explore" component={Home} />
            <Route exact path="/login">
              {currentUser ? <Redirect to="/explore" /> : <Login />}
            </Route>
            <Route path="/register" component={Registration} />
            <Route path="/emailConfirmed" component={Confirm}/>
            <Route path="/changePassword" component={ResetPassword}/>
            <Route path="/request-password" component={RequestPassword}/>
            <Route path="/request-invitation" component={RequestInvitation}/>
            <PrivateRoute path="/create-page" component={CreatePage} />
            <Route path="/page/:slug" component={Page} />
            <PrivateRoute path="/create-event" history component={CreateEventPage} />
            <PrivateRoute path="/edit/page/:page" component={PageEdit} />
            <PrivateRoute path="/edit/event/:event" component={EditEventPage} />
            <Route path="/event/:eventId" component={EventPage} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/settings" component={Settings}/>
            <Route path="/thank-you" component={ThankYouPage}/>
            <Route path="/terms-and-conditions" component={TermsAndConditions}/>
            <Route path="/privacy-policy" component={PrivacyPolicy}/>
            <Route path="/about" component={AboutPage}/>
          </PageSidebar>
          <Route path="/*" component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
