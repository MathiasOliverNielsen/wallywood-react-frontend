// Plakat detalje side komponent
import { useEffect, useState } from "react";
import { Container } from "../components/Container";

// Types til API data
type Genre = {
  id: number;
  title: string;
  slug: string;
};

type Poster = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  slug: string;
  width?: number;
  height?: number;
  stock?: number;
  genrePosterRels?: { genre: Genre }[];
};

type PosterDetailProps = {
  posterSlug: string;
  onBack: () => void;
};

// HTML entities decoder
const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

export const PosterDetail = ({ posterSlug, onBack }: PosterDetailProps) => {
  const [poster, setPoster] = useState<Poster | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        setLoading(true);
        setError(null);

        // Hent plakat via slug (antag at backend understøtter dette)
        const response = await fetch(`/api/posters/slug/${posterSlug}`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setPoster(data);
      } catch (e: any) {
        setError(e.message ?? "Fejl ved hentning af plakat");
      } finally {
        setLoading(false);
      }
    };

    fetchPoster();
  }, [posterSlug]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToCart = () => {
    console.log(`Tilføj til kurv: ${quantity} x ${poster?.name}`);
    // Her ville du normalt kalde en API eller opdatere en global kurv-state
  };

  if (loading) {
    return (
      <Container as="main">
        <div className="loading">Indlæser plakat...</div>
      </Container>
    );
  }

  if (error || !poster) {
    return (
      <Container as="main">
        <div className="error">
          <p>Fejl: {error || "Plakat ikke fundet"}</p>
          <button className="btn-back" onClick={onBack}>
            ← Tilbage
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container as="main">
      <div className="poster-detail">
        {/* Back button */}
        <button className="btn-back" onClick={onBack}>
          ← Tilbage til plakater
        </button>

        <div className="poster-detail-content">
          {/* Venstre side - Information */}
          <div className="poster-detail-info">
            <div className="poster-breadcrumb">
              <span>Plakater</span>
              {poster.genrePosterRels && poster.genrePosterRels.length > 0 && (
                <>
                  <span> › </span>
                  <span>{poster.genrePosterRels[0].genre.title}</span>
                </>
              )}
              <span> › </span>
              <span>{poster.name}</span>
            </div>

            <h1 className="poster-detail-title">{poster.name}</h1>

            {/* Pris */}
            <div className="poster-price-section">
              <span className="poster-price-large">Kr. {poster.price?.toFixed(2) || "0,00"}</span>
              <span className="poster-price-vat">inkl. moms</span>
            </div>

            {/* Varenummer */}
            <div className="poster-meta-item">
              <strong>Varenummer:</strong> <span>WW-{poster.id.toString().padStart(4, "0")}</span>
            </div>

            {/* Størrelse */}
            {(poster.width || poster.height) && (
              <div className="poster-meta-item">
                <strong>Størrelse:</strong>
                <span>
                  {poster.width || "50"} x {poster.height || "70"} cm
                </span>
              </div>
            )}

            {/* Lager status */}
            <div className="poster-meta-item">
              <strong>Status:</strong>
              <span className="stock-status available">På lager</span>
            </div>

            {/* Genres */}
            {poster.genrePosterRels && poster.genrePosterRels.length > 0 && (
              <div className="poster-meta-item">
                <strong>Kategorier:</strong>
                <div className="poster-detail-genres">
                  {poster.genrePosterRels.map((rel, i) => (
                    <span key={i} className="badge">
                      {rel.genre.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Beskrivelse */}
            {poster.description && (
              <div className="poster-description">
                <h3>Beskrivelse</h3>
                <div className="poster-description-content">{decodeHtmlEntities(poster.description.replace(/<[^>]*>/g, ""))}</div>
              </div>
            )}

            {/* Antal og tilføj til kurv */}
            <div className="poster-actions-section">
              <div className="quantity-selector">
                <label htmlFor="quantity">Antal:</label>
                <div className="quantity-controls">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                    -
                  </button>
                  <input id="quantity" type="number" min="1" max="10" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
                  <button type="button" onClick={() => setQuantity(Math.min(10, quantity + 1))} disabled={quantity >= 10}>
                    +
                  </button>
                </div>
              </div>

              <div className="poster-action-buttons">
                <button className="btn-add-to-cart" onClick={handleAddToCart}>
                  Læg i kurv - Kr. {(poster.price * quantity)?.toFixed(2)}
                </button>
                <button className={`btn-like-detail ${isLiked ? "liked" : ""}`} onClick={handleLike} aria-label="Tilføj til favoritter">
                  {isLiked ? "❤" : "♡"} {isLiked ? "Fjern fra" : "Tilføj til"} favoritter
                </button>
              </div>
            </div>
          </div>

          {/* Højre side - Billede */}
          <div className="poster-detail-image">
            <div className="poster-image-container">{poster.image ? <img src={poster.image} alt={poster.name} /> : <div className="poster-placeholder-large">Ingen billede tilgængeligt</div>}</div>
          </div>
        </div>
      </div>
    </Container>
  );
};
