export const productsTypes = {
  LIST_PRODUCTS: 'product/LOAD_PRODUCTS',
  ADD_PRODUCT: 'product/CREATE_PRODUCT',
  EDIT_PRODUCT: 'product/EDIT_PRODUCT',
  DELETE_PRODUCT: 'product/DELETE_PRODUCT',
};

export const addNewProduct = (payload) => ({
  type: productsTypes.ADD_PRODUCT,
  payload,
});

export const deleteProduct = (newValues) => ({
  type: productsTypes.DELETE_PRODUCT,
  newValues,
});

export const editProduct = (product) => ({
  type: productsTypes.EDIT_PRODUCT,
  product,
});