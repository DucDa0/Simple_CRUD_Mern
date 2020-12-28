/* eslint-disable import/no-anonymous-default-export */
import { GET_PRODUCTS } from '../../redux';
const initialState = {
  products: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    default:
      return state;
  }
}
