import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";
//Helper function per controllare id prodotto passato, se esiste aumenta la quantità altrimenti lo aggiunge.

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decreaseCartItem: () => {},
  deleteProduct: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      //il reduce dovrebbe ricevere solo leazioni che vogliamo, altrimenti deve darci errore
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};
export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = newCartItems => {
    /* generate newCartTotal */
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    /* generate newCartCount */
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    /* dispatch new action with payload */
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = productToAdd => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = productToRemove => {
    const newCartItems = decreaseCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const deleteProduct = productToRemove => {
    const newCartItems = deleteItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = bool => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    cartTotal,
    removeItemToCart,
    deleteProduct,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
