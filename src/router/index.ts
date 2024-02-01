import { createRouter, createWebHistory } from 'vue-router'
import SumarioOficio from '@/views/SumarioOficio.vue'
import ActuacionView from '@/views/ActucionView.vue'
import PersonaView from '@/views/PersonaView.vue'
import FormActuacionVue from '@/views/FormActuacion.vue'
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
      path: '/actuacion/personas',
      name: 'persona',
      component: FormActuacionVue
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
