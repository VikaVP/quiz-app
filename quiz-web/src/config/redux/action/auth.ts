import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { IS_LOADING_LOGIN, IS_LOADING_REGISTER, SET_USER } from '../types'
import { AnyAction } from 'redux'
import { toast } from 'react-toastify'
import axios from 'axios'

export const setUser = (data: any): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({
      type: SET_USER,
      payload: data,
    })
  }
}

export const registerAccount = (email: string, password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({
      type: IS_LOADING_REGISTER,
      payload: true,
    })
    try {
      const data = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        email, password,
      })

      if (data) {
        toast.success(
          'Success Register account!',
          { theme: 'colored' },
        )
        dispatch({
          type: IS_LOADING_REGISTER,
          payload: false,
        })
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      };
    } catch (error: any) {
      console.log(error)
      dispatch({
        type: IS_LOADING_REGISTER,
        payload: false,
      })
      toast.error(
        error.response?.data?.message || 'Something was wrong! Try again later',
        { theme: 'colored' },
      )
    };
  }
}

export const loginAccount = (email: string, password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({
      type: IS_LOADING_LOGIN,
      payload: true,
    })
    try {
      const data = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email, password,
      })

      if (data) {
        dispatch(setUser(data.data.user))
        toast.success(
          'Success Login!',
          { theme: 'colored' },
        )
        dispatch({
          type: IS_LOADING_LOGIN,
          payload: false,
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      };
    } catch (error: any) {
      console.log(error)
      dispatch({
        type: IS_LOADING_LOGIN,
        payload: false,
      })
      toast.error(
        error.response?.data?.message || 'Something was wrong! Try again later',
        { theme: 'colored' },
      )
    };
  }
}
