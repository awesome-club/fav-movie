<script lang="ts">
  import SearchInput from "./lib/SearchInput.svelte";
  import MovieDetails from "./lib/MovieDetails.svelte";
  import type {FavMovie} from "./domain/MovieDomain";
  import { onMount } from "svelte";
  import * as env from "./env";
  import * as StorageService from "./service/StorageService";
  import * as MovieApi from "./api/MovieApi";

  let selectedMovieId = 0;
  let favs = [] as FavMovie[];

  function onMovieSelect(event) {
    const {movie} = event.detail;
    selectedMovieId = movie.id;
  }

  onMount(async function() {
    const response = await MovieApi.init(StorageService.getMemberId());
    const data = await response.json();
    StorageService.setMemberId(data.id);
    favs = data.favs;
  });

  function onMovieAdd(event) {
    const {movie} = event.detail;
    favs = [...favs, {movieId: movie.id, comment: movie.poster}];
    selectedMovieId = null;
  }

</script>

<main>
  <SearchInput on:select={onMovieSelect} />

  {#if selectedMovieId > 0}
    <MovieDetails 
      id={selectedMovieId} 
      on:add={onMovieAdd}/>
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
  :global(body) {
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