import React from 'react'
import { withRouter } from 'react-router-dom';

import './Layout.scss'

const MainContainer = ({ children }) => (
  <main className="main-container">{children}</main>
)

export default withRouter(MainContainer)
