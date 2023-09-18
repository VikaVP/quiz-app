import {
  SET_PER_PAGE_QUIZ_LISTS,
  SET_QUIZ_LISTS,
  SET_QUIZ_INDEX,
  SET_TRY_QUIZ_LISTS,
  IS_LOADING_TRY_QUIZ,
} from '../types';

const INITIAL_STATE = {
  currPage: 1,
  showPerPage: 10,
  totalPage: 0,
  loading: false,
  data: [],
  index: 0,
};

const mapSystemReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_QUIZ_LISTS:
      return {...state, data: action.payload, loading: false};
    case SET_TRY_QUIZ_LISTS:
      return {...state, data: action.payload.data, loading: false};
    case IS_LOADING_TRY_QUIZ:
      return {...state, loading: action.payload};
    case SET_PER_PAGE_QUIZ_LISTS:
      return {...state, showPerPage: action.payload};
    case SET_QUIZ_INDEX:
      return {...state, index: action.payload};
    default:
      return state;
  }
};

export default mapSystemReducer;
