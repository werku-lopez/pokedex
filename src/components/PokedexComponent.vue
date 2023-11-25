<template>
  <div class="container pt-5" style="margin: 0 auto">
    <div class="form-options">
      <router-link class="options" to="/pokedex"> Tipos </router-link>
      <router-link class="options" to="/pokedex/generation">
        Generaciones</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "PokedexComponent",
};
</script>

<style>
.form-options {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}
.form-options a {
  text-decoration: none;
}
.options {
  display: inline-block;
  text-transform: uppercase;
  color: var(--clr-black);
  background-color: var(--clr-gray);
  transition: 0.3s ease;
  padding: 12px 16px;
  border-radius: 100vmax;
  opacity: 0.8;
}
.options:hover {
  transform: scale(1.01);
  opacity: 0.9;
  cursor: pointer;
  color: var(--clr-gray);
  background-color: var(--clr-black);
}
</style>
