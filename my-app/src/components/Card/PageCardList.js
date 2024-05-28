import React, {useState, useEffect} from 'react'
import Card from './Card'
import Spinner from '../Elements/Spinner'

const PageCardList = (props) => {
    const data = props.props.pagesData
   
    return (
        <div className="profile__cardlist-container">
            {data.length > 0
            ? data.map(item => {
                const cardProps={
                    uuid: item.uuid,
                    name: item.name,
                    avatar: item.profilePhotoURL,
                    tagline: item.shortDescription,
                    type: item.type
                }
                return <Card key ={item.uuid } {...cardProps} />
            }) 
            : <div className="rte center">It appears you don't have any pages yet</div>
        }
        </div>
    )
}

export default PageCardList
