import Global from "@/Global";
import axios from "axios";

export default class ServicePokedex {

    getAllPokemons(limit, oft) {
        var request = "api/v2/pokemon?limit=" + limit + "&offset=" + oft;
        var url = Global.apiPokedex + request;
        return axios.get(url)
            .then((response) => {
                const pokemonPromises = response.data.results.map((pokemon) => {
                    return axios.get(pokemon.url).then((response) => response.data);
                });

                return Promise.all(pokemonPromises);
            });
    }

    getPokemonById(pokeId) {
        return new Promise(function (resolve) {
            var request = "api/v2/pokemon/" + pokeId;
            var url = Global.apiPokedex + request;
            var pokemon = [];

            axios.get(url).then((response) => {
                pokemon = response.data;
                resolve(pokemon);
            })
        })
    }

    getPokemonByName(pokeName) {
        return new Promise(function (resolve) {
            var request = "api/v2/pokemon/" + pokeName.toLowerCase();
            var url = Global.apiPokedex + request;
            var pokemons = [];

            axios.get(url).then((response) => {
                pokemons = response.data;
                resolve(pokemons);
            })
        })
    }
}