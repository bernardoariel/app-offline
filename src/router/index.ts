import { createRouter, createWebHistory } from 'vue-router'
import ActuacionView from '@/views/ActuacionView.vue'
import FormActuacionVue from '@/views/FormActuacion.vue'

import isSavedChanges from '@/guards/isSavedChanges';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/actuacion/sumario-oficio'
    },
    {
      path: '/actuacion/personas/:tipo',
      name: 'persona',
      component: FormActuacionVue,
      props: true  
    },
    {
      path: '/actuacion/:actuacion',
      name: 'actuacion',
      component: ActuacionView,
      props: ( route ) => {
        console.log('route::: ', route);
        return  { actuacion: route.params.actuacion }
     }
    }
  ]
})

router.beforeEach((to, from, next) => {
  isSavedChanges(to, from, next); // Llamada al guard isSavedChanges en cada navegación
});

export default router
