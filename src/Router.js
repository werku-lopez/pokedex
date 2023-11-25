import HomeComponent from "./components/HomeComponent.vue";
import PokedexComponent from "./components/PokedexComponent.vue";
import TypesComponent from "./components/TypesComponent.vue";
import GenerationComponent from "./components/GenerationComponent.vue";
import DetailsComponent from "./components/DetailsComponent.vue";
import NotFoundComponent from "./components/NotFoundComponent.vue";

import { createRouter, createWebHistory } from "vue-router";

const myRoutes = [
    {
        path: "/", component: HomeComponent
    },
    {
        path: "/pokedex",
        component: PokedexComponent,
        children: [
            {
                path: "",
                component: TypesComponent,
            },
            {
                path: "/pokedex/generation",
                component: GenerationComponent,
            },
        ],
    },
    {
        path: "/details/:id/:name?/", component: DetailsComponent
    },
    {
        path: "/:pathMatch(.*)", component: NotFoundComponent
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: myRoutes
})

export default router;