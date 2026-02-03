import style from "./PosterCard.module.scss";

interface PosterCardProps {
  imageUrl: string;
  title: string;
  price?: number;
}

export function PosterCard({ imageUrl, title, price }: PosterCardProps) {
  return (
    <div className={style.posterCard}>
      <img src={imageUrl} alt={title} />
      <div className={style.cardContent}>
        <h4>{title}</h4>
        {price && <p className={style.price}>Kr. {price.toFixed(2)}</p>}
        <button className={style.addToCartButton}>Læg i kurv</button>
      </div>
    </div>
  );
}
