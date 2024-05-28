import React, {useState, useEffect} from 'react'
import Card from '../Event/EventCard'
import Spinner from '../Elements/Spinner'

const ResultListEvents = ({data, action, showBtn, pointSelected}) => {

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
            {data.length > 0
            ? data.map(item => {
                const cardProps={
                    uuid: item.uuid,
                    title: item.name,
                    imageURL: item.profilePhotoURL,
                    date: item.eventSchedule && item.eventSchedule['datetime'],
                    endDate: item.eventSchedule && item.eventSchedule['endDate']
                }
                return <Card key ={item.uuid } {...cardProps} />
            }) 
            : <div className="rte center py-2">0 events found</div>
        }
         <div className="center">
                {showBtn && <button className="btn-secondary load-more" onClick={()=>action()}>load more</button>}
            </div>
        </div>
    )
}

export default ResultListEvents