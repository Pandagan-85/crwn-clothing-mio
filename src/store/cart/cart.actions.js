import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";
export const setIsCartOpen = boolean =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems containes product to add
  const existingCartItem = cartItems.find(
    product => product.id === productToAdd.id
  );

  //if founf increment quantity

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //return new array with mofified cartItems / new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const deleteItem = (cartItems, productToDelete) =>
  cartItems.filter(cartItem => cartItem.id !== productToDelete.id);

const decreaseCartItem = (cartItems, productToRemove) => {
  //FInd the cart item to remove
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToRemove.id
  );
  //check if quantity is equal to 1, if it si remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
  }
  //return back cart items with marching cart item with reduced quantity
  return cartItems.map(cartItem =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemToCart = (cartItems, productToRemove) => {
  const newCartItems = decreaseCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteProduct = (cartItems, productToRemove) => {
  const newCartItems = deleteItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
