/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const ImageUploader = ({ callback, defaultImage, close }) => {
  const [file, setFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()

    let message = ''
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      message = 'Please upload jpg, jpeg, png or gif formats'
    }
    const uploaderData = { file, url: imagePreviewUrl, error: message }
    callback(uploaderData)
  }

  const handleImageChange = (e) => {
    e.preventDefault()

    const reader = new FileReader()
    const fileUploaded = e.target.files[0]

    reader.onloadend = ({}) => {
      setFile(fileUploaded)
      setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(fileUploaded)
  }

  return (
    <div>
      <div className="avatar-wrapper">
      {imagePreviewUrl ? (
        <img src={imagePreviewUrl} className="profile-avatar" alt="avatar" />
      ) : (
        <img src={defaultImage} className="default-avatar" alt="avatar" />
      )}
      </div>
      <div className="avatar-btn-wrapper">
        <div className="fileContainer">
          <i className="icon cursor-p">
            Upload
            <input
              type="file"
              onChange={handleImageChange}
              className="no-border"
            />
          </i>
        </div>
        <div
          className={`${
            typeof imagePreviewUrl === 'undefined' ? 'hidden' : ''
          }`}
        >
          <i className="cursor-p" onClick={handleSubmit} aria-hidden="true">
            Save
          </i>
        </div>
        <div>
          <i onClick={close} className="close icon cursor-p" aria-hidden="true">
            Close
          </i>
        </div>
      </div>
    </div>
  )
}

export default ImageUploader
