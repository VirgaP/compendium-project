import React from 'react'
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import NotFound from '../pages/General/NotFound'
import Registration from '../pages/Auth/Registration'
import Page from '../pages/Page/Page'
import CreatePage from '../pages/Page/CreatePage'
import CreateEventPage from '../pages/Event/CreateEventPage'
import TermsAndConditions from '../pages/General/TermsAndConditions'
import PrivacyPolicy from '../pages/General/PrivacyPolicy'

const routes = [
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/register/:id/:key',
    component: Registration,
    isPrivate: false,
    isExact: false,
  },
  {
    path: '/create-page',
    component: CreatePage,
    // isPrivate: true,//has to be private
    isPrivate: false,
    isExact: true,
  },
  {
    // path: '/page/:id',
    path: `/page/:id`,
    component: Page,
    isPrivate: false,
    isExact: false,
  },
  {
    path: '/create-event',
    component: CreateEventPage,
    // isPrivate: true,//has to be private
    isPrivate: false,
    isExact: true,
  },
  {
    path: '/terms-and-conditions',
    component: TermsAndConditions,
    isPrivate: false,
  },
  {
    path: '/privacy-policy',
    component: PrivacyPolicy,
    isPrivate: false,
  },
  {
    path: '/',
    component: Home,
    isPrivate: false,
  },
  {
    path: '/*',
    component: NotFound,
    isPrivate: true,
  },
]

export default routes
