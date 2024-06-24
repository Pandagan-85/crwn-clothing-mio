import { CategoryTitle, CategoryContainer } from "./category.styles";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  // const { categoriesMap } = useContext(CategoriesContext);
  // console.log("render/re-rendering category component");
  const categoriesMap = useSelector(selectCategoriesMap);

  //non possiamo usarlo così perchè tentiamo di renderizzare primad i aver preso il contenuto
  //const [products, setProducts] = useState([]);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    console.log("Effect fired calling setProducts");
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {/* In questo modo renderizziamo il componente solo dopo avere preso i dati */}
        {products &&
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
};

export default Category;
