import { createRouter, createWebHistory } from 'vue-router'
import ActuacionView from '@/views/ActuacionView.vue'
import FormActuacionVue from '@/views/FormActuacion.vue'
import ActuacionesView from '@/views/ActuacionesView.vue'
import AccessDeniedView from '@/views/AccessDeniedView.vue'

import isSavedChanges from '@/guards/isSavedChanges';
import isUserAllowed from '@/guards/isUserAllowed'
import isUserAccessValid from '@/guards/isUserAccessValid'
import { actuaciones } from '../data/tipoActuaciones';
import isPersonSaved from '@/guards/isPersonSaved'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/actuaciones/list',
    },
    {
      path: '/actuaciones/list',
      name: 'actuaciones',
      beforeEnter: [isUserAllowed],
      component: ActuacionesView,
    },
    {
      path: '/actuacion/personas/:tipo/:id?',
      name: 'formulario',
      component: FormActuacionVue,
      props: (route) => {
        console.log('route::: ', route);
        const id = route.params.id ? +route.params.id : null;
        return { tipo: route.params.tipo, id };
      }

    },
    {
      path: '/actuaciones/new/:actuacion/initial',
      name: 'newActuacion',
      component: ActuacionView,
      props: (route) => {
        const actuacionKey = route.params.actuacion
        const actuacionData = actuaciones[actuacionKey] || {};
        return { actuacionName: route.params.actuacion, actuacionData }
      }
    },
    {
      path: '/denegado',
      name: 'denegado',
      beforeEnter: [isUserAccessValid],
      component: AccessDeniedView,
    },
    {
      path: '/actuaciones/edit/:actuacion/initial/:id',
      name: 'editActuacion',
      component: ActuacionView,
      props: (route) => {
        const actuacionKey = route.params.actuacion
        const actuacionData = actuaciones[actuacionKey] || {};
        const { id, actuacion } = route.params
        return {
          id: +id,
          actuacionName:actuacion,
          actuacionData
        }
      }
    }

  ]
})

router.beforeEach((to, from, next) => {
  console.log('to::: ', to);

  if (to.name === 'actuaciones') {
    console.log('entro por actuaciones');
    isSavedChanges(to, from, next);
    return;
  }

/*   if (from.name === 'formulario') {
    console.log('salgo de form revisar');
    isPersonSaved(to, from, next);
    return;
  }
 */
  if (!to.params.id && from.params.id && to.name!== 'newActuacion' ) {
    console.log('no tengo id');
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


export default router
