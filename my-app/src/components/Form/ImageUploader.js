import React, { useState } from 'react'

const ImageUploader = ({ callback, defaultImage }) => {
  const [file, setFile] = useState()
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
      {imagePreviewUrl ? (
        <img src={imagePreviewUrl} className="image-responsive" />
      ) : (
        <img src={defaultImage} className="image-responsive" />
      )}
      <div className="avatar-btn-wrapper">
        <label className="fileContainer">
          Upload
          <input
            type="file"
            onChange={handleImageChange}
            className="no-border"
          />
        </label>
        <button
          disabled={typeof imagePreviewUrl === 'undefined'}
          type="submit"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default ImageUploader
