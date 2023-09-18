import axios from 'axios';
import {IS_LOADING_ANSWER_QUIZ, COUNT_ANSWER_QUIZ} from '../types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {API_URL} from 'src/config/env';

export const getAnswer = (
  id: number,
  answer: string,
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({
      type: IS_LOADING_ANSWER_QUIZ,
      payload: true,
    });

    try {
      const data = await axios.get(
        `${API_URL}/quiz/try/${id}?answer=${answer}`,
      );
      if (data) {
        dispatch({
          type: COUNT_ANSWER_QUIZ,
          payload: data.data.data.correct ? data.data.data.score : 0,
        });
      } else {
        dispatch({
          type: COUNT_ANSWER_QUIZ,
          payload: 0,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: COUNT_ANSWER_QUIZ,
        payload: 0,
      });
    }
  };
};
