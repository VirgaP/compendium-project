import React from 'react'
import useOnclickOutside from 'react-cool-onclickoutside'
import '../../assets/scss/utils/_sidenav.scss'


const HamburgerSideNav = () => {
      /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0"
   let homePage = document.getElementById("homeColLeft")
   if(homePage){
    homePage.classList.remove('under')
   }

  }

  const ref = useOnclickOutside(() => {
    closeNav()
  })

    return (
        <div id="mySidenav" className="sidenav" ref={ref}>
            <div className="sidenav__inner-wrapper">
                <a className="closebtn" onClick={()=>{closeNav()}}>&times;</a>
                <a href="/terms-and-conditions">terms and conditions</a>
                <a href="/privacy-policy">privacy policy</a>
                <a href="/about">about</a>
            </div>
        </div>
    )
}

export default HamburgerSideNav
