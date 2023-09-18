/* eslint-disable import/no-anonymous-default-export */
import {
  CREATE_MODAL,
  MODAL_DETAIL,
  EDIT_MODAL,
  DETAIL_ACTIVE,
} from '../types'

const INITIAL_STATE = {
  modalCreate: false,
  modalEdit: false,
  modalImport: false,
  modalExport: false,
  modalDetail: false,
  modalCreateSummary: false,
  detailCurrent: {},
}

const modalReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case CREATE_MODAL:
      return { ...state, modalCreate: action.payload }
    case EDIT_MODAL:
      return { ...state, modalEdit: action.payload }
    case MODAL_DETAIL:
      return { ...state, modalDetail: action.payload }
    case DETAIL_ACTIVE:
      return { ...state, detailCurrent: action.payload }
    default:
      return state
  }
}

export default modalReducer
