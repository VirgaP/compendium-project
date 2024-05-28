import React from 'react'
import ContentLoader from "react-content-loader"

const EventCardSkeleton = (props) => {
    return (
        <>
        <div className="desktop-only" style={{marginLeft: '20px', marginTop: '0px'}}>
        <ContentLoader 
            speed={2}
            width={525}
            height={230}
            viewBox="0 0 525 230"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
            >

            <rect x="5" y="10" rx="0" ry="0" width="480" height="10" />
            <rect x="5" y="35" rx="0" ry="0" width="240" height="120" />

            <rect x="260" y="50" rx="3" ry="3" width="180" height="8" /> 
            <rect x="260" y="70" rx="3" ry="3" width="180" height="8" /> 

            <rect x="260" y="105" rx="3" ry="3" width="230" height="50" /> 

            <rect x="5" y="175" rx="3" ry="3" width="500" height="2" /> 
            
        </ContentLoader>  
        </div>
         <div className="mobile-only" style={{marginLeft: '0px', marginRight: '0px', marginTop: '0px'}}>
         <ContentLoader 
             speed={2}
             width={340}
             height={160}
             viewBox="0 0 340 160"
             backgroundColor="#f3f3f3"
             foregroundColor="#ecebeb"
             {...props}
             >

            <rect x="5" y="10" rx="0" ry="0" width="320" height="10" />
            <rect x="5" y="35" rx="0" ry="0" width="200" height="100" />

            <rect x="220" y="40" rx="3" ry="3" width="120" height="8" /> 
            <rect x="220" y="60" rx="3" ry="3" width="120" height="8" /> 

            <rect x="220" y="100" rx="3" ry="3" width="230" height="35" /> 

            <rect x="5" y="145" rx="3" ry="3" width="340" height="2" /> 

         </ContentLoader>  
         </div>
         </>
    )
}

export default EventCardSkeleton
