import { Poster } from "../../Components/ui/Poster/Poster";
import { Grid } from "../../Components/ui/Grid/Grid";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";
import type { MovieData } from "../../types/movieType";
import { GenreSelect } from "../../Components/ui/GenreSelect/GenreSelect";
import { Title } from "../../Components/ui/Title/Title";
import { Dropdown } from "../../Components/ui/Dropdown/Dropdown";

export function Posters() {
  const [selectedGenre, setSelectedGenre] = useState<string>("komedie");
  const [selectedSort, setSelectedSort] = useState<string>("asc");

  // Sortering fjernet - ikke i brug

  const { data, isLoading, error } = useFetch<Array<MovieData>>(`http://localhost:3000/api/posters/genre/${selectedGenre}`);

  if (isLoading) {
    return <h1>Loading data......</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <>
      <Title text="Posters"></Title>
      <Dropdown setSelectedSort={setSelectedSort} />
      <Grid gap={32} gtc={"1fr 4fr"}>
        <GenreSelect setSelectedGenre={setSelectedGenre} />
        <Grid gtc={"1fr 1fr 1fr"} gap={32}>
          {data?.map((item) => {
            return <Poster key={item.id} price={item.price} imageUrl={item.image} id={item.id} genres={item.genres} title={item.name} />;
          })}
        </Grid>
      </Grid>
    </>
  );
}
