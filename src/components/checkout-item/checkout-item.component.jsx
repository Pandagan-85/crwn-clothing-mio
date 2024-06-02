import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";
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
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>

      <Quantity>
        <Arrow onClick={removeProductToCart}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addProductToCart}>&#10095;</Arrow>
      </Quantity>

      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={deleteProductCart}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
