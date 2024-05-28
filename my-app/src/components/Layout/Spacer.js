import React from 'react'

const Spacer = ({ className, img }) => (
  <div className={className}>
    {img && <img scr={img} className="img-responsive" />}
  </div>
)

export default Spacer
