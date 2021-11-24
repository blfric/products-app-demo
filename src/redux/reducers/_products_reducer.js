
import { productsTypes } from '../actions/general_actions';


export default ( state = [], action ) => {
  switch (action.type) {
    case productsTypes.LIST_PRODUCTS:
      return [ ...state ];
    case productsTypes.ADD_PRODUCT:
      return [
        ...state,
        action.payload,
      ];
    case productsTypes.EDIT_PRODUCT:
      return state.map(product => {
        if (product.uuidProduct === action.uuidProduct) {
          return {
            ...product,
            ...action.product,
          };
        } else {
          return product;
        }
      });
    case productsTypes.DELETE_PRODUCT:
      return [...action.newValues];
    default: return state;
  }
};