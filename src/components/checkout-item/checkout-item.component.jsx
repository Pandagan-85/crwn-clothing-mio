import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemToCart,
  deleteProduct,
} from "../../store/cart/cart.actions";
const CheckoutItem = ({ product }) => {
  const { imageUrl, name, quantity, price } = product;
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
  const removeProductToCart = () =>
    dispatch(removeItemToCart(cartItems, product));
  const deleteProductCart = () => dispatch(deleteProduct(cartItems, product));

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
