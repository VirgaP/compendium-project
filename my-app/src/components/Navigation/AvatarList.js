import React from 'react'
import userWhite from '../../assets/svg/user-white.svg'
import Avatar from './Avatar'


const AvatarList = (props) => {

    const data = props.props.pagesData
    const pageId = props.props.pageUuid || ''
 
    return (
        <>
        {data.length > 1 ? data.map(item => {
            const cardProps={
                uuid: item.uuid,
                profilePhotoURL: item.profilePhotoURL,
                link: 'page/'+item.uuid,
                type: item.type
            }
            if(cardProps.uuid != pageId){
            return <Avatar key ={item.uuid } {...cardProps} />
            }
        }) : <span>add another page</span>}
    </>
    )
}

export default AvatarList
