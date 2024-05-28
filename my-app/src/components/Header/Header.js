import React from 'react'
import './Header.scss'

const Header = ({ title, subheading, icon, handleClick, className }) => (
  <div className={`header ${className}`}>
    {icon && (
      <div className="header__icon" onClick={handleClick}>
        <img
          alt="logo-icon"
          src={icon}
        />
      </div>
    )}
    <h2 className="header__title">{title}</h2>
    <div className="header__subheading">{subheading}</div>
  </div>
)

export default Header
