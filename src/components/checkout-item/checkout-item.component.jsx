import "./checkout-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
const CheckoutItem = ({ product }) => {
  const { imageUrl, name, quantity, price } = product;

  const { addItemToCart, removeItemToCart, deleteProduct } =
    useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);
  const removeProductToCart = () => removeItemToCart(product);
  const deleteProductCart = () => deleteProduct(product);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>

      <span className='quantity'>
        <div className='arrow' onClick={removeProductToCart}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addProductToCart}>
          &#10095;
        </div>
      </span>

      <span className='price'>{price}</span>
      <div onClick={deleteProductCart} className='remove-button'>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
