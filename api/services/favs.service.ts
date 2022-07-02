interface FavEntry {
  movieId: string;
  comment: string;
}

const FAVS = new Map<string, FavEntry[]>();

export function getFavs(memberId: string): FavEntry[] {
  return FAVS.get(memberId) ?? [];
}

export function addToFavs(memberId: string, movieId: string, comment = "") {
  if (!FAVS.has(memberId)) {
    FAVS.set(memberId, []);
  }

  removeFromFavs(memberId, movieId);
  FAVS.get(memberId)!.push({movieId, comment});
}

export function removeFromFavs(memberId: string, movieId: string) {
  if (FAVS.has(memberId)) {
    FAVS.set(memberId, FAVS.get(memberId)!.filter(it => it.movieId !== movieId))
  }
}