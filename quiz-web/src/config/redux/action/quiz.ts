import axios from 'axios'
import { SET_PER_PAGE_QUIZ_LISTS, SET_QUIZ_LISTS, SET_QUIZ_INDEX, IS_LOADING_TRY_QUIZ, SET_TRY_QUIZ_LISTS } from '../types'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { toast } from 'react-toastify'

export const setListDataQuiz = (data: any) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_QUIZ_LISTS,
      payload: {
        data: data.data,
        page: data.data?.page || 1,
        total: data.data?.total || 0,
        perPage: data.data?.per_page || 0,
      },
    })
  }
}

export const setPerPageQUIZList = (perPage: any) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_PER_PAGE_QUIZ_LISTS,
      payload: perPage,
    })
  }
}

export const setQuizIndex = (index: any) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_QUIZ_INDEX,
      payload: index,
    })
  }
}

export const getDataQuiz = async (pageSize: number, page: number) => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_API_URL}/quiz?page_size=${pageSize}&page_number=${page}`,
    )

    if (data) {
      return data
    };
  } catch (error: any) {
    console.log(error)
    return null
  };
}

export const createQuiz = async (datas: any) => {
  try {
    const data = await axios.post(`${import.meta.env.VITE_API_URL}/quiz/add`, {
      ...datas,
    },
    )

    if (data) {
      return data
    };
  } catch (error: any) {
    console.log(error)
    return error.response.data?.message
  };
}

export const updateQuiz = async (datas: any) => {
  try {
    const data = await axios.put(`${import.meta.env.VITE_API_URL}/quiz/update`, {
      ...datas,
    },
    )

    if (data) {
      return data
    };
  } catch (error: any) {
    console.log(error)
    return error.response.data?.message
  };
}

export const deleteQuiz = async (id: number) => {
  try {
    const data = await axios.delete(`${import.meta.env.VITE_API_URL}/quiz/${id}`)

    if (data) {
      return data
    };
  } catch (error: any) {
    console.log(error)
    return null
  };
}

export const getTimerQuiz = async () => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_API_URL}/quiz/timer`)

    if (data) {
      return data
    };
  } catch (error: any) {
    console.log(error)
    return null
  };
}

export const updateTimerQuiz = async (datas: any) => {
  try {
    const data = await axios.put(`${import.meta.env.VITE_API_URL}/quiz/timer`, { ...datas })

    if (data) {
      return data
    };
  } catch (error: any) {
    console.log(error)
    return null
  };
}

export const getTryQuiz = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({
      type: IS_LOADING_TRY_QUIZ,
      payload: true,
    })
    try {
      const data = await axios.get(`${import.meta.env.VITE_API_URL}/quiz/try`)

      if (data) {
        dispatch({
          type: SET_TRY_QUIZ_LISTS,
          payload: {
            data: data.data,
          },
        })
      } else {
        dispatch({
          type: SET_TRY_QUIZ_LISTS,
          payload: [],
        })

        toast.error(
          'Something was wrong! Try again later',
          { theme: 'colored' },
        )
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: SET_TRY_QUIZ_LISTS,
        payload: [],
      })
      toast.error(
        'Something was wrong! Try again later',
        { theme: 'colored' },
      )
    };
  }
}
