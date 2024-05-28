import React, {useState, useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'
import StyledLink from '../Elements/StyledLink'
import UserPagesList from '../Navigation/UserPageList'
import PageList from '../Page/PageList'
import Avatars from './AvatarList'
import HamburgerMenu from './HamburgerSideNav'
import hook from '../../utils/hook'
import map from '../../assets/svg/map.svg'
import user from '../../assets/svg/user.svg'
import hamburger from '../../assets/svg/hamburger.svg'
import plus from '../../assets/svg/plus-sign.svg'

import './Navigation.scss'


const PageSidebar = ({children, pageUuid }) => {
    const { width } = hook.useWindowSize()

    const menuWidth = width > 600 ? '230px' : '100%'
    const homeClass = location.pathname.match(/^\/explore/) ? "active-url" : "";
    const profileClass = location.pathname.match(/^\/profile/) ? "active-url" : "";
    /* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = menuWidth
    let homePage = document.getElementById("homeColLeft")
    if(homePage){
        homePage.classList.add('under')
    }
}
  const currentUserPages = JSON.parse(localStorage.getItem('userPages'))
    
  const userPages =  currentUserPages ?  currentUserPages.reduce((acc, page) => {
      if (page.contentType === 'page') {
        acc.push(page)
      }
      return acc
    }, []) : []


    return (
        <>
        <div className="sticky-wrapper">
            <div className="page__sidebar-container" id="sidebar">
                <div className="page__sidebar-nav">
                    <Link to="/explore">
                        <div className={`sidebar-map ${homeClass} center`}>
                            <img className="map-icon" src={map} alt="map icon" />
                        </div>
                    </Link>
                    
                    <Link to="/profile">
                        <div className={`sidebar-user ${profileClass} center`} >
                            <img className="user-icon" src={user} alt="user icon" />
                        </div>
                    </Link>
                        <div id="hamburger-icon" className="center cursor-p">
                            <img className="sidebar-hamburger " src={hamburger} alt="menu icon" onClick={()=>{openNav()}}/>
                        </div>
                    <HamburgerMenu/>  
                </div> 
                {/* <div className="page__sidebar-pages-list desktop-only"> 
                    <div className="page__sidebar-pages-list-wrapper">
                        <PageList userPages={userPages} pageId={pageUuid}>
                            <Avatars/>
                        </PageList>
                    </div> 
                </div>         */}
            </div>
        </div>
        {children}
        </>
    )
}

export default withRouter(PageSidebar)
