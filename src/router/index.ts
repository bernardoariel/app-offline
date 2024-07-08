import { createRouter, createWebHistory } from 'vue-router'
import ActuacionView from '@/views/ActuacionView.vue'
import FormActuacionVue from '@/views/FormActuacion.vue'
import ActuacionesView from '@/views/ActuacionesView.vue'
import AccessDeniedView from '@/views/AccessDeniedView.vue'

import isSavedChanges from '@/guards/isSavedChanges';
import isUserAllowed from '@/guards/isUserAllowed'
import isUserAccessValid from '@/guards/isUserAccessValid'
// import useItem from '../composables/useItems';
// GUARDS
// const { resetAll } =useItem()
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
      path: '/actuacion/personas/:tipo',
      name: 'formulario',
      component: FormActuacionVue,
      props: true
    },
    {
      path: '/actuaciones/new/:actuacion/initial',
      name: 'newActuacion',
      component: ActuacionView,
      props: (route) => {
        return { actuacion: route.params.actuacion }
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
        const { id,actuacion } = route.params
        return { 
          id: +id,
          actuacion 
        }
      }
    }

  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'actuacion' || from.name === 'actuacion') {
/*     resetAll
 */    next()
  } else {
    isSavedChanges(to, from, next); // Llamada al guard isSavedChanges en cada navegación
  }
});

export default router
