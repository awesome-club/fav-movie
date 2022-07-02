import type { FavMovie } from "./Movie";

export interface InitResponse {
  id: string;
  favs: FavMovie[];
}