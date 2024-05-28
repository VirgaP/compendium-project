import React, { Component } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import {isEmpty} from 'lodash'
import UserPage from '../../components/Page/PageWrapper'
import page from '../../services/page.service'
import NotFound from '../General/NotFound'
import PageSkeletonLoader from '../../components/Utils/PageSkeletonLoader'
import func from '../../utils/functions'


const userLoggedIn = func.getCurrentUser()
export default class Page extends React.Component  {
  _isMounted = false;
    constructor(props) {
      super(props)

      this.state = {
        props: props,
        data : props.location.state ? props.location.state.request : null,
        pageUuid: props.match ? props.match.params.slug : '',
        owner: false,
        pageEvents: null,
        page: {
          events: [],
          data: props.location.state ? props.location.state.request : null,
        },
        isLoading: false
      }
    }

    getPageData = () => userLoggedIn ? page.getPageWithToken(this.state.pageUuid) : page.getPage(this.state.pageUuid)
    // getPageData = () => page.getPageWithToken(this.state.pageUuid)
    getPageEvents = () => page.getPageEvents(this.state.pageUuid)

    async componentDidMount() {
      let admins =[]
      this._isMounted = true;
      // const source = axios.CancelToken.source()

      try {
        this.setState({isLoading : true})
        
        const [pageData, pageEvents] = await axios.all([ this.getPageData(), this.getPageEvents()])
              
        if (this._isMounted && pageData.status !==400) {  
          this.setState(prevState => ({
            page: {
              ...prevState.page,
              data: pageData,
              events: pageEvents
            }
          }));
        }
          Object.keys(pageData.admins).map(key => {
            let adminId = pageData.admins[key].uuid
            return admins.push(adminId)
          })
          this.setState({isLoading : false})
        }
        catch (err) {
            console.log(err)
      }finally{
        this.setState({isLoading : false})
      }
      const user = localStorage.getItem('currentUser')
      const userId = user && JSON.parse(user).uuid


      if(admins.includes(userId)){
        this.setState({owner: true})
      }
      // source.cancel('Component got unmounted')
    }
    render(){
        return(
          <>
          {!this.state.isLoading ?
          <>
            <ToastContainer />
            {this.state.page.data ? <UserPage props={this.state.props} requestData={this.state.page} pageUuid={this.state.pageUuid} owner={this.state.owner}/> : <NotFound/>}
            </>
            : <PageSkeletonLoader/>
          }
          </>
        )
    }
}