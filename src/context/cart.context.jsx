import { createContext, useState, useEffect } from "react";

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

//soluzione mia ok
// const decreaseCartItem = (cartItems, productToRemove) => {
//   if (productToRemove.quantity > 0) {
//     // Mappa gli elementi del carrello per decrementare la quantità dell'elemento specificato
//     const updatedCartItems = cartItems.map(cartItem =>
//       cartItem.id === productToRemove.id
//         ? { ...cartItem, quantity: cartItem.quantity - 1 }
//         : cartItem
//     );

//     // Filtra gli elementi del carrello per rimuovere quelli con quantità zero
//     return updatedCartItems.filter(cartItem => cartItem.quantity > 0);
//   }
//   return cartItems; // Se la quantità di productToRemove non è maggiore di 0, restituisce semplicemente gli elementi del carrello senza modificarli
// };

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = productToAdd => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = productToRemove => {
    setCartItems(decreaseCartItem(cartItems, productToRemove));
  };

  const deleteProduct = productToRemove => {
    setCartItems(deleteItem(cartItems, productToRemove));
  };
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

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
