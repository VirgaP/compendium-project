import React, {useEffect} from 'react'
import MainContainer from '../../components/Layout/MainContainer'
import Header from '../../components/Header/Header'

const ThankYou = () => {
    useEffect(() => {
        const sidebar = document.getElementById('sidebar')
        sidebar.style="display:none"
    })

    return (
        <MainContainer>
            <section className="page half-width-lg mx-auto center column justify">
            <Header title={'Thank you!'} subheading={'We have sent you a confirmation email'} className={'jusitify'}/>
            </section>
        </MainContainer>
    )
}

export default ThankYou
