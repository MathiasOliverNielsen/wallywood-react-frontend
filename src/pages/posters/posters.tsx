import { PosterCard } from "../../Components/ui/PosterCard/PosterCard";
import { Grid } from "../../Components/ui/Grid/Grid";
import { useState, useEffect } from "react";
import type { MovieData } from "../../types/movieType";
import { GenreSelect } from "../../Components/ui/GenreSelect/GenreSelect";
import { Title } from "../../Components/ui/Title/Title";
import { Dropdown } from "../../Components/ui/Dropdown/Dropdown";

export function Posters() {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [posters, setPosters] = useState<MovieData[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Load posters function
  const loadPosters = async (genreSlug: string, pageNum: number, sortBy: string, reset = false) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const offset = pageNum * 21;
      let url;

      // Use different endpoints for "all" vs specific genres
      if (genreSlug === "all") {
        url = `http://localhost:3000/api/posters?limit=21&offset=${offset}`;
      } else {
        url = `http://localhost:3000/api/posters/genre/${genreSlug}?limit=21&offset=${offset}`;
      }

      if (sortBy) {
        url += `&sort=${sortBy}`;
      }

      console.log(`Loading posters: ${url}`);
      const response = await fetch(url);
      const newData = await response.json();
      console.log(`Loaded ${newData.length} posters for page ${pageNum}`);

      if (reset) {
        setPosters(newData);
        console.log("Reset posters, now showing:", newData.length);
      } else {
        setPosters((prev) => {
          const updated = [...prev, ...newData];
          console.log(`Added ${newData.length} posters, total now:`, updated.length);
          return updated;
        });
      }

      if (newData.length < 21) {
        setHasMore(false);
        console.log("No more posters to load");
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error("Error loading posters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial data when genre or sort changes
  useEffect(() => {
    if (!selectedGenre) return; // Don't load if no genre selected

    console.log("Genre changed to:", selectedGenre);
    console.log("Sort changed to:", selectedSort);

    // Reset all states when genre changes
    setPosters([]); // Clear existing posters immediately
    setPage(0);
    setHasMore(true);
    setIsLoading(false); // Reset loading state

    loadPosters(selectedGenre, 0, selectedSort, true);
  }, [selectedGenre, selectedSort]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      // Calculate if we're near the bottom (within 200px for better triggering)
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollPosition >= documentHeight - 200;

      console.log("Scroll event:", {
        scrollPosition,
        documentHeight,
        isNearBottom,
        isLoading,
        hasMore,
        selectedGenre,
        currentPage: page,
      });

      if (!isNearBottom || isLoading || !hasMore || !selectedGenre) {
        return;
      }

      console.log("✅ Triggering infinite scroll, loading next page:", page + 1);
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        loadPosters(selectedGenre, nextPage, selectedSort, false);
        return nextPage;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedGenre, selectedSort, isLoading, hasMore]); // Removed 'page' from dependencies

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title text="Posters" />
        <Dropdown setSelectedSort={setSelectedSort} />
      </div>
      <Grid gap={32} gtc={"200px 1fr"}>
        <GenreSelect setSelectedGenre={setSelectedGenre} selectedGenre={selectedGenre} />
        <Grid gtc={"1fr 1fr 1fr"} gap={16}>
          {posters.map((item) => {
            return <PosterCard key={item.id} price={item.price} imageUrl={item.image} title={item.name} />;
          })}
        </Grid>
      </Grid>
      {isLoading && <div style={{ textAlign: "center", padding: "20px" }}>Loading more...</div>}
      {!hasMore && <div style={{ textAlign: "center", padding: "20px" }}>No more posters to load</div>}
    </>
  );
}
