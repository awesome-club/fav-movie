import {helpers, Router, Context, Status} from "../deps.ts";
import * as movieService from "../services/movie.service.ts";
import * as favsService from "../services/favs.service.ts";

const { getQuery } = helpers;

async function search(ctx: Context) {
  const key = ctx.request.url.searchParams.get("key") ?? "";
  ctx.response.body = await movieService.searchMovie(key);
}

async function getDetails(ctx: Context) {
  const {id} = getQuery(ctx, {mergeParams: true});
  ctx.response.body = await movieService.getMovieDetails(id);
}

async function addMovieToFavs(ctx: Context) {
  const {id} = getQuery(ctx, {mergeParams: true});
  const memberId = ctx.request.headers.get("X-MID");
  const body = ctx.request.body();

  if (body.type !== "json" || !memberId || !id) {
    ctx.response.status = Status.BadRequest;
    return;
  }

  const value = await body.value;
  favsService.addToFavs(memberId, id, value.comment);
  ctx.response.status = Status.OK;
}

function removeMovieFromFavs(ctx: Context) {
  const {id} = getQuery(ctx, {mergeParams: true});
  const memberId = ctx.request.headers.get("X-MID");

  console.log(memberId, id);
  if (!memberId || !id) {
    ctx.response.status = Status.BadRequest;
    return;
  }

  favsService.removeFromFavs(memberId, id);
  ctx.response.status = Status.OK;
}

export const movieRoutes = new Router()
  .get("/movies/search", search)
  .get("/movies/:id", getDetails)
  .post("/movies/:id/favs", addMovieToFavs)
  .delete("/movies/:id/favs", removeMovieFromFavs);