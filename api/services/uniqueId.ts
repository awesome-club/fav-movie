import {usid} from "../deps.ts";

export function uniqueId() {
  return usid.uuid();
}