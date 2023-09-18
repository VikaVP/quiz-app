import { SET_PER_PAGE_QUIZ_LISTS, SET_QUIZ_LISTS, SET_QUIZ_INDEX, SET_TRY_QUIZ_LISTS, IS_LOADING_TRY_QUIZ, IS_LOADING_ANSWER_QUIZ, COUNT_ANSWER_QUIZ } from '../types'

const INITIAL_STATE = {
  loadingAnswer: false,
  score: 0,
}

const mapSystemReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case IS_LOADING_ANSWER_QUIZ:
      return { ...state, loadingAnswer: action.payload }
    case COUNT_ANSWER_QUIZ:
      return { ...state, score: state.score + action.payload, loadingAnswer: false }
    default:
      return state
  }
}

export default mapSystemReducer
