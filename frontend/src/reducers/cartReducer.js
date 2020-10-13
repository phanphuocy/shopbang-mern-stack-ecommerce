import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

function checkItemAlreadyExistAndResolve(item, state) {
  const existItem = state.cartItems.find((x) => x.product === item.product);

  if (existItem) {
    return {
      ...state,
      cartItems: state.cartItems.map((x) =>
        x.product === item.product ? item : x
      ),
    };
  } else {
    return {
      ...state,
      cartItems: [...state.cartItems, item],
    };
  }
}

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      return checkItemAlreadyExistAndResolve(item, state);
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};
