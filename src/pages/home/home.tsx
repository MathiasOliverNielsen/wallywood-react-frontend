import type { MovieData } from "../../types/movieType";
import { Title } from "../../Components/ui/Title/Title";
import { Poster } from "../../Components/ui/Poster/Poster";
import curtainImage from "../../assets/images/curtain.jpg";
import style from "./home.module.scss";
import { Grid } from "../../Components/ui/Grid/Grid";
import { useFetch } from "../../hooks/useFetch";

export function Home() {
  const { data, isLoading, error } = useFetch<Array<MovieData>>("http://localhost:3000/api/posters?sort_key=random&limit=2");

  console.log("Home data:", data);

  if (isLoading) {
    return <h1>Loading data......</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <>
      <img className={style.homePageImage} src={curtainImage} alt="curtain_image"></img>
      <Title text={"Sidste nyt..."} />
      <Grid gtc="1fr 1fr" gap={32}>
        {data &&
          data.slice(0, 2).map((item) => {
            // Transform genrePosterRels to genres array
            const genres = item.genrePosterRels?.map((rel) => rel.genre) || [];
            return <Poster key={item.id} genres={genres} title={item.name} imageUrl={item.image} description={item.description} id={item.id} />;
          })}
      </Grid>
    </>
  );
}
