import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IS_LOADING_LOGIN, IS_LOADING_REGISTER, SET_USER} from '../types';
import {AnyAction} from 'redux';
import axios from 'axios';
import {API_URL} from 'src/config/env';
import {Alert} from 'react-native';

export const setUser = (
  data: any,
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({
      type: SET_USER,
      payload: data,
    });
  };
};

export const registerAccount = (
  email: string,
  password: string,
  navigation: any,
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({
      type: IS_LOADING_REGISTER,
      payload: true,
    });
    try {
      const data = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
      });

      if (data) {
        Alert.alert('Success Register account!');
        dispatch({
          type: IS_LOADING_REGISTER,
          payload: false,
        });
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: IS_LOADING_REGISTER,
        payload: false,
      });
      Alert.alert(
        error.response?.data?.message || 'Something was wrong! Try again later',
      );
    }
  };
};

export const loginAccount = (
  email: string,
  password: string,
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({
      type: IS_LOADING_LOGIN,
      payload: true,
    });
    try {
      const data = await axios.post(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      if (data) {
        dispatch(setUser(data.data.user));
        Alert.alert('Success Login!');
        dispatch({
          type: IS_LOADING_LOGIN,
          payload: false,
        });
      }
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: IS_LOADING_LOGIN,
        payload: false,
      });
      Alert.alert(
        error.response?.data?.message || 'Something was wrong! Try again later',
      );
    }
  };
};
