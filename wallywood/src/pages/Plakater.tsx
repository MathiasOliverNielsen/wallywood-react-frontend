// Plakater side med filtrering og grid layout
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
  genrePosterRels?: { genre: Genre }[];
};

type PlakaterProps = {
  navigateTo: (path: string) => void;
  genreSlug?: string;
};

export const Plakater = ({ navigateTo, genreSlug }: PlakaterProps) => {
  // States for data og filtrering
  const [posters, setPosters] = useState<Poster[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(genreSlug ?? null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosters, setLikedPosters] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const postersPerPage = 9;

  // Hent genres og plakater
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Hent genres og plakater samtidigt
        const [genresRes, postersRes] = await Promise.all([fetch("/api/genres"), fetch("/api/posters")]);

        if (!genresRes.ok || !postersRes.ok) {
          throw new Error("Fejl ved hentning af data");
        }

        const [genresData, postersData] = await Promise.all([genresRes.json(), postersRes.json()]);

        setGenres(genresData);
        setPosters(postersData);
      } catch (e: any) {
        setError(e.message ?? "Ukendt fejl");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrer plakater baseret på valgt genre
  const filteredPosters = selectedGenre ? posters.filter((poster) => poster.genrePosterRels?.some((rel) => rel.genre.slug === selectedGenre)) : posters;

  // Få kun genres der faktisk har plakater og kombiner lignende
  const availableGenres = genres
    .filter((genre) => {
      return posters.some((poster) => poster.genrePosterRels?.some((rel) => rel.genre.slug === genre.slug));
    })
    .map((genre) => {
      // Kombiner lignende genres
      if (genre.slug === "krimi-thriller") {
        return { ...genre, title: "Thriller & Krimi" };
      }
      if (genre.slug === "marvel-dc-comics") {
        return { ...genre, title: "Superhelte" };
      }
      if (genre.slug === "boerne-familiefilm") {
        return { ...genre, title: "Familie & Børn" };
      }
      if (genre.slug === "walt-disney") {
        return { ...genre, title: "Disney & Pixar" };
      }
      if (genre.slug === "store-filmplakater") {
        return { ...genre, title: "Store Plakater" };
      }
      return genre;
    });

  // Pagination logik
  const totalPages = Math.ceil(filteredPosters.length / postersPerPage);
  const startIndex = (currentPage - 1) * postersPerPage;
  const currentPosters = filteredPosters.slice(startIndex, startIndex + postersPerPage);

  // Reset til side 1 når genre ændres
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenre]);

  // Opdater selectedGenre hvis genreSlug ændres udefra (fx via URL)
  useEffect(() => {
    if (genreSlug !== undefined) {
      setSelectedGenre(genreSlug);
    }
  }, [genreSlug]);

  // Håndter like/unlike
  const handleLike = (posterId: number) => {
    setLikedPosters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(posterId)) {
        newSet.delete(posterId);
      } else {
        newSet.add(posterId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <Container as="main">
        <div className="loading">Indlæser plakater...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container as="main">
        <div className="error">Fejl: {error}</div>
      </Container>
    );
  }

  return (
    <Container as="main">
      <div className="plakater-layout">
        <aside className="plakater-aside">
          <h2>Filtre</h2>

          <section className="filter-section">
            <h3>Genre</h3>
            <ul className="genre-list">
              <li>
                <button
                  className={selectedGenre === null ? "active" : ""}
                  onClick={() => {
                    navigateTo("/plakater");
                  }}
                >
                  Alle
                </button>
              </li>
              {availableGenres.map((genre) => {
                const count = posters.filter((poster) => poster.genrePosterRels?.some((rel) => rel.genre.slug === genre.slug)).length;

                return (
                  <li key={genre.id}>
                    <button
                      className={selectedGenre === genre.slug ? "active" : ""}
                      onClick={() => {
                        navigateTo(`/plakater/genre/${genre.slug}`);
                      }}
                    >
                      {genre.title} ({count})
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="filter-section">
            <h3>Favoritter</h3>
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Kun favoritter</span>
            </label>
          </section>
        </aside>

        <main className="plakater-main">
          <div className="plakater-header">
            <h1>{selectedGenre ? `${availableGenres.find((g) => g.slug === selectedGenre)?.title} - ${filteredPosters.length} plakater` : `Plakater - ${posters.length} plakater`}</h1>
            <select className="sort-select">
              <option value="">Sorter efter</option>
              <option value="name">Navn</option>
              <option value="price">Pris</option>
              <option value="newest">Nyeste</option>
            </select>
          </div>

          <div className="plakater-grid">
            {currentPosters.map((poster) => (
              <article
                key={poster.id}
                className="plakat-card"
                onClick={(e) => {
                  // Hvis der klikkes på like-knappen, gør intet
                  if ((e.target as HTMLElement).closest(".btn-like")) return;
                  navigateTo(`/poster/${poster.slug}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="plakat-image-wrap">{poster.image ? <img src={poster.image} alt={poster.name} /> : <div className="plakat-placeholder">Ingen billede</div>}</div>

                <div className="plakat-info">
                  <h3 className="plakat-title">{poster.name}</h3>
                  <p className="plakat-price">Kr. {poster.price?.toFixed(2) || "0,00"}</p>

                  <div className="plakat-actions">
                    <button className={`btn-cart`}>Læg i kurv</button>
                    <button
                      className={`btn-like ${likedPosters.has(poster.id) ? "liked" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(poster.id);
                      }}
                      aria-label="Tilføj til favoritter"
                    >
                      ♡
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
                ← Forrige
              </button>

              <span className="pagination-info">
                Side {currentPage} af {totalPages}
              </span>

              <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
                Næste →
              </button>
            </div>
          )}

          {filteredPosters.length === 0 && <div className="no-results">Ingen plakater fundet {selectedGenre && `i kategorien "${availableGenres.find((g) => g.slug === selectedGenre)?.title}"`}</div>}
        </main>
      </div>
    </Container>
  );
};
