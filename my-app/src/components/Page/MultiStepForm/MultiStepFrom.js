import React, { useEffect, useState } from 'react'
import { useStep } from 'react-hooks-helper'

import Prompt from './Prompt'
import PageType from './PageType'
import Discipline from './Discipline'
import ConnectFacebook from './ConnectFacebook'
import FacebookPages from './FacebookPages'
import Name from './Name'
import Location from './Location'

import './styles.scss'

const steps = [
  { id: 'prompt' },
  { id: 'type' },
  { id: 'discipline' },
  { id: 'connect-facebook' },
  { id: 'facebook-pages' },
  { id: 'name' },
  { id: 'location' },
]

const MultiStepForm = (pageProps) => {
  const { step, navigation } = useStep({ initialStep: 0, steps })
  const { id } = step

  const defaultData = {
    type: '',
    email: '',
    name: '',
    profilePhotoURL: '',
    city: '',
    country: '',
    address: '',
    description: '',
    shortDescription: '',
    phone: '',
    webpage: '',
    imagesURL: [],
    links: [],
    soundCloudLinks: [],
    youtubeLinks: [],
    tags: [],
    location: {
      latitude: '',
      longitude: '',
    },
    disciplines: [],
    openForCollab: true,
    visible: true,
    admins: [],
    hideLocation: false,
    fbId: '',
  }

  const facebookPageListData = []
  const [formData, setFormData] = useState(defaultData)

  const [fbPagesData, setFbPagesData] = useState(facebookPageListData)

  const setMultiFormData = (data) => {
    setFormData(data)
  }

  const props = {
    formData,
    setMultiFormData,
    navigation,
    fbPagesData,
    setFbPagesData,
  }

  switch (id) {
    case 'prompt':
      return <Prompt {...props} promptText={pageProps.promptText} />
    case 'type':
      return <PageType {...props} />
    case 'discipline':
      return <Discipline {...props} />
    case 'connect-facebook':
      return <ConnectFacebook {...props} />
    case 'facebook-pages':
      return <FacebookPages {...props} props={pageProps} />
    case 'name':
      return <Name {...props} />
    case 'location':
      return <Location {...props} props={pageProps} />
    default:
      return null
  }
}

export default MultiStepForm
