import axios from 'axios'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(loginPayload),
  }

  try {
    dispatch({ type: 'REQUEST_LOGIN' })
    const response = await fetch(
      `${REACT_APP_API_URL}/auth/login`,
      requestOptions,
    )
    const data = await response.json()

    if (data.uuid) {
      requestOptions.body = { uuid: data.uuid, type: 'user' }
      const result = await getUserDetails('user', data.uuid)
      const user = await result.json()
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      localStorage.setItem('currentUser', JSON.stringify(user))
      return data
    }

    // if (data.user) {
    // 	dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    // 	localStorage.setItem('currentUser', JSON.stringify(data));
    // 	return data;
    // }

    dispatch({ type: 'LOGIN_ERROR', error: data.error })
    console.log(data.error)
    return data.error
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error })
    console.log(error)
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' })
  localStorage.removeItem('currentUser')
  localStorage.removeItem('token')
}

export async function registerUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  }

  try {
    dispatch({ type: 'REQUEST_REGISTER' })
    const response = await fetch(
      `${REACT_APP_API_URL}/auth/register`,
      requestOptions,
    )
    const data = await response.json()

    if (data.uuid) {
      dispatch({ type: 'REGISTER_SUCCESS', payload: data })
      const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid: data.uuid, type: 'user' }),
      }
      const user = await fetch(
        `${REACT_APP_API_URL}/content/getContent`,
        reqOptions,
      ).then((response) => response.json())
      localStorage.setItem('currentUser', JSON.stringify(user))
      return data
    }

    dispatch({ type: 'REGISTER_ERROR', error: data.error })
    console.log(data.error)
    return
  } catch (error) {
    dispatch({ type: 'REGISTER_ERROR', error })
    console.log(error)
  }
}

export function getUserDetails(type, uuid) {
  const requestOptions = {
    method: 'POST',
   
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
    // body: JSON.stringify(payload),
    body: JSON.stringify({
      type,
      uuid,
    }),
  }
  try {
    const response = fetch(
      `${REACT_APP_API_URL}/content/getByUUID`,
      requestOptions,
    )
    const data = response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
