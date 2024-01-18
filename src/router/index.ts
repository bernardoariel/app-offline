import { createRouter, createWebHistory } from 'vue-router'
import SumarioOficio from '@/views/SumarioOficio.vue'
import ActuacionView from '@/views/ActucionView.vue'
// import ButtonOptions from '@/components/ButtonOptions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SumarioOficio
    },
    {
      path: '/actuacion/:actuacion',
      name: 'actuacion',
      component: ActuacionView,
      props: ( route ) => {

        return  { actuacion: route.params.actuacion }

         
     }
    }
  ]
})

export default router
