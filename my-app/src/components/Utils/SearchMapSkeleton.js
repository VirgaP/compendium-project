import React from 'react'
import ContentLoader from "react-content-loader"

const SearchMapSkeleton = (props) => {
    return (
        <>
        <div className="desktop-only" style={{marginLeft: '150px', marginTop: '0px'}}>
        <ContentLoader 
            speed={2}
            width={1300}
            height={800}
            viewBox="0 0 1300 800"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
            >
            {/* <rect x="125" y="10" rx="0" ry="0" width="390" height="45" />        */}
            <rect x="600" y="0" rx="0" ry="0" width="690" height="800" />
            
        </ContentLoader>  
        </div>
         <div className="mobile-only" style={{marginLeft: '0px', marginRight: '0px', marginTop: '0px'}}>
         <ContentLoader 
             speed={2}
             width={500}
             height={310}
             viewBox="0 0 500 310"
             backgroundColor="#f3f3f3"
             foregroundColor="#ecebeb"
             {...props}
             >

            <rect x="0" y="0" rx="0" ry="0" width="450" height="310" />
         </ContentLoader>  
         </div>
         </>
    )
}

export default SearchMapSkeleton
