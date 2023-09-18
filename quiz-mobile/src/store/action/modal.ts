import {CREATE_MODAL, MODAL_DETAIL, EDIT_MODAL} from '../types';

export const setModalCreate = (param: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: CREATE_MODAL,
      payload: param,
    });
  };
};

export const setModalEdit = (param: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: EDIT_MODAL,
      payload: param,
    });
  };
};

export const setModalDetail = (param: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: MODAL_DETAIL,
      payload: param,
    });
  };
};
