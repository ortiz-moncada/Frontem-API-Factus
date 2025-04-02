
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Quasar, Notify } from 'quasar'
import 'quasar/dist/quasar.css'
import {router} from "./routes/routes.js"
import Swal from 'sweetalert2';
import {createPinia} from 'pinia'
import piniaPluginPersistence from 'pinia-plugin-persistedstate'


const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPluginPersistence)

app.use(pinia)
app.use(Quasar, {
  plugins: {
    Notify
  }
})
app.use(router)
app.mount('#app')
