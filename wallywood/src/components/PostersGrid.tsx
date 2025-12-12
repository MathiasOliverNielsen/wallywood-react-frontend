// Komponent der henter plakater fra backend og viser et grid
import { useEffect, useMemo, useState } from "react";

// Hjælpefunktion til at decode HTML entities som &#8216; &#8217; etc.
const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

// Simpel type for de felter vi bruger fra API'et
type Poster = {
  id: number;
  name: string;
  image: string;
  description: string;
  slug: string;
  genrePosterRels?: { genre: { title: string } }[];
};

type PostersGridProps = {
  navigateTo: (path: string) => void;
};

export const PostersGrid = ({ navigateTo }: PostersGridProps) => {
  // Lokale tilstande: data, loading og fejl
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosters, setLikedPosters] = useState<Set<number>>(new Set());

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

  useEffect(() => {
    // Hent plakater fra backend via Vite-proxy (/api -> http://localhost:3000)
    const fetchPosters = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/posters");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPosters(data);
      } catch (e: any) {
        setError(e.message ?? "Fejl ved hentning af plakater");
      } finally {
        setLoading(false);
      }
    };
    fetchPosters();
  }, []);

  // Udvælg 4 tilfældige plakater hver gang data ændrer sig
  const randomFour = useMemo(() => {
    const arr = [...posters];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 4);
  }, [posters]);

  if (loading) {
    // Loading-tilstand
    return <div className="grid loading">Indlæser plakater…</div>;
  }

  if (error) {
    // Fejlvisning (fx hvis API svarer 500)
    return <div className="grid error">Fejl: {error}</div>;
  }

  return (
    <section>
      <h2>Udvalgte plakater</h2>
      <div className="grid posters-grid">
        {randomFour.map((p) => (
          <article key={p.id} className="poster-card">
            {/* Billede eller placeholder hvis der mangler billede */}
            <div className="poster-image-wrap">{p.image ? <img src={p.image} alt={p.name} /> : <div className="poster-placeholder">Ingen billede</div>}</div>
            <div className="poster-info">
              <h3 className="poster-title">{p.name}</h3>
              <div className="poster-meta">
                {/* Genrer fra API'et */}
                {p.genrePosterRels && p.genrePosterRels.length > 0 && (
                  <div className="poster-genres">
                    {p.genrePosterRels.map((rel, i) => (
                      <span key={i} className="badge">
                        {rel.genre.title}
                      </span>
                    ))}
                  </div>
                )}
                {/* Kort beskrivelse (trimmet) */}
                {p.description && (
                  <p className="poster-desc">
                    {decodeHtmlEntities(p.description.replace(/<[^>]*>/g, "")).slice(0, 120)}
                    {p.description.length > 120 ? "…" : ""}
                  </p>
                )}
                <div className="poster-actions">
                  <button className={`btn-like ${likedPosters.has(p.id) ? "liked" : ""}`} aria-label="Vis interesse" onClick={() => handleLike(p.id)}>
                    ❤
                  </button>
                  <a
                    className="btn-read"
                    href={`/poster/${p.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/poster/${p.slug}`);
                    }}
                  >
                    Læs mere
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
