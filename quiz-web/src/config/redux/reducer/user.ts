import { SET_PER_PAGE_USER_LISTS, SET_USER_LISTS } from '../types'

const INITIAL_STATE = {
  currPage: 1,
  showPerPage: 10,
  totalPage: 0,
  loading: false,
  data: [],
}

const mapSystemReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_USER_LISTS:
      return { ...state, data: action.payload, loading: false }
    case SET_PER_PAGE_USER_LISTS:
      return { ...state, showPerPage: action.payload }
    default:
      return state
  }
}

export default mapSystemReducer
