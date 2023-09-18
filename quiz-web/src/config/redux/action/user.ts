import axios from 'axios'
import { SET_PER_PAGE_USER_LISTS, SET_USER_LISTS } from '../types'

export const setListDataUser = (data: any) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_USER_LISTS,
      payload: {
        data: data.data,
        page: data.data?.page || 1,
        total: data.data?.total || 0,
        perPage: data.data?.per_page || 0,
      },
    })
  }
}

export const setPerPageUserList = (perPage: any) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_PER_PAGE_USER_LISTS,
      payload: perPage,
    })
  }
}

export const getDataUser = async (pageSize: number, page: number) => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_API_URL}/users?page_size=${pageSize}&page_number=${page}`,
    )

    if (data) {
      return data
    };
  } catch (error: any) {
    console.log(error)
    return null
  };
}

export const createUser = async (datas: any) => {
  try {
    const data = await axios.post(`${import.meta.env.VITE_API_URL}/users/add`, {
      ...datas,
    },
    )

    if (data) {
      return data
    };
  } catch (error: any) {
    console.log(error)
    return null
  };
}

export const updateUser = async (datas: any) => {
  try {
    const data = await axios.put(`${import.meta.env.VITE_API_URL}/users/update`, {
      ...datas,
    })

    if (data) {
      return data
    };
  } catch (error: any) {
    console.log(error)
    return null
  };
}

export const deleteUser = async (id: number) => {
  try {
    const data = await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`)

    if (data) {
      return data
    };
  } catch (error: any) {
    console.log(error)
    return null
  };
}
