/* eslint-disable import/no-anonymous-default-export */
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  EDIT_PRODUCT,
} from '../../redux';
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

    case ADD_PRODUCT:
      return {
        ...state,
        loading: false,
        products: [{ ...payload }, ...state.products],
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        loading: false,
        products: state.products.map((p) =>
          p._id === payload._id ? payload : p
        ),
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        loading: false,
        products: state.products.filter((p) => p._id !== payload),
      };
    default:
      return state;
  }
}
