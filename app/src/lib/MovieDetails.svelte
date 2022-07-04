<script lang="ts">
  import * as MovieApi from "../api/MovieApi";
  import type { Movie } from '../domain/Movie';
  import * as env from "../env";
  import HeartIcon from "./HeartIcon.svelte";
  import {createEventDispatcher} from "svelte";
  import * as StorageService from "../service/StorageService";

  const dispatch = createEventDispatcher();

  export let id: number;
  let movie: Movie = null;

  $: bgImage = movie ? `url(${env.imageBasePath + movie.poster})` : null;

  $: {
    if (id > 0) {
      MovieApi.getDetails(id).then(async function(resp) {
        movie = await resp.json();
      })
    }
  }

  async function addToFavs() {
    await MovieApi.addToFavs(StorageService.getMemberId(), movie.id, movie.poster);
    dispatch("add", {movie})
  }

</script>

<div class="details">

  {#if movie}
    <div class="poster" style="background-image: {bgImage};"></div>

    <header>
      <h1>{movie.title}</h1>
      <HeartIcon on:click={addToFavs} />
    </header>

    <h6>{movie.tagline}</h6>
    <p>{movie.overview}</p>

    <a href="https://www.imdb.com/title/{movie.imdbId}" target="new">View on IMDB</a>
  {/if}

</div>

<style>
  .details {
    position: fixed;
    z-index: 1;
    top: 20px;
    right: 20px;
    left: 20px;
    background: #FFF;
    min-height: 50vh;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    padding: 0 0 20px
  }
  .poster {
    height: 500px;
    background-size: cover;
    background-position: center;
    border-radius: 10px 10px 0 0;
  }
  header {
    display: flex;
    padding: 20px 20px 10px;
    align-items: center;
  }
  h1 {
    margin: 0 10px 0 0;
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 42px;
  }
  h6 {
    padding: 0 20px;
    font-size: 16px;
    font-weight: 100;
    margin: 0;
    font-family: "Montserrat";
  }
  p {
    font-family: "Montserrat";
    font-size: 17px;
    padding: 30px 20px 40px;
    margin: 0;
  }
  a {
    margin-left: 20px;
  }
</style>