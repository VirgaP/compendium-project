import React, {useState, useEffect} from 'react'
import { scroller } from "react-scroll"
import Card from '../Card/Card'
import Spinner from '../Elements/Spinner'

const ResultList = ({data, action, showBtn, pointSelected}) => {

    function scrollToElement(parentElement, childElement) {
        parentElement.scrollTop = childElement.offsetTop - parentElement.offsetTop
        childElement.classList.add('active-point')
    }

   useEffect(() => {
       let target =  document.getElementById(`${pointSelected}`)
       let container = document.getElementById('page-result-container')

       if(target){
        let x = document.getElementsByClassName("active-point");
        if(x.length > 0) { x[0].classList.remove("active-point"); }
        scrollToElement(container, target)
       }
   }, [pointSelected])

    return (
        <div className="profile__cardlist-container" id="page-result-container">
            <>{data.length > 0
            ? data.map(item => {
                const cardProps={
                    uuid: item.uuid,
                    name: item.name,
                    avatar: item.profilePhotoURL,
                    tagline: item.shortDescription,
                    type: item.pageType,
                }
                return <Card key ={item.uuid } {...cardProps}/>
            }) 
            : <div className="rte center py-2">0 pages found</div>
            }</>
            <div className="center load-more">
                {showBtn && <button className="btn-secondary" onClick={()=>action()}>load more</button>}
            </div>
            
        </div>
    )
}

export default ResultList