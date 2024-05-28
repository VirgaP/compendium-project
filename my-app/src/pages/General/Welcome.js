import React,{useEffect} from 'react'
import CookieConsent from "react-cookie-consent"
import MainContainer from '../../components/Layout/MainContainer'
import Header from '../../components/Header/Header'
import InstallPWA from '../../components/Elements/InstallPWA'
import Spacer from '../../components/Layout/Spacer'
import logo from '../../assets/svg/logo-animated.svg'

const Welcome = (props) => { 
    
    useEffect(() => {
        const explorePage = location.pathname.match(/^\/explore/) ? true : false
        let effect = true
        const sidebar = document.getElementById('sidebar')
        if(!explorePage){
            // sidebar.style="display:none"
        }
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if(currentUser){
            props.history.push('/explore')
        }
        return () => {
            effect= false
        }
    }, [])

        return(
        <MainContainer>
            <CookieConsent
                location="bottom"
                buttonText="agree"
                cookieName="arrticeCookiesConsent"
                style={{ background: "#7245B2" , fontSize: "12px"}}
                buttonStyle={{ color: "black", background:"FAFAFA", fontSize: "14px"}}
                expires={150}
                >
                    This sites uses cookies for essential functions to improve user experience. {" "}
                <span style={{ fontSize: "12px", cursor: 'pointer' }}>Read more in our <a href="/privacy-policy" target="blank">Privacy Policy</a> page.</span>
            </CookieConsent>
            <section className="page half-width-lg mx-auto center justify welcome">
            <Header 
            icon={logo} 
            title={'Welcome'} 
            subheading='Arttice is a platform for networking - mapping cultural players, providing a tool for contemporary artists, organisations and the culture curious to explore, discover, connect and collaborate.'
            className={'jusitify'}/>
            <div className="mt-2">
                <a href='/explore' className="btn-secondary quarter-width-lg m-auto">enter</a>
            </div>
            <br/>
            <br/>
            <p className="rte mb-1" style={{"text-align":"justify", "text-justify":"inter-word", "margin":"15px"}}>
            With Arttice we want to create a free tool that helps artists and organisations of all disciplines find each other and be found by the public. We want the public to find new and interesting content around in the culture scene. 
            </p>
            <br/>
            <p className="rte mb-1" style={{"text-align":"justify", "text-justify":"inter-word", "margin":"15px"}}>
            Content in Arttice is added by the creators themselves by issuing invitations to other creators.  Therefore fostering a type of openness for the self-curated cultural content.  If you are an artist or an organisation, join us and invite others and contribute to the idea! By joining you are part of the seed of the community we want to sow for this network to have relevant art and culture.
            </p>
            <br/>
            <p className="rte mb-1" style={{"text-align":"justify", "text-justify":"inter-word", "margin":"15px"}}>
            Arttice is currently in its version 2.1.beta. We are continuously working on improving and welcome bug and feature-request <a href="https://github.com/IdeasBlockLT/Arttice-project/issues">reports</a>
            </p>
            <InstallPWA/>
            </section>
        </MainContainer>
    )
}

export default Welcome
