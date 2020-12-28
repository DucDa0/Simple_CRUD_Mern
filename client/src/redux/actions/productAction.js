import api from '../../api';
import { GET_PRODUCTS } from '../../redux';
export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await api.get('/product');
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {}
};
