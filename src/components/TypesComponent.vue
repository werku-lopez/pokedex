<template><hr>
  <div id="pokedex">
    <header class="header-container">
      <div class="form">
        <button class="btn-details" id="btn-filter">
          <i class="fas fa-bars"></i> filtrar por tipo
        </button>
        <input
          type="text"
          placeholder="Buscar pokemon..."
          name="busqueda"
          v-on:input="search()"
          v-model="pokemonSearch"
        />
        <button class="btn-search" @click="search()">
          <i class="fas fa-search" style="color: #fff"></i> buscar
        </button>
      </div>
    </header>
    <div id="filter-container">
      <section class="types">
        <nav class="nav">
          <div class="tipos">
            <header>
              <h4>- filtrar por tipos -</h4>
              <button class="btn-search" id="btn-close">
                <i class="fas fa-arrow-right" style="color: #fff"></i>
              </button>
            </header>
            <div class="types-container">
              <div v-for="type in allPokemonTypes" :key="type">
                <input
                  type="checkbox"
                  class="checkbox-types"
                  v-model="selectedTypes"
                  :value="type"
                  @change="getPokemonByTypes()"
                />
                {{ type }}
              </div>
            </div>
          </div>
        </nav>
      </section>
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

const server = new ServicePokedex();

export default {
  name: "TypesComponent",
  data() {
    return {
      pokemonSearch: "",
      pokemons: [],
      pokemonSearched: [],
      tipos: [],
      idPokemon: 0,
      allPokemonTypes: [],
      selectedTypes: [],
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
    search() {
      console.log(this.pokemonSearch);
      if (!this.pokemonSearch) {
        this.offset = 0;
        this.loadPokemons();
      } else {
        var pokemonFiltered = this.pokemonSearched.filter((pokemon) =>
          pokemon.name.includes(this.pokemonSearch.toLowerCase())
        );
        this.pokemons = pokemonFiltered;
      }
    },
    getPokemonByTypes() {
      if (
        this.selectedTypes !== null &&
        this.selectedTypes !== undefined &&
        this.selectedTypes.length > 0
      ) {
        var pokemonFilteredByType = this.pokemonSearched.filter((pokemon) => {
          return pokemon.tipos.some((type) =>
            this.selectedTypes.includes(type.type.name)
          );
        });
        this.pokemons = pokemonFilteredByType;
      } else {
        this.offset = 0;
        this.loadPokemons();
      }
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

<style>
.checkbox-types {
  margin-left: 15px;
}
.types-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 1rem;
  padding: 1rem;
  margin-top: 10px;
}
.types-container > div {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  text-transform: uppercase;
  border-radius: 0.25rem;
  cursor: pointer;
  color: black;
}
.types-container div input {
  margin: 0 5px;
  padding: auto;
  min-width: 50px;
  min-height: 30px;
}
.btn-load-more {
  display: inline-block;
  text-transform: uppercase;
  color: var(--clr-gray);
  background-color: var(--clr-black);
  transition: 0.3s ease;
  padding: 12px 16px;
  border-radius: 100vmax;
  opacity: 0.8;
}
.btn-load-more:hover {
  transform: scale(1.03);
  opacity: 1;
  cursor: pointer;
  color: var(--clr-gray);
  background-color: var(--clr-black);
}
</style>
