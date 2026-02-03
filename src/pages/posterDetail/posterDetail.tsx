import style from "./posterDetail.module.scss";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Title } from "../../Components/ui/Title/Title";
import type { MovieData } from "../../types/movieType";
import parse from "html-react-parser";

export function PosterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poster, setPoster] = useState<MovieData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posters/${id}`);
        if (!response.ok) {
          throw new Error("Poster not found");
        }
        const data = await response.json();
        setPoster(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPoster();
    }
  }, [id]);

  const handleAddToCart = () => {
    // Add to cart functionality here
    console.log("Add to cart:", poster?.id);
  };

  const goBack = () => {
    navigate("/posters");
  };

  if (isLoading) {
    return <div className={style.loading}>Loading...</div>;
  }

  if (error || !poster) {
    return (
      <div className={style.error}>
        <h2>Poster ikke fundet</h2>
        <p>{error || "Posteren kunne ikke findes."}</p>
        <button onClick={goBack} className={style.backButton}>
          Tilbage til plakater
        </button>
      </div>
    );
  }

  return (
    <div className={style.posterDetailContainer}>
      <button onClick={goBack} className={style.backButton}>
        ← Tilbage til plakater
      </button>

      <Title text={poster.name} />

      <div className={style.posterContent}>
        <div className={style.imageSection}>
          <img src={poster.image} alt={poster.name} className={style.posterImage} />
          <div className={style.priceSection}>
            <span className={style.price}>Kr. {poster.price.toFixed(2)}</span>
            <button onClick={handleAddToCart} className={style.addToCartButton}>
              Læg i kurv
            </button>
          </div>
        </div>

        <div className={style.detailsSection}>
          <div className={style.description}>
            <h3>Beskrivelse</h3>
            {poster.description ? <div className={style.descriptionContent}>{parse(poster.description)}</div> : <p>Ingen beskrivelse tilgængelig.</p>}
          </div>

          {poster.genrePosterRels && poster.genrePosterRels.length > 0 && (
            <div className={style.genres}>
              <h3>Genrer</h3>
              <div className={style.genreList}>
                {poster.genrePosterRels.map((rel, index) => (
                  <span key={rel.genre.id} className={style.genreTag}>
                    {rel.genre.title}
                    {index < poster.genrePosterRels!.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className={style.details}>
            <h3>Detaljer</h3>
            <div className={style.detailsGrid}>
              <div className={style.detailItem}>
                <span className={style.label}>Produkt ID:</span>
                <span className={style.value}>{poster.id}</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.label}>Pris:</span>
                <span className={style.value}>Kr. {poster.price.toFixed(2)}</span>
              </div>
              <div className={style.detailItem}>
                <span className={style.label}>Tilgængelighed:</span>
                <span className={style.value}>På lager</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
