export interface MovieData {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  width: number;
  height: number;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  genrePosterRels: GenrePosterRel[];
}

export interface Genre {
  id: number;
  title: string;
  slug: string;
}

export interface GenrePosterRel {
  genre: Genre;
}
