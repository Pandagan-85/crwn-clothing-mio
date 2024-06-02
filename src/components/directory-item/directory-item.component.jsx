import { useNavigate } from "react-router-dom";
import {
  BackgroundImage,
  Body,
  DirecotyItemContainer,
} from "./directory-item.styles";
const DirectoryItem = ({ categoria }) => {
  const { imageUrl, title, route } = categoria;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  return (
    <DirecotyItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirecotyItemContainer>
  );
};

export default DirectoryItem;
