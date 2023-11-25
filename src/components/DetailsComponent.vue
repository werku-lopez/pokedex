<template>
  <div class="main row g-5" id="details-pokemon">
    <div class="pokemon-todos col-md-6 col-sm-12" id="listaPokemon">
      <div class="pokemon">
        <p class="pokemon-id-back">#{{ idPokemon }}</p>
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
            <p class="pokemon-id">#{{ idPokemon }}</p>
            <h2 class="pokemon-nombre">{{ pokemon.name }}</h2>
          </div>
          <div class="pokemon-tipos">
            <p
              v-for="t in pokemon.types"
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
        </div>
      </div>
    </div>
    <div class="col-md-6 col-sm-12">
      <div class="row">
        <!-- Estadísticas -->
        <div class="col-md-12">
          <h4>Estadísticas</h4>
          <hr />
          <div class="listado-stats">
            <div v-for="stat in states" :key="stat" class="row">
              <span class="col-3 text-uppercase lh-1"> -
                {{
                  stat.stat.name === "hp"
                    ? "PS"
                    : stat.stat.name === "attack"
                    ? "Ataque"
                    : stat.stat.name === "defense"
                    ? "Defensa"
                    : stat.stat.name === "special-attack"
                    ? "Ataque especial"
                    : stat.stat.name === "special-defense"
                    ? "Defensa especial"
                    : stat.stat.name === "speed"
                    ? "Velocidad"
                    : stat.stat.name.charAt(0).toUpperCase() +
                      stat.stat.name.slice(1)
                }}
              </span>
              <div class="col-6">
                <div class="progress">
                  <div
                    class="progress-bar bg-info"
                    :style="{ width: stat.base_stat + '%' }"
                  ></div>
                </div>
              </div>
              <span class="col-3">{{ stat.base_stat }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed">
      <router-link to="/pokedex" class="btn btn-details"> Volver</router-link>
    </div>
  </div>
</template>

<script>
import ServicePokedex from "@/services/ServicePokedex";

const server = new ServicePokedex();

export default {
  name: "DetailsComponent",
  data() {
    return {
      pokemon: {},
      idPokemon: 0,
      states: [],
      abilities: [],
    };
  },
  mounted() {
    this.loadPokemon();
  },
  methods: {
    loadPokemon() {
      var id = parseInt(this.$route.params.id);

      server.getPokemonById(id).then((result) => {
        this.pokemon = result;
        this.idPokemon = result.id.toString().padStart(3, "0");
        this.states = result.stats;
        this.abilities = result.abilities;
      });
    },
  },
};
</script>

<style>
#details-pokemon .pokemon {
  border-radius: 1rem;
  background-color: var(--clr-white); 
  box-shadow: 0 0 3rem -1rem rgba(0, 0, 0, 0.25);
  padding-block: 1rem;
  text-transform: uppercase;
  position: relative;
  isolation: isolate;
  overflow: hidden;
}
#details-pokemon .pokemon-imagen {
  padding-inline: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

#details-pokemon .pokemon-imagen img {
  width: 100%;
  max-width: 250px;
}
#details-pokemon .pokemon-id-back {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 7rem;
  font-weight: 800;
  z-index: -1;
  /* color: var(--clr-gray); */
  columns: #1c1c1c;
}

#details-pokemon .pokemon-todos .pokemon-todos {
  grid-template-columns: 1fr !important;
}

@media screen and (min-width: 900px) {
  #details-pokemon .pokemon-todos {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (min-width: 700px) {
  #details-pokemon .pokemon-todos {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media screen and (min-width: 500px) {
  #details-pokemon .pokemon-todos {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
