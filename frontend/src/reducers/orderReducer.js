import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        order: action.payload,
        success: true,
        loading: false,
      };
    case ORDER_CREATE_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const orderDetailReducer = (
  state = {
    loading: true,
    orderItems: [],
    shippingAddress: {},
  },
  action
) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DETAIL_SUCCESS:
      return {
        order: action.payload,
        loading: false,
      };
    case ORDER_DETAIL_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
