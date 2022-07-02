import env from "../env.ts";
import {MovieDto, toLightMovieDto} from "../domain/movie.domain.ts";

export async function searchMovie(key: string): Promise<MovieDto[]> {
  const resp = await fetch(`${env.movieDbPath}/search/movie?api_key=${env.movieDbKey}&query=${key}`);
  const data = await resp.json();
  return data["results"].map(toLightMovieDto);
}

export async function getMovieDetails(id: string): Promise<MovieDto> {
  const resp = await fetch(`${env.movieDbPath}/movie/${id}?api_key=${env.movieDbKey}`);
  const data = await resp.json();
  return toLightMovieDto(data);
}