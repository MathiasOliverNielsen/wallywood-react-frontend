import type { Genre } from "../../../types/movieType";
import style from "./Poster.module.scss";
import parse from "html-react-parser";
import { useNavigate } from "react-router";

interface PosterProps {
  id: number;
  imageUrl: string;
  title: string;
  description?: string;
  genres: Array<Genre>;
  price?: number;
}

export function Poster({ id, imageUrl, title, description, genres }: PosterProps) {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/posters/${id}`);
  };

  const handlePosterClick = () => {
    navigate(`/posters/${id}`);
  };

  return (
    <div key={id} className={style.posterStyle} onClick={handlePosterClick}>
      <img src={imageUrl} alt={title} />
      <div className={style.posterContent}>
        <h4>{title}</h4>
        {description && <div className={style.description}>{parse(description)}</div>}
        <p className={style.genreLabel}>Genre:</p>
        <div className={style.genreList}>
          {genres &&
            genres.map((genre: Genre, index) => {
              return (
                <span key={genre.id}>
                  {genre.title}
                  {index < genres.length - 1 ? ", " : ""}
                </span>
              );
            })}
        </div>
        <button
          className={style.readMoreButton}
          onClick={(e) => {
            e.stopPropagation();
            handleReadMore();
          }}
        >
          Læs mere
        </button>
      </div>
    </div>
  );
}
