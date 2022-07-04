export interface Movie {
  id: number;
  title: string;
  poster: string;
  overview: string;
  tagline: string;
  imdbId: string;
}

export interface FavMovie {
  movieId: number;
  comment: string;
}