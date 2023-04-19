import { createRouter, createWebHistory } from 'vue-router'
import LightControl from '../views/LightControl.vue'
import FanControl from '../views/FanControl.vue'
import BrightnessInfo from '../views/BrightnessInfo.vue'
import TemperatureHumidityInfo from '../views/TemperatureHumidityInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/autolight',
      name: 'AutoLight Control Page',
      component: LightControl
    },
    {
      path: '/brightinfo',
      name: 'Brightness Info Page',
      component: BrightnessInfo
    },
    {
      path: '/autofan',
      name: 'AutoFan Control Page',
      component: FanControl
    },
    {
      path: '/temperaturehumidinfo',
      name: 'Temperature Humidity Info Page',
      component: TemperatureHumidityInfo
    },
    // {
      // path: '/about',
      // name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
