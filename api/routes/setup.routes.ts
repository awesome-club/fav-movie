import {Router, Context} from "../deps.ts";
import { uniqueId } from "../services/uniqueId.ts";
import * as favsService from "../services/favs.service.ts";

function init({request, response}: Context) {
  const id = request.headers.get("X-MID") ?? uniqueId();
  const favs = favsService.getFavs(id);
  response.body = { id, favs };
}

export const setupRoutes = new Router()
  .get("/init", init);