<template>
  <div class="container pt-5">
    <div class="d-flex align-items-center justify-content-center vh-100">
      <div class="text-center">
        <h1 class="display-1 fw-bold">404</h1>
        <p class="fs-3">
          <span class="text-danger">Opps!</span> Página no encontrada.
        </p>
        <p class="lead">La página que buscas no existe.</p>
        <router-link to="/" class="btn btn-primary">Volver</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundComponent",
};
</script>

<style></style>
