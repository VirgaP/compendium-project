import React from 'react'
import { useNot } from 'react-hooks-helper'
import MainContainer from '../../components/Layout/MainContainer'
import PagePreview from './PagePreview'
import PageEdit from './UserPage/EditPage'
import PageSidebar from '../Navigation/PageSidebar'
import MobileTopMenu from '../Navigation/MobileTopMenu'
import ViewPagesEvents from '../Navigation/ViewPagesEvents'
import PageList from './PageList'
import Avatars from '../Navigation/AvatarList'

const PageWrapper = ({props, requestData, pageUuid, owner }) => {
    const [edit, setEdit] = useNot(false)

    const currentUserPages = JSON.parse(localStorage.getItem('userPages'))
    
    const userPages =  currentUserPages ?  currentUserPages.reduce((acc, page) => {
        if (page.contentType === 'page') {
          acc.push(page)
        }
        return acc
      }, []) : []

      const createPage =()=>{
        props.history.push({
            pathname: `/create-page`,
            state: {
             pageId: requestData.id,
            },
          })
      }

      return (
        <div>
            <MainContainer>
                {owner && <PageSidebar pageUuid={pageUuid} userPages={userPages}/>}
                {owner ? <MobileTopMenu userPages={userPages} pageUuid={pageUuid} events={requestData.events} action={createPage} owner={owner} setEdit={setEdit} edit={edit}/>: <ViewPagesEvents />}
                {!edit 
                ? (<PagePreview  props={props} requestData={requestData.data} pageUuid={pageUuid} action={setEdit} owner={owner} events={requestData.events} />)
                : (<PageEdit props={props} requestData={requestData.data} pageUuid={pageUuid}  action={setEdit}/>)
                }
                {/* <PagePreview  props={props} requestData={requestData.data} pageUuid={pageUuid} action={setEdit} owner={owner} events={requestData.events} /> */}
            </MainContainer>
        </div>
    )
}

export default PageWrapper
