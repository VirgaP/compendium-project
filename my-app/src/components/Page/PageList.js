import React, {useState, useEffect, Children, isValidElement, cloneElement} from 'react'
import page from '../../services/page.service'
import Spinner from '../Elements/Spinner'
import axios from 'axios'

const PageList = ({userPages, pageUuid , children}) => {
    const [isLoading, setIsLaoding] = useState(true)
    const [pagesData, setPagesData] = useState([])

    const userPagesIds = userPages ?  Object.keys(userPages).map(key => {
        return userPages[key].contentUUID
    }) : null

    useEffect(() => {
        let effect = true;
            const source = axios.CancelToken.source()
            for (let i = 0; i < userPagesIds.length; i++) {
                i+1 === userPagesIds.length && ( setIsLaoding(false) )
                async function fetchData() {
                    const request = await page.getPageWithToken(userPagesIds[i])
                    if(request.status !==400){
                        setPagesData(prevState => [...prevState, request])
                    }
                }
            fetchData()
            }
            setIsLaoding(false)
        return () => {
            setIsLaoding(false)
            effect = false
            source.cancel('Component got unmounted')
        } 
      }, [userPagesIds.join(",")])

    const props = { children, pagesData, pageUuid, isLoading}

    const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
        return cloneElement(child, { props })
    }
    return child
    })

     return (
        <div>
            {childrenWithProps}
        </div>
    )
}

export default PageList
