import { type SetStateAction, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import type { Genre } from "../../../types/movieType";
import style from "./GenreSelect.module.scss";

interface GenreSelectProps {
  setSelectedGenre: React.Dispatch<SetStateAction<string>>;
  selectedGenre: string;
}

export function GenreSelect({ setSelectedGenre, selectedGenre }: GenreSelectProps) {
  const { data, isLoading, error } = useFetch<Array<Genre>>("http://localhost:3000/api/genres");

  console.log("Genres data:", data);
  console.log("Selected genre:", selectedGenre);

  // Auto-select "all" if none selected
  useEffect(() => {
    if (data && !selectedGenre) {
      console.log("Auto-selecting all genres");
      setSelectedGenre("all");
    }
  }, [data, selectedGenre, setSelectedGenre]);

  if (isLoading) {
    return <p>Loading genres...</p>;
  }

  if (error) {
    return <b>Error: {error}</b>;
  }

  return (
    <aside>
      <ul className={style.genreStyle}>
        <li key="all" className={selectedGenre === "all" ? style.active : ""} onClick={() => setSelectedGenre("all")}>
          Alle Plakater
        </li>
        {data?.map((item) => {
          return (
            <li key={item.id} className={selectedGenre === item.slug ? style.active : ""} onClick={() => setSelectedGenre(item.slug)}>
              {item.title}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
