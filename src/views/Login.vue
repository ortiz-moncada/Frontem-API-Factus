<template>
  <div class="CONTENEDOR" id="Container">
    <div v-for="i in 100" :key="i" class="cajas"></div>

    <div class="Requisitos">
      <h2 class="Titulo">Iniciar Sesión</h2><br>
      <label class="Usuario" for="Usuario">Usuario</label><br>
      <input class="USU" type="text" autocomplete="off" placeholder="INGRESA USUARIO/CORREO" v-model="usuario"><br><br><br>

      <label class="Contraseña" for="Contraseña">Contraseña</label><br>
      <input class="CON" type="password" autocomplete="off" placeholder="INGRESA CONTRASEÑA" v-model="contraseña"><br><br><br>

      <div class="Icon">
        <img class="imagenn" src="https://cdn-icons-png.flaticon.com/128/3884/3884880.png" alt="">
      </div>

      <q-btn 
        :loading="loading" 
        @click="vamos"
        label="INGRESAR"
        class="full-width boton-personalizado"
      >
        <template v-slot:loading>
          Cargando...
        </template>
      </q-btn><br><br>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useAdminStore } from '../store/administrador.js'
import axios from "../plugins/factus.js"
import { router } from '../routes/routes.js'

// Correctly initialize Quasar
const $q = useQuasar()

const usuario = ref('')
const contraseña = ref('')
const Store = useAdminStore()
const loading = ref(false)

function limpiarInputs() {
  usuario.value = ''
  contraseña.value = ''
}

function vamos() {
  if (usuario.value.trim() === '') {
    // Use Quasar's Notify directly
    $q.notify({
      type: 'warning',
      message: 'Por favor ingrese un usuario',
      position: 'top-end'
    })
    return
  } 
  if (contraseña.value.trim() === '') {
    $q.notify({
      type: 'warning',
      message: 'Por favor ingrese una contraseña',
      position: 'top-end'
    })
    return
  }
  login()
}

async function login() {
  loading.value = true 
 
  try {
    const response = await axios.post("/oauth/token", {
      grant_type: "password",
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      username: usuario.value,
      password: contraseña.value,
    })
    console.log("Respuesta API:", response) 

    if (response.data.access_token) {
      Store.set_Token_RefreshToken(response.data.access_token, response.data.refresh_token)
      Store.setUserName(usuario.value)

      // Ensure notify is called correctly
      $q.notify({
        type: 'positive',
        message: 'Has ingresado correctamente',
        position: 'top'
      })

      // Small delay to ensure notification is visible
      await new Promise(resolve => setTimeout(resolve, 1500))

      router.replace("/cliente")
      limpiarInputs()
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Credenciales incorrectas o problema con el servidor',
      position: 'center'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style>

input {
  padding-left: 10px; /* Ajusta según el espacio deseado */
}


.boton-personalizado {
  background-color: #3F4F44 ;
  color: white;
  border-radius: 5px; 
  padding: 10px 20px; 
  font-size: 16px;
  border: none;
}

.Icon {
  background-color: white;
  position: fixed;
  border-radius: 50%;
  border: 1px black solid;
  width: 155px; 
  height: 155px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; 
  margin-top: -28%;
  margin-left: -5%;
}

.imagenn {
  width: 80%; 
  height: 80%;
  object-fit: contain; 
}



.Titulo {
  text-align: center;
  font-family: "Anton", serif;
  font-weight: 400;
  font-style: normal;
}

.USU, .CON {
  width: 90%;
  height: 50px;
  border-radius: 5px;
  border: none;
}
.Usuario, .Contraseña {
  margin-left: 5%;
  font-size: x-large;
}
.CONTENEDOR {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10, 10%);
  padding: 2px;
  background-color: #DCD7C9;
}
.cajas {
  transition: all 6s ease;
}
.cajas:hover {
  background: rgba(0, 0, 0, 0.367);
  transition: all 0.1s ease-out;
}
.Requisitos {
  position: fixed;
  color: #DCD7C9;
  background: #2C3930;
  border: 1px black solid;
  width: 40%;
  margin-top: 8%;
  margin-left: 30%;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}
</style>
