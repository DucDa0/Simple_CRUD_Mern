import api from '../../api';
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  EDIT_PRODUCT,
} from '../../redux';
import { message } from 'antd';

export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await api.get('/product');
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {}
};

export const AddProduct = (data) => async (dispatch) => {
  try {
    const res = await api.post('/product', data);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data.product,
    });
    message.success(res.data.message);
    return true;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

export const EditProduct = (data) => async (dispatch) => {
  try {
    const res = await api.put('/product', data);
    dispatch({
      type: EDIT_PRODUCT,
      payload: res.data.product,
    });
    message.success(res.data.message);
    return true;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

export const RemoveProduct = (id) => async (dispatch) => {
  try {
    const res = await api.post('/product/remove', { id });
    dispatch({
      type: REMOVE_PRODUCT,
      payload: id,
    });
    message.success(res.data.message);
    return true;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};
