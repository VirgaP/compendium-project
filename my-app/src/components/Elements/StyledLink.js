import React from 'react'
import { Link } from 'react-router-dom'

const StyledLink = (linkProps) => (
  
  <Link to={{ pathname: linkProps.link, state: linkProps.pageId }}>
    <div className="flex evenly cursor-p">
      {linkProps.icon1 && <img src={linkProps.icon1} alt="icon" />}
      <div className="rte">{linkProps.text && linkProps.text}</div>
      {linkProps.icon2 && (
        <img className="icon-plus cursor-p" src={linkProps.icon2} alt="icon" />
      )}
    </div>
  </Link>
)

export default StyledLink
