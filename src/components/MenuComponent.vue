<template>
  <div class="header-top">
    <router-link to="/" class="logo">
      <img src="../assets/img/logo.png" alt="Pokemon" />
    </router-link>
    <div class="navbar">
      <ul class="menu">
        <li class="nav-item">
          <router-link to="/"><i class="fas fa-home"></i> home</router-link>
        </li>
        <li class="nav-item">
          <div class="dropdown">
            <button class="dropbtn"><i class="fas fa-user"></i> profile</button>
            <div class="dropdown-content">
              <router-link to="/pokedex" class="pokedex"
                >Ver Pokédex</router-link
              >
              <router-link to="/settings">Configuración</router-link>
              <router-link to="/logout">Cerrar sesión</router-link>
            </div>
          </div>
        </li>
      </ul>
      <div class="toggle-menu">
        <span class="fas fa-bars"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuComponent",
};
</script>

<style></style>
