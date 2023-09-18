import {IS_LOADING_LOGIN, IS_LOADING_REGISTER, SET_USER} from '../types';

const INITIAL_STATE = {
  user: null,
  is_loading_register: false,
  is_loading_login: false,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case IS_LOADING_REGISTER:
      return {
        ...state,
        is_loading_register: action.payload,
      };
    case IS_LOADING_LOGIN:
      return {
        ...state,
        is_loading_login: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
