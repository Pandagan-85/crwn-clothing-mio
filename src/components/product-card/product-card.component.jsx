import "./product-card.styles.scss";
import Button from "../button/button.component";
const ProductCard = ({ product }) => {
  const { id, name, price, imageUrl } = product;
  return (
    <div id={`product-id-${id}`} className='product-card-container'>
      <img src={imageUrl} alt='' />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType='inverted'>Add To cart</Button>
    </div>
  );
};
export default ProductCard;
