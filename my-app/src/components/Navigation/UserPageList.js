import React, {useState, useEffect} from 'react'
import Image from '../Form/Image'
import userWhite from '../../assets/svg/user-white.svg'
import page from '../../services/page.service'

const UserPageList = ({userPages, pageUuid}) => {
    const [isLoading, setIsLaoding] = useState()
    const [userPagesData, setUserPagesData] = useState([])

    const userPagesIds = userPages ?  Object.keys(userPages).map(key => {
        return userPages[key].contentUUID
    }) : null

    useEffect(() => {
        let effect = true;
        // const source = axios.CancelToken.source()
        setIsLaoding(true)
        for (let i = 0; i < userPagesIds.length; i++) {
            i+1 === userPagesIds.length ? setIsLaoding(false) : setIsLaoding(true)
            async function fetchData() {
                if(userPages[i].contentType === 'page' ){
                const request = await page.getPageWithToken(userPagesIds[i])
                setUserPagesData(prevState => [...prevState, request])
                }
            }
        fetchData()
        }
        setIsLaoding(false)
        return () => {
            effect = false
            // source.cancel('Component got unmounted')
        } 
      }, [])

    const userPagesAvatars = Object.keys(userPagesData).map(key => {
        //do not show currently viewed page
        if(userPagesData[key].uuid != pageUuid){
        const link = 'page/'+userPagesData[key].uuid
        return <a href={link.substring(5)} className="user-page-avatar">
           <div className="avatar-wrapper-sidebar">
           <Image
            url={userPagesData[key].profilePhotoURL || userWhite}
            className={`${
                userPagesData[key].profilePhotoURL
                ? 'profile-avatar-sidebar'
                : 'default-avatar-sidebar'
            }`}
            />
            </div>
        </a>
        }
    }) 
    return (
        <>
            {!isLoading ? <>{userPagesAvatars}</> : 'loading'}
        </>
    )
}

export default UserPageList
