
import * as React from 'react'
import * as userClient from './userClient'
import {useAuth} from './authContext'

const UserContext = React.createContext()
UserContext.displayName = 'UserContext'

function userReducer(state, action) {
  switch (action.type) {
    case 'start update': {
      return {
        ...state,
        user: {...state.user, ...action.updates},
        status: 'pending',
        storedUser: state.user,
      }
    }
    case 'finish update': {
      return {
        ...state,
        user: action.updatedUser,
        status: 'resolved',
        storedUser: null,
        error: null,
      }
    }
    case 'fail update': {
      return {
        ...state,
        status: 'rejected',
        error: action.error,
        user: state.storedUser,
        storedUser: null,
      }
    }
    case 'reset': {
      return {
        ...state,
        status: null,
        error: null,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function UserProvider({children}) {
  const {user} = useAuth()
  const [state, dispatch] = React.useReducer(userReducer, {
    status: null,
    error: null,
    storedUser: user,
    user,
  })
  const value = [state, dispatch]
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return context
}

// got this idea from Dan and I love it:
// https://twitter.com/dan_abramov/status/1125773153584676864
async function updateUser(dispatch, user, updates) {
  dispatch({type: 'start update', updates})
  try {
    const updatedUser = await userClient.updateUser(user, updates)
    dispatch({type: 'finish update', updatedUser})
    return updatedUser
  } catch (error) {
    dispatch({type: 'fail update', error})
    return Promise.reject(error)
  }
}

export {UserProvider, useUser, updateUser}