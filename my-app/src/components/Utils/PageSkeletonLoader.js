import React from 'react'
import ContentLoader from "react-content-loader"

const PageSkeletonLoader = (props) => {
    return (
        <>
        <div className="desktop-only" style={{marginLeft: '170px', marginTop: '60px'}}>
        <ContentLoader 
            speed={2}
            width={1200}
            height={580}
            viewBox="0 0 1200 580"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
            >

            <circle cx="60" cy="60" r="60" />

            <rect x="140" y="20" rx="3" ry="3" width="220" height="9" /> 
            <rect x="140" y="45" rx="3" ry="3" width="220" height="6" /> 
            <rect x="140" y="66" rx="3" ry="3" width="220" height="6" /> 

            {/* right column */}
            <rect x="670" y="8" rx="3" ry="3" width="350" height="60" /> 
            <rect x="670" y="88" rx="3" ry="3" width="350" height="4" /> 



            <rect x="10" y="130" rx="3" ry="3" width="550" height="6" />
            <rect x="10" y="150" rx="3" ry="3" width="550" height="6" />

            {/* <rect x="120" y="130" rx="3" ry="3" width="69" height="6" />
            <rect x="220" y="130" rx="3" ry="3" width="79" height="6" /> */}

            {/* <rect x="10" y="145" rx="3" ry="3" width="120" height="6" /> 
            <rect x="150" y="145" rx="3" ry="3" width="100" height="6" />  */}

            <rect x="10" y="170" rx="0" ry="0" width="550" height="150" />

            <rect x="10" y="340" rx="3" ry="3" width="550" height="6" /> 
            <rect x="10" y="380" rx="3" ry="3" width="150" height="6" /> 
            <rect x="10" y="395" rx="3" ry="3" width="150" height="6" /> 


            <rect x="10" y="415" rx="3" ry="3" width="550" height="6" /> 
            <rect x="10" y="430" rx="3" ry="3" width="550" height="6" /> 
            <rect x="10" y="445" rx="3" ry="3" width="550" height="6" /> 
            <rect x="10" y="460" rx="3" ry="3" width="550" height="6" /> 
            <rect x="10" y="475" rx="3" ry="3" width="550" height="6" /> 
            <rect x="10" y="490" rx="3" ry="3" width="550" height="6" /> 

            <rect x="10" y="520" rx="0" ry="0" width="550" height="150" />
        </ContentLoader>  
        </div>
         <div className="mobile-only" style={{marginLeft: '20px', marginRight: '20px', marginTop: '50px'}}>
         <ContentLoader 
             speed={2}
             width={400}
             height={760}
             viewBox="0 0 400 760"
             backgroundColor="#f3f3f3"
             foregroundColor="#ecebeb"
             {...props}
             >
            <circle cx="50" cy="50" r="50" />

            <rect x="120" y="8" rx="3" ry="3" width="160" height="10" /> 
            <rect x="120" y="45" rx="3" ry="3" width="220" height="6" /> 
            <rect x="120" y="66" rx="3" ry="3" width="220" height="6" /> 

            {/* <rect x="10" y="130" rx="3" ry="3" width="85" height="6" />
            <rect x="120" y="130" rx="3" ry="3" width="69" height="6" />
            <rect x="220" y="130" rx="3" ry="3" width="79" height="6" /> */}

            <rect x="10" y="130" rx="3" ry="3" width="320" height="6" />
            <rect x="10" y="145" rx="3" ry="3" width="320" height="6" /> 

            <rect x="10" y="170" rx="0" ry="0" width="360" height="150" />

            <rect x="10" y="340" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="380" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="395" rx="3" ry="3" width="360" height="6" /> 


            <rect x="10" y="415" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="430" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="445" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="460" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="475" rx="3" ry="3" width="360" height="6" /> 
            <rect x="10" y="490" rx="3" ry="3" width="360" height="6" /> 

            <rect x="10" y="520" rx="0" ry="0" width="360" height="200" />
         </ContentLoader>  
         </div>
         </>
    )
}

export default PageSkeletonLoader
