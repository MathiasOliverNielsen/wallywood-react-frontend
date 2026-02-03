import style from "./PosterCard.module.scss";
import { FaBasketShopping } from "react-icons/fa6";
import { useNavigate } from "react-router";

interface PosterCardProps {
  id: number;
  imageUrl: string;
  title: string;
  price?: number;
}

export function PosterCard({ id, imageUrl, title, price }: PosterCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/posters/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to cart functionality here
    console.log("Add to cart:", id);
  };

  return (
    <div className={style.posterCard} onClick={handleCardClick}>
      <img src={imageUrl} alt={title} />
      <div className={style.cardContent}>
        <h4>{title}</h4>
        {price && <p className={style.price}>Kr. {price.toFixed(2)}</p>}
        <button className={style.addToCartButton} onClick={handleAddToCart}>
          <FaBasketShopping />
        </button>
      </div>
    </div>
  );
}
