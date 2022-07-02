<svelte:head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;600;900&display=swap');
  </style>
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';
  import * as StorageService from "./service/StorageService";
  import * as MovieApi from "./api/MovieApi";
  import type {FavMovie} from "./domain/Movie";
  import type { InitResponse } from './domain/Responses';
  import SearchInput from './lib/SearchInput.svelte';
  import MovieDetails from './lib/MovieDetails.svelte';
  import * as env from "./env";
  
  const {MID} = StorageService;

  let selectedMovieId = 0;
  let favs = [] as FavMovie[];
  
  onMount(async function() {
    const response = await MovieApi.init(StorageService.get(MID));
    const data = await response.json() as InitResponse;
    StorageService.set(MID, data.id);
    favs = data.favs;
  });

  function onSelectSuggestion(event) {
    const {movie} = event.detail;
    selectedMovieId = movie.id;
  }

  function onMovieAdded(event) {
    const {movie} = event.detail;
    favs = [...favs, {movieId: movie.id, comment: movie.poster}];
    selectedMovieId = null;
  }

</script>

<main>
	<SearchInput on:select={onSelectSuggestion} />

  {#if selectedMovieId > 0}
    <MovieDetails id={selectedMovieId} on:add={onMovieAdded} />
  {/if}

  <ul>
    {#each favs as fav (fav.movieId)}
      <li>
        <img src={env.imageBasePath + fav.comment} alt="" />
      </li>
    {/each}
  </ul>

</main>

<style>
  :global(body)  {
    background: #EEE;
    padding: 0;
  }
  main {
    display: flex;
    padding: 24px;
    flex-direction: column;
  }

  ul {
    margin: 0;
    padding: 20px 0 0;
    list-style-type: none;
    flex-wrap: wrap;
    display: flex;
  }

  img {
    height: 300px;
    border-radius: 10px;
    margin: 0 10px 10px 0;
    opacity: .9;
    cursor: pointer;
  }

  img:hover {
    opacity: 1;
  }
</style>