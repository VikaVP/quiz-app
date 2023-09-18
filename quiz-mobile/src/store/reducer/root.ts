import {combineReducers} from 'redux';
import auth from './auth';
import modal from './modal';
import user from './user';
import quiz from './quiz';
import tryQuiz from './tryQuiz';

const rootReducer = combineReducers({
  auth,
  modal,
  user,
  quiz,
  tryQuiz,
});

export default rootReducer;
