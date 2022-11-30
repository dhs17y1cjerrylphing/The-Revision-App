import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import EditDeck from "@/views/editdeck.vue";
import Decks from "@/views/decks.vue";
import Test from "@/views/ankicard.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Decks",
    component: Decks
  },
  {
    path: "/test/:id",
    name: "Test",
    component: Test
  },
  {
    path: "/editdeck/:id",
    name: "EditDeck",
    component: EditDeck
  },
];

export default new VueRouter({
  routes,
});
