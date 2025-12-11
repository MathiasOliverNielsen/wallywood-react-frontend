import { useEffect, useMemo, useState } from "react";

type Poster = {
  id: number;
  name: string;
  image: string;
  price: number;
  slug: string;
};

export const PostersGrid = () => {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

  const randomEight = useMemo(() => {
    const arr = [...posters];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 8);
  }, [posters]);

  if (loading) {
    return <div className="grid loading">Indlæser plakater…</div>;
  }

  if (error) {
    return <div className="grid error">Fejl: {error}</div>;
  }

  return (
    <section>
      <h2>Udvalgte plakater</h2>
      <div className="grid posters-grid">
        {randomEight.map((p) => (
          <article key={p.id} className="poster-card">
            <div className="poster-image-wrap">{p.image ? <img src={p.image} alt={p.name} /> : <div className="poster-placeholder">Ingen billede</div>}</div>
            <div className="poster-info">
              <h3 className="poster-title">{p.name}</h3>
              <div className="poster-meta">
                <span className="poster-price">{p.price.toFixed(2)} kr</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
