import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

import { addItemToCart } from "../../store/cart/cart.actions";
const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer id='{product.id}'>
      <img src={imageUrl} alt='' />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        onClick={addProductToCart}
        buttonType={BUTTON_TYPE_CLASSES.inverted}
      >
        Add To cart
      </Button>
    </ProductCardContainer>
  );
};
export default ProductCard;
