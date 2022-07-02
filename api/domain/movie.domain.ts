export interface MovieDbDto {
  adult: false;
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: 4.419,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
  status: string,
  tagline: string,
  imdb_id: string
}

export interface MovieDto {
  id: number;
  title: string;
  overview: string;
  poster: string;
  tagline: string;
  imdbId: string;
}

export function toLightMovieDto(data: MovieDbDto): MovieDto {
  return {
    id: data.id,
    title: data.title,
    overview: data.overview,
    poster: data.poster_path,
    tagline: data.tagline,
    imdbId: data.imdb_id
  }
}