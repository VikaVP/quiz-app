import { combineReducers } from 'redux'
import auth from './auth'
import modal from './modal'
import user from './user'
import quiz from './quiz'
import tryQuiz from './tryQuiz'

export default combineReducers({
  auth,
  modal,
  user,
  quiz,
  tryQuiz,
})
