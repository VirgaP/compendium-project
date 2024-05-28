import React from 'react'

const Header = ({ title, subtitle }) => (
  <div className="form-header__container">
    <h3 className="form-header__title">{title}</h3>
    <h4 className="form-header__subtitle">{subtitle}</h4>
  </div>
)

export default Header
