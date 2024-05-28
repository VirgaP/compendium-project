import React from 'react'
import { Link, animateScroll as scroll } from "react-scroll"
import calendar from '../../assets/svg/calendar-white.svg'

const ViewPagesEvents = () => {
    return (
        <div className="mobile-only mobile-top-menu">
        <div id="second-menu">
                <Link to="page-events" 
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                >
                <div className="menu-row cursor-p">
                    <div className="menu-column">
                        <img src={calendar} alt="calendar icon"/>
                    </div>
                    <div className="menu-column">
                        <span>view page events</span>
                    </div>
                </div>
            </Link> 
        </div>
    </div>
    )
}

export default ViewPagesEvents
