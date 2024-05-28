import React, { useState } from 'react'
import { useNot } from 'react-hooks-helper'
import instagram from '../../assets/svg/instagram.svg'
import twitter from '../../assets/svg/twitter.svg'
import facebook from '../../assets/svg/facebook.svg'
import soundcloud from '../../assets/svg/soundcloud.svg'
import func from '../../utils/functions'

const SocialMedia = ({ data, edit, callback }) => {
  const regexInstgram = new RegExp('instagram')
  const regexFacebook = new RegExp('facebook')
  const regexTwitter = new RegExp('twitter')
  const regexSoundcloud = new RegExp('soundcloud')

  const [editLinkfacebook, setEditLinkfacebook] = useNot(false)
  const [editLinktwitter, setEditLinktwitter] = useNot(false)
  const [editLinkinstagram, setEditLinkinstagram] = useNot(false)
  const [editLinksoundcloud, setEditLinksoundcloud] = useNot(false)

  const newLinks = data.reduce((acc, url) => {
    if (regexInstgram.test(url)) {
      acc.push({ instagram: url })
    }
    if (regexFacebook.test(url)) {
      acc.push({ facebook: url })
    }
    if (regexTwitter.test(url)) {
      acc.push({ twitter: url })
    }
    if (regexSoundcloud.test(url)) {
      acc.push({ soundcloud: url })
    }
    return acc
  }, [])

  const [linksUpdated, setLinksUpdated] = useState([...newLinks])
  const [instagramError, setInstagramError] = useState('')
  const [facebookError, setFacebookError] = useState('')
  const [twitterError, setTwitterError] = useState('')
  const [soundcloudError, setSoundcloudError] = useState('')

  const socialMedias = data.reduce((acc, url) => {
    if (regexInstgram.test(url)) {
      acc.push('instagram')
    }
    if (regexFacebook.test(url)) {
      acc.push('facebook')
    }
    if (regexTwitter.test(url)) {
      acc.push('twitter')
    }
    if (regexSoundcloud.test(url)) {
      acc.push('soundcloud')
    }
    return acc
  }, [])

  const [mediasArr, setMediasArr] = useState(socialMedias)

  const result = data.reduce((acc, url) => {
    if (regexInstgram.test(url)) {
      acc.push({ icon: instagram, link: url, name: 'instagram' })
    }
    if (regexFacebook.test(url)) {
      acc.push({ icon: facebook, link: url, name: 'facebook' })
    }
    if (regexTwitter.test(url)) {
      acc.push({ icon: twitter, link: url, name: 'twitter' })
    }
    if (regexSoundcloud.test(url)) {
      acc.push({ icon: soundcloud, link: url, name: 'soundcloud' })
    }
    return acc
  }, [])

  const hadleChange = (e, name) => {
    const { value } = e.target
    if (name === 'instagram' && value.length > 0) {
      const valid = regexInstgram.test(value)
      return !valid
        ? setInstagramError('Please enter a valid url for instagram account')
        : setInstagramError('')
    }
    if (name === 'facebook' && value.length > 0) {
      const valid = regexFacebook.test(value)
      return !valid
        ? setFacebookError('Please enter a valid url for facebook profile')
        : setFacebookError('')
    }
    if (name === 'twitter' && value.length > 0) {
      const valid = regexTwitter.test(value)
      return !valid
        ? setTwitterError('Please enter a valid  url for twitter acount')
        : setTwitterError('')
    }
    if (name === 'soundcloud' && value.length > 0) {
      const valid = regexSoundcloud.test(value)
      return !valid
        ? setSoundcloudError('Please enter a valid  url for soundcloud acount')
        : setSoundcloudError('')
    }
  }

  const prepareData = (e, name) => {
    const { value } = e.target
    const newObj = { [name]: value }
    const replaced = func.replaceObject(newObj, newLinks)
    if (!mediasArr.includes(name)) {
      setMediasArr([...mediasArr, name])
    }
    setLinksUpdated([...replaced])
  }

  const submitLink = (name) => {
    if (name === 'instagram') {
      setEditLinkinstagram(false)
    }
    if (name === 'facebook') {
      setEditLinkfacebook(false)
    }
    if (name === 'twitter') {
      setEditLinktwitter(false)
    }
    if (name === 'soundcloud') {
      setEditLinksoundcloud(false)
    }
    const payload = func.removeObjectKeys(linksUpdated, mediasArr)
    const formatted = payload.filter((item) => item)

    callback(formatted)
  }

  return (
    <div>
      {!edit ? (
        <div className="page__social-container">
          {result.map((i) => (
            <div className="flex social-media-row" key={i.link}>
              <span>
                <a href={i.link} target="blank">
                <img src={i.icon} alt="icon" />
                </a>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="page__link-container my-2">
          <div
            className="flex form__input-wrapper"
            style={{ position: 'relative' }}
          >
            <img className="pr-1" src={facebook} alt="icon" />
            <input
              className=""
              type="text"
              name="facebook"
              readOnly={!editLinkfacebook}
              defaultValue={newLinks.map((url) => url.facebook).join('')}
              onChange={(e) => hadleChange(e, 'facebook')}
              onBlur={(e) => prepareData(e, 'facebook')}
            />
            {editLinkfacebook ? (
              <i
                className={`icon-b font-s ${facebookError && 'icon-disabled'}`}
                aria-hidden="true"
                onClick={() => submitLink('facebook')}
              >
                confirm
              </i>
            ) : (
              <i
                className="icon-b font-s"
                aria-hidden="true"
                onClick={setEditLinkfacebook}
              >
                change
              </i>
            )}
          </div>
          {facebookError.length > 0 && (
            <span className="error">{facebookError}</span>
          )}
          <div
            className="flex form__input-wrapper"
            style={{ position: 'relative' }}
          >
            <img className="pr-1" src={instagram} alt="icon" />
            <input
              className=""
              type="text"
              name="instagram"
              readOnly={!editLinkinstagram}
              defaultValue={newLinks.map((url) => url.instagram).join('')}
              onChange={(e) => hadleChange(e, 'instagram')}
              onBlur={(e) => prepareData(e, 'instagram')}
            />
            {editLinkinstagram ? (
              <i
                className={`icon-b font-s ${instagramError && 'icon-disabled'}`}
                aria-hidden="true"
                onClick={() => submitLink('instagram')}
              >
                confirm
              </i>
            ) : (
              <i
                className="icon-b font-s"
                aria-hidden="true"
                onClick={setEditLinkinstagram}
              >
                change
              </i>
            )}
          </div>
          {instagramError.length > 0 && (
            <span className="error">{instagramError}</span>
          )}
          <div
            className="flex form__input-wrapper"
            style={{ position: 'relative' }}
          >
            <img className="pr-1" src={twitter} alt="icon" />
            <input
              className=""
              type="text"
              name="facebook"
              readOnly={!editLinktwitter}
              defaultValue={newLinks.map((url) => url.twitter).join('')}
              onChange={(e) => hadleChange(e, 'twitter')}
              onBlur={(e) => prepareData(e, 'twitter')}
            />
            {editLinktwitter ? (
              <i
                className={`icon-b font-s ${twitterError && 'icon-disabled'}`}
                aria-hidden="true"
                onClick={() => submitLink('twitter')}
              >
                confirm
              </i>
            ) : (
              <i
                className="icon-b font-s"
                aria-hidden="true"
                onClick={setEditLinktwitter}
              >
                change
              </i>
            )}
          </div>
          {twitterError.length > 0 && (
            <span className="error">{twitterError}</span>
          )}
          <div
            className="flex form__input-wrapper"
            style={{ position: 'relative' }}
          >
            <img className="pr-1" src={soundcloud} alt="icon" />
            <input
              className=""
              type="text"
              name="facebook"
              readOnly={!editLinksoundcloud}
              defaultValue={newLinks.map((url) => url.soundcloud).join('')}
              onChange={(e) => hadleChange(e, 'soundcloud')}
              onBlur={(e) => prepareData(e, 'soundcloud')}
            />
            {editLinksoundcloud ? (
              <i
                className={`icon-b font-s ${soundcloudError && 'icon-disabled'}`}
                aria-hidden="true"
                onClick={() => submitLink('soundcloud')}
              >
                confirm
              </i>
            ) : (
              <i
                className="icon-b font-s"
                aria-hidden="true"
                onClick={setEditLinksoundcloud}
              >
                change
              </i>
            )}
          </div>
          {soundcloudError.length > 0 && (
            <span className="error">{soundcloudError}</span>
          )}
        </div>
      )}
    </div>
  )
}

export default SocialMedia
