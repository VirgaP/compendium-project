import React from 'react'
import { Link, animateScroll as scroll } from "react-scroll";

import PageList from '../Page/PageList'
import Avatars from '../Navigation/AvatarList'
import StickyContainer from '../Elements/StickyContainer'
import plus from '../../assets/svg/plus.svg'
import calendar from '../../assets/svg/calendar-white.svg'


const MobileTopMenu = ({userPages, pageUuid, events , action, owner, setEdit, edit}) => (
    <div className="mobile-only mobile-top-menu">
    {owner && !edit &&(<div className="pb-2"></div>)}
    {owner && (<div id="first-menu">
        <div className="row menu-row-wrapper">           
            <div className="menu-icon-wrapper column"><img  className="p-1" onClick={action} src={plus} alt="plus icon"/></div>
            <div className="page__sidebar-pages-list column"> 
                <div className="page__sidebar-pages-list-wrapper">
                <PageList userPages={userPages} pageUuid={pageUuid}>
                    <Avatars/>
                </PageList>
                </div>
            </div>
        </div> 
        <div className="divider" style={{marginTop: '65px', padding: '.2rem'}}></div>
    </div>)}
   
    {owner && !edit && (
    <div id="third-menu">
        <span onClick={()=>{setEdit()}} className="bolder fl-r pr-2 font-m m-1 cursor-p">edit</span>
    </div>
    )}
    
    </div>
)

export default MobileTopMenu
