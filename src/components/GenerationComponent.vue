<template>
  <hr />
  <div class="navbar navbar-expand-lg">
    <ul class="nav nav-underline" id="generation">
      <li class="nav-item">
        <router-link class="nav-link active" aria-current="page" to=""
          >Todos</router-link
        >
      </li>
      <!-- <li class="nav-item" v-for="generation in generations" :key="generation">
        <router-link class="nav-link" to="#">Generación {{generation}}</router-link>
      </li>  -->
      <li class="nav-item">
        <router-link class="nav-link" to="#1">Generación 1</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="#2">Generación 2</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="#3">Generación 3</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="#4">Generación 4</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="#5">Generación 5</router-link>
      </li>
    </ul>
  </div>
  <div class="main">
    <div class="todos">
      <div class="pokemon-todos" id="listaPokemon">
        <div class="pokemon" v-for="pokemon in pokemons" :key="pokemon">
          <p class="pokemon-id-back">#{{ pokemon.idPokemon }}</p>
          <div
            class="pokemon-imagen"
            v-if="
              pokemon.sprites &&
              pokemon.sprites.other &&
              pokemon.sprites.other['official-artwork']
            "
          >
            <img
              :src="pokemon.sprites.other['official-artwork'].front_default"
              :alt="pokemon.name"
            />
          </div>
          <div class="pokemon-info">
            <div class="nombre-contenedor">
              <p class="pokemon-id">#{{ pokemon.idPokemon }}</p>
              <h2 class="pokemon-nombre">{{ pokemon.name }}</h2>
            </div>
            <div class="pokemon-tipos">
              <p
                v-for="t in pokemon.tipos"
                :key="t"
                :class="t.type.name + ' tipo'"
              >
                {{ t.type.name }}
              </p>
            </div>
            <div class="pokemon-stats">
              <p class="stat">{{ pokemon.height }}m</p>
              <p class="stat">{{ pokemon.weight }}kg</p>
            </div>
            <div class="pokemon-info">
              <router-link
                v-bind:to="'/details/' + pokemon.id + '/' + pokemon.name"
                class="btn btn-details"
              >
                Ver detalles</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container pt-2 pb-5 bg-transparent">
      <button @click="getMore()" class="btn btn-load-more">
        cargar más
        <span class="fas fa-arrow-down" style="color: #fff"></span>
      </button>
    </div>
  </div>
</template>

<script>
import ServicePokedex from "@/services/ServicePokedex";
//import axios from "axios";

const server = new ServicePokedex();
export default {
  name: "GenerationComponent",
  data() {
    return {
      pokemons: [],
      pokemonSearched: [],
      tipos: [],
      generations: [],
      idPokemon: 0,
      allPokemonTypes: [],
      limit: 100,
      offset: 0,
    };
  },
  mounted() {
    this.loadPokemons();
  },
  methods: {
    loadPokemons() {
      server.getAllPokemons(this.limit, this.offset).then((results) => {
        this.offset = results.length;
        var pokemons = results.map((result) => {
          var arrayTipos = result.types.map((type) => type);
          var pokeId = result.id.toString().padStart(3, "0");
          return { ...result, tipos: arrayTipos, idPokemon: pokeId };
        });
        this.pokemons = pokemons;
        this.pokemonSearched = pokemons;

        /*results.map((result) => {
          result.game_indices.map((g) => {
            //return g.version.url
            //"https://pokeapi.co/api/v2/version/2/"
            //"https://pokeapi.co/api/v2/version-group/1/"

            axios.get(g.version.url).then((response) => {
              var data = response.data;
              axios.get(data.version_group.url).then((result) => {
                var data = result;
                axios.get(data.data.generation.url).then((response) => {
                  var generationsPokemon = [];
                  generationsPokemon.push(response.data.id);

                  generationsPokemon.forEach((g) => {
                    if (!this.generations.includes(g)) {
                      this.generations.push(g);
                    }
                  });
                });
              });
            });
          });
        });*/

        this.pokemons.forEach((pokemon) => {
          pokemon.tipos.forEach((t) => {
            if (!this.allPokemonTypes.includes(t)) {
              this.allPokemonTypes.push(t.type.name);
            }
          });
        });
        const uniqueTypes = new Set(this.allPokemonTypes);
        this.allPokemonTypes = Array.from(uniqueTypes);
      });
    },
    getMore() {
      this.offset = this.pokemons.length;
      server.getAllPokemons(this.limit, this.offset).then((results) => {
        var newPokemons = results.map((result) => {
          var arrayTipos = result.types.map((type) => type);
          var pokeId = result.id.toString().padStart(3, "0");
          return { ...result, tipos: arrayTipos, idPokemon: pokeId };
        });
        this.pokemons = [...this.pokemons, ...newPokemons];
        this.pokemonSearched = this.pokemons;

        newPokemons.forEach((pokemon) => {
          pokemon.tipos.forEach((t) => {
            if (!this.allPokemonTypes.includes(t)) {
              this.allPokemonTypes.push(t.type.name);
            }
          });
        });
        const uniqueTypes = new Set(this.allPokemonTypes);
        this.allPokemonTypes = Array.from(uniqueTypes);
      });
    },
  },
};
</script>

<style></style>
