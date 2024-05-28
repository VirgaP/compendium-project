import React, { useEffect, useState } from 'react'

import style from '../../assets/scss/utils/_fade.scss'

const Fade = ({ show, children }) => {
  const [render, setRender] = useState(show)

  useEffect(() => {
    if (show) setRender(true)
  }, [show])

  const onAnimationEnd = () => {
    if (!show) setRender(false)
  }

  return (
    render && (
      <div
        className="animated"
        style={{ animation: `${show ? 'fadeInDown' : 'fadeOutUp'} 1s` }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  )
}

export default Fade
