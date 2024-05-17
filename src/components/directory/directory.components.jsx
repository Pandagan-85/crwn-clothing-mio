import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";
const Directory = ({ categories }) => {
  return (
    <div className='directory-container'>
      {categories.map(categoria => {
        return <CategoryItem key={categoria.id} categoria={categoria} />;
      })}
    </div>
  );
};

export default Directory;
