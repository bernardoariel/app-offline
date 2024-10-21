import { createRouter, createWebHistory } from "vue-router";
import {
  ActuacionView,
  FormActuacionView,
  ActuacionesView,
  AccessDeniedView,
} from "@/views/index";

import isSavedChanges from "@/guards/isSavedChanges";
import isUserAllowed from "@/guards/isUserAllowed";
import isUserAccessValid from "@/guards/isUserAccessValid";
import { actuaciones } from "../data/tipoActuaciones";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/actuaciones/list",
    },
    {
      path: "/actuaciones/list",
      name: "actuaciones",
      beforeEnter: [isUserAllowed],
      component: ActuacionesView,
    },
    {
      path: "/actuacion/personas/:tipo/:id?",
      name: "formulario",
      component: FormActuacionView,
      props: (route) => {
        const id = route.params.id ? +route.params.id : null;
        return { tipo: route.params.tipo, id };
      },
    },
    {
      path: "/actuaciones/new/:actuacion/initial",
      name: "newActuacion",
      component: ActuacionView,
      props: (route) => {
        const actuacionKey = route.params.actuacion;
        const actuacionData = actuaciones[actuacionKey] || {};
        return { actuacionName: route.params.actuacion, actuacionData };
      },
    },
    {
      path: "/denegado",
      name: "denegado",
      beforeEnter: [isUserAccessValid],
      component: AccessDeniedView,
    },
    {
      path: "/actuaciones/edit/:actuacion/initial/:id",
      name: "editActuacion",
      component: ActuacionView,
      props: (route) => {
        const actuacionKey = route.params.actuacion;
        const actuacionData = actuaciones[actuacionKey] || {};
        const { id, actuacion } = route.params;
        return {
          id: +id,
          actuacionName: actuacion,
          actuacionData,
        };
      },
    },
    { path: "/:pathMatch(.*)*", redirect: "/actuaciones/list" },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "actuaciones") {
    isSavedChanges(to, from, next);
    return;
  }

  if (!to.params.id && from.params.id && to.name !== "newActuacion") {
    next({
      name: to.name,
      params: { ...to.params, id: from.params.id },
      query: to.query, // mantener cualquier query param
      hash: to.hash, // mantener cualquier hash
    });
    return;
  }
  next();
});

export default router;
