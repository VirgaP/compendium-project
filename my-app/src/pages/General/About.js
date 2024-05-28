import React from 'react'
import MainContainer from '../../components/Layout/MainContainer'
import ideasBlockLogo from '../../assets/svg/ideasblock_logo.svg'
import lktLogo from '../../assets/svg/LKT_logo.png'


const About = () => {
    return (
        <MainContainer>
            <div className="page__container pt-2 general">
                <div className="pb-2">
                    <h1 className="">WHAT WE ARE</h1>
                    <p className="rte">
                    Arttice is a platform for networking - mapping cultural players, providing a tool for contemporary artists, organisations and the culture curious to explore, discover, connect and collaborate. 
                    </p>
                    <h1 className="">OUR MISSION</h1>
                    <p className="rte">
                    Arttice is an independent platform created for art scene collaboration, where diverse creative fields can interact, broadening perspectives of culture and arts, generating opportunities for the creators and the public. 
                    </p>
                    <h1 className="">OUR VISION</h1>
                    <p className="rte">
                    To become a worldwide cultural network empowering artistic movement.
                    </p>
                </div>
                <h3 className="bolder">For Individual Creators and Field Professionals</h3>
                <p className="rte">
                This platform is open to all fields of arts and culture, whether you are a visual artist, musician, writer, dancer, designer, cultural manager, curator - you name it. It aims to provide professionals working in the field of culture with more visibility, opportunities to exchange ideas, get inspired, find open calls and work opportunities, connect and collaborate with one another, promote yourself and your works, as well as reach and co-operate with cultural organisations and venues. 
                </p>
                <h3 className="bolder">For Cultural Organisations and Venues</h3>
                <p className="rte">
                Arttice forms a database that can serve as a research tool to follow the dynamics of a culture scene. This is a place to discover and reach new creatives and art scene professionals, interact with established ones, promote your institution, share and gather information directly from artists or public, inform about your activities happening in your organisation as well as spread information about grants, competitions, projects, etc.  
                </p>
                <h3 className="bolder">For the Public</h3>
                <p className="rte">
                For the culture curious Arttice is a tool to get information about the culture and art scene of the chosen location, discover and follow artists, find new creative spaces and events. To dive into the stunning art and culture world.
                </p>
                <p>. . . </p>
                <p className="rte mb-1">
                It is free and open for anyone to explore.<br/> 
                To register as an artist or organisation at Arttice you will need an invitation from a member. If you don’t have one and would like to join, <a href="/request-invitation">complete this form</a>

                </p>
                <br/>
              
                <p className="rte mb-1">Contact us: <b>contact@arttice.com</b></p>

                <div className="py-1 align-vertical">
                    <div>
                        <div className="page__social-container" style={{justifyContent:'left'}}>
                            <div className="flex social-media-row">
                                <span>
                                    <a href="https://www.facebook.com/104507344886320" target="blank">
                                        <img src="/static/media/facebook.3bca0d6b.svg" alt="icon"/>
                                    </a>
                                </span>
                            </div>
                            <div className="flex social-media-row">
                                <span>
                                    <a href="https://www.instagram.com/arttice.platform/" target="blank">
                                        <img src="/static/media/instagram.70ea3cbc.svg" alt="icon"/>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <br/>
                <div className="py-1 flex">
                    <span className="rte pr-2" style={{lineHeight: '1.5rem'}}>supported by:</span>
                    <span className="rte pl-1" style={{lineHeight: '1.5rem'}}>created by:</span>
                </div>
                <div className="py-1 flex">
                    <a className="pr-2" href="https://www.ltkt.lt/" target="blank"><img src={lktLogo} alt="LKT logo" width="100"/></a>
                    <a href="https://ideas-block.com/" target="blank"><img src={ideasBlockLogo} alt="ideas block logo" width="100"/></a>
                </div>
                <br/>
                <br/>
                <p className="rte mb-1">
                Consider donating to Arttice:
                </p>
                <form action="https://www.paypal.com/donate" method="post" target="_top">
                    <label className="rte mb-1">With PayPal:</label><br/>
                    <input type="hidden" name="hosted_button_id" value="AWBASQSGLUDRW" />
                    <input type="image" src="https://test.arttice.com/arttice-logo/donate_paypal_SVG.svg" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" style={{"width":"200px"}}/>
                    <img alt="" border="0" src="https://www.paypal.com/en_LT/i/scr/pixel.gif" width="1" height="1" />
                </form>
                <br/>
                <label className="rte mb-1">With Bitcoin:</label>
                <br/>
                <div className="rte mb-1">
                wallet address: bc1qtrs8dth5na56l5saju9hm0frc6qhxpp239nwqp
                </div>
                <br/>
                <br/>
                <hr/>
                <p className="rte mb-1">
                Arttice version: 2.1.beta
                </p>
                <p className="rte mb-1">
                Please report problems with the Bug tracking system using <a href="https://github.com/IdeasBlockLT/Arttice-project/issues">GitHub Issues</a>
                </p>
                
            </div>
        </MainContainer>
    )
}

export default About
