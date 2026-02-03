import type { SetStateAction } from "react";
import style from "./Dropdown.module.scss";

interface DropDownProps {
  setSelectedSort: React.Dispatch<SetStateAction<string>>;
}

export function Dropdown({ setSelectedSort }: DropDownProps) {
  return (
    <select className={style.dropdown} onChange={(event) => setSelectedSort(event.target.value)}>
      <option value="">Sorter efter</option>
      <option value="asc">Pris - stigende</option>
      <option value="desc">Pris - faldende</option>
      <option value="name">Titel</option>
    </select>
  );
}
