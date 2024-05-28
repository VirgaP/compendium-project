import React from 'react'
import ContentLoader from "react-content-loader"

const EventSkeletonLoader = (props) => {
    return (
        <>
        <div className="desktop-only" style={{marginLeft: '170px', marginTop: '60px'}}>
        <ContentLoader 
            speed={2}
            width={1200}
            height={650}
            viewBox="0 0 1200 650"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
            >

            <rect x="10" y="10" rx="0" ry="0" width="1000" height="300" />
            <rect x="10" y="335" rx="3" ry="3" width="950" height="12" /> 

            <rect x="10" y="385" rx="3" ry="3" width="150" height="6" /> 

            <rect x="10" y="415" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="430" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="445" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="460" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="475" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="490" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="505" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="520" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="535" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="550" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="565" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="580" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="595" rx="3" ry="3" width="450" height="6" /> 
            <rect x="10" y="610" rx="3" ry="3" width="450" height="6" /> 

            {/* right column */}
            <rect x="550" y="385" rx="3" ry="3" width="450" height="150" /> 
            <rect x="550" y="555" rx="3" ry="3" width="430" height="6" /> 
            <rect x="550" y="595" rx="3" ry="3" width="250" height="6" /> 
            <rect x="550" y="610" rx="3" ry="3" width="250" height="6" /> 
            
        </ContentLoader>  
        </div>
         <div className="mobile-only" style={{marginLeft: '20px', marginRight: '20px', marginTop: '30px'}}>
         <ContentLoader 
             speed={2}
             width={400}
             height={760}
             viewBox="0 0 400 760"
             backgroundColor="#f3f3f3"
             foregroundColor="#ecebeb"
             {...props}
             >

            <rect x="10" y="10" rx="0" ry="0" width="360" height="200" />

            <rect x="10" y="240" rx="3" ry="3" width="360" height="10" /> 

            <rect x="10" y="270" rx="0" ry="0" width="360" height="140" />
            <rect x="10" y="420" rx="3" ry="3" width="200" height="6" /> 

            <rect x="10" y="460" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="480" rx="3" ry="3" width="360" height="6" /> 

            <rect x="10" y="510" rx="3" ry="3" width="360" height="3" /> 
            <circle cx="50" cy="560" r="40" />
            <rect x="120" y="540" rx="3" ry="3" width="260" height="8" /> 
            <rect x="120" y="560" rx="3" ry="3" width="260" height="6" /> 
            <rect x="120" y="580" rx="3" ry="3" width="260" height="6" /> 
            <rect x="10" y="610" rx="3" ry="3" width="360" height="3" /> 

            <rect x="10" y="640" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="655" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="670" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="685" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="700" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="715" rx="3" ry="3" width="360" height="6" /> 

         </ContentLoader>  
         </div>
         </>
    )
}

export default EventSkeletonLoader
