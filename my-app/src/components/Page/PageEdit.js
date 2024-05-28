import React from 'react'
import MainContainer from '../../components/Layout/MainContainer'
import PageEdit from './UserPage/EditPage'
import NotFound from '../../pages/General/NotFound'

const PageEdit = ({props, requestData, pageUuid, owner }) => {
    return (
        <MainContainer>
            {owner ? <PageEdit props={props} requestData={requestData.data} pageUuid={pageUuid}/> : <NotFound/>}
        </MainContainer>
    )
}

export default PageEdit
