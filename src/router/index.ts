import { createRouter, createWebHistory } from 'vue-router'
import ActuacionView from '@/views/ActuacionView.vue'
import FormActuacionVue from '@/views/FormActuacion.vue'
import ActuacionesView from '@/views/ActuacionesView.vue'
import AccessDeniedView from '@/views/AccessDeniedView.vue'

import isSavedChanges from '@/guards/isSavedChanges';
import isUserAllowed from '@/guards/isUserAllowed'
import isUserAccessValid from '@/guards/isUserAccessValid'
import { actuaciones } from '../data/tipoActuaciones';



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
      props: (route) => console.log(route)
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
        const actuacionKey = route.params.actuacion
        const actuacionData = actuaciones[actuacionKey] || {};
        return { actuacion: route.params.actuacion, actuacionData }
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
        const { id,actuacion } = route.params
        return { 
          id: +id,
          actuacion,
          actuacionData
        }
      }
    }

  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'actuaciones') {
    console.log('entro por actuaciones')
    isSavedChanges(to, from, next); 
  } else {
    console.log('no entro')
    next(); // Continuar la navegación para otras rutas
  }
});

export default router
