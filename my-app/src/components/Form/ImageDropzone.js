import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNot } from 'react-hooks-helper'
import upload from '../../assets/svg/uploader.svg'
import style from '../../assets/scss/elements/_dropzone.scss'

function ImageDropzone(props) {
  const [files, setFiles] = useState([])
  const [error, setImageError] = useState('')
  const [change, setChange] = useNot(false)
  const [uploaded, setUploaded] = useNot(false)
  const [saved, setSaved] = useNot(false)
  const allowedSize =  props.maxSize / 1000000

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    
    onDrop: (acceptedFiles) => {
      const isFileTooLarge =  acceptedFiles[0].size > props.maxSize;
      isFileTooLarge && setImageError('File is too large. Maximum allowed size 3 MB')
      !isFileTooLarge ? setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
        setUploaded(true),
        setImageError('')
      )
      : setImageError(`File is too large. Maximum allowed size ${allowedSize} MB`)
    },
  })

  const thumbs = files.map((file) => (
    <div className="" key={file.name}>
      <img className="image-responsive" src={file.preview} />
    </div>
  ))
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  const handleSubmitImage = () => {
    props.callback(files)
    setSaved(true)
  }

  const handleChange =()=>{
    setUploaded(false)
    setSaved(false)
  }

  const handleRemove = () => {
    setUploaded(false)
    setSaved(false)
  }

  return (
    <section className="dropzone__container">
      {!uploaded ? (
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className="dropzone__inner_wrapper">
            <span className="dropzone__icon">
              <img src={upload} alt="upload icon" />
            </span>
            <p className="dropzone__text">{!error ? (props.dropZoneText ? props.dropZoneText : 'add an image showcasing your work') : error}</p>
          </div>
        </div>
      ) : (
        <>
        <div>{thumbs}</div>
        </>
      )}
      {uploaded ? (
        <div>
          {!saved ? (
            <div className="dropzone__btn-wrapper">
              <div
                className="btn-secondary"
                disabled={!files.length > 0}
                onClick={handleSubmitImage}
              >
                Save
              </div>
            </div>
          ) : (
            <div className="dropzone__btn-wrapper">
              <button
                className="btn-secondary"
                type="submit"
                onClick={handleChange}
              >
                Change
              </button>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </section>
  )
}

export default ImageDropzone
