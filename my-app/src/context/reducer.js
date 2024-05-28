import React, { useState, useReducer } from 'react'

const user = localStorage.getItem('currentUser')
// ? JSON.parse(localStorage.getItem('currentUser')).user
// : '';
const token = localStorage.getItem('currentUser')
// ? JSON.parse(localStorage.getItem('currentUser')).auth_token
// : '';

export const initialState = {
  user: '' || user,
  token: '' || token,
  isLoggedIn: false,
  loading: false,
  errorMessage: null,
}

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
        isLoggedIn: false,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false,
        isLoggedIn: true,
      }
    case 'LOGOUT':
      return {
        ...initialState,
        user: '',
        token: '',
        isLoggedIn: false,
      }
    case 'REQUEST_REGISTER':
      return {
        ...initialState,
        loading: true,
        isLoggedIn: false,
      }
    case 'REGISTER_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.auth_token,
        isLoggedIn: true,
        loading: false,
      }
    case 'REGISTER_EMAIL_SUCCESS':
      return {
        loading: false,
      }  
    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }
    case 'REGISTER_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default{
  AuthReducer,
  initialState
}
