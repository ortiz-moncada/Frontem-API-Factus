<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    
        <div class="Contenedor">
    
          <div class="Tabla">
            <h2 class="tituloTabla">CLIENTES
              <img class="imgC" src="https://cdn-icons-png.flaticon.com/128/6676/6676016.png" alt="">
            </h2>
           
            <q-btn class="mas" label="new ➕" @click="mas" />
            <div class="card">
        <q-card class="mycard" v-if="mostrarCarta">
          <q-card-section>
            <div class="contem-in-the-card">
              <div>
                <label class="Name-the-header"><h3>Crear Cliente</h3></label>
                <q-btn flat style="color: #3F4F44" label="X" class="btn" @click="cerrar" />
              </div>

              <div class="contem-the-imputs"> 
                <div class="contem1">
                  <label>NOMBRE</label>
                  <q-input v-model="nombre" standout="bg-teal text-white" label="Ingrese un Nombre" />
                  <br><br>
                  <label>SELECCIONA TIPO DE DOCUMENTO</label>
                  <q-select v-model="tipoDocumento" :options="opcionesDocumento" standout="bg-teal text-white" label="Tipo de Documento" />
                  <br><br>
                  <label>DOCUMENTO</label>
                  <q-input v-model="documento" standout="bg-teal text-white" label="Ingrese Número de documento" type="tel" maxlength="10" mask="##########" />
                </div>
                
                <div class="contem2">
                  <label>CELULAR</label>
                  <q-input v-model="numeroCelular" standout="bg-teal text-white" label="Ingrese un número de celular" type="tel" maxlength="10" mask="##########" />
                  <br><br>
                  <label>DV</label>
                  <q-input v-model="dv" standout="bg-teal text-white" label="Ingrese DV" />
                  <br><br>
                  <label>DIRECCIÓN</label>
                  <q-input v-model="direccion" standout="bg-teal text-white" label="Ingrese una dirección" />
                </div>

                <div class="contem3">
                  <label>EMAIL</label>
                  <q-input v-model="email" standout="bg-teal text-white" label="Ingrese un email" type="email" />
                </div>
              </div>
              <br><br><br><br>
              <q-btn :loading="loading" @click="registrar" label="REGISTRAR" class="full-width boton-personalizado">
                <template v-slot:loading> Cargando... </template>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
            
      <q-markup-table dark class="bg-indigo-8">
        <thead>
          <tr>
            <th class="text-left">CLIENTE</th>
            <th class="text-right">ID</th>
            <th class="text-right">FECHA</th>
            <th class="text-right">DOCUMENTO</th>
            <th class="text-right">OPCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cliente, index) in clientes" :key="index">
            <td class="text-left">{{ cliente.nombre }}</td>
            <td class="text-right">{{ cliente.fecha }}</td>
            <td class="text-right">{{ cliente.documento }}</td>
            <td class="text-right">
              <q-btn icon="visibility" color="blue-4" flat @click="verCliente(index)" />
              <q-btn icon="edit_square" color="blue-7" flat @click="editarCliente(index)" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      </div>
    
          <q-layout view="hHh lpR fFf">
    
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
           <img  src="https://cdn-icons-png.flaticon.com/128/3884/3884880.png">
          </q-avatar>
          Gestión de Facturación Digital
        </q-toolbar-title>
    
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>
    
    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <div class="caja1">
                <img class="imagen" src="https://img.freepik.com/vector-gratis/gradiente-verde-ola-3d-lujo-fondo-oscuro-abstracto-moderno_343694-3033.jpg?semt=ais_hybrid" alt="">
    
                <div class="perfil">
                    <img class="imagen"  src="https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small_2x/user-icon-on-transparent-background-free-png.png" alt="">
                </div>
            </div>
            <div class="caja2">
              <label class="nombre" for="nombre-usuario">{{ userName }}</label><br>
            </div>
            <div class="caja3">
              <q-btn @click="facturas()" class="full-width" label="Facturas" />
              <q-btn  @click="item()"  class="full-width" label="Items" />
              <q-btn  @click="cliente()" class="full-width" label="cliente" />
            </div>
            <div class="caja4">
              <q-btn class="cerrar" @click="cerrarSesion()" color="red" glossy label="cerrar sesión " />

            </div>
    
    </q-drawer>
    
    <q-page-container>
      <router-view />
    </q-page-container>
    </q-layout>
    </div>
</template>
    
<style>
.imgC{
  height: 50px;
  width: 50px;
}
.contem-the-imputs{
  display: grid;
  grid-template-columns: 33% 33% 33%;
  gap:10px ;
}
.Name-the-header{
  font-family: "Poppins";
  font-weight: 700;
  font-style: normal;
}
.btn{
  margin-left: 91.1%;
  margin-top: -6%;
}


.card{
 position: absolute;
 width: 90%;
 margin-top: -6%;
}
.mycard{
  width: 100%;
  height: 100%;
  position: fixed;  
  background-image: url(https://cdn.pixabay.com/photo/2024/06/14/11/07/shadows-8829575_640.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: -1%;
  margin-top: -4%;
  padding: 20px;
  border-radius: 10px;
  z-index: 10;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
    .mas{
      margin-top: -12%;
      margin-left: 90%;
      background-color: #DCD7C9;
    }
    .q-table{
      background-color: #2C3930;
    }
    .tituloTabla{
      margin: 3%;
      font-family: "Poppins";
      font-weight: 500;
      font-style: normal;
    }
    .Tabla{
      padding:  1%;
    }
    .full-width{
      color: black;
    }
    
    .caja2{
      text-align: center;
    }
    
    .nombre{
      font-size:large;
      margin: 3%;
      font-family: "Poppins", serif;
      font-weight: 500;
      font-style: normal;
    }
    .cerrar{
      position: absolute;
      margin-top: 25%;
      margin-left: 27%;
    }
    
    .q-drawer__content{
        margin: 0;
        padding: 0;
        display:grid;
        grid-template-columns: 100%;
        grid-template-rows: 40%  10%  30%  20%;
    }
    
    .q-layout{
        background: #DCD7C9;
    }
    
    .q-toolbar{
        background: #2C3930;
    }
    
    .q-avatar{
        background: white;
        align-items: center;
        justify-content: center;
        overflow: hidden; 
    }
    .imagen{
        width: 100%;
        height: 100%;
    }
    .perfil{
        width: 100%;
        height: 70%;
        margin-top: -80%;
        position: fixed;
    }
    
    .Contenedor{
      background-color:#DCD7C9 ;
    }
    
    
</style>
      
<script setup>
import { ref, onMounted } from 'vue'
import { useAdminStore } from '../store/administrador';
import { useRouter } from 'vue-router';
import axios from 'axios';
import apiCliente from '../plugins/axios'; 
import Swal from 'sweetalert2';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const store = useAdminStore();
const userName = store.userName;
const rightDrawerOpen = ref(false);
const router = useRouter();

const tipoDocumento = ref(""); 
const nombre = ref('');
const documento = ref('');
const numeroCelular = ref('');
const dv = ref('');
const direccion = ref('');
const email = ref('');
const opcionesDocumento = ref([
  "Cédula de Extrangeria",
  "Tarjeta de Identidad",
  "Cédula de Ciudadania",
  "RUC",
  "DNI",
]);
const loading = ref(false);
const clientes = ref([]);
const mostrarCarta = ref(false);

// Ajusta la URL de tu backend

// **Función para obtener clientes desde la API**
async function getClientes() {
  try {
    const response = await apiCliente.get('/customer/customer');

    // Asegurar que los datos sean asignados correctamente
    clientes.value = response.data.map(cliente => ({
      nombre:cliente.company || cliente.trade_name || 'Sin Nombre', 
      fecha: new Date().toLocaleDateString(), 
      documento: cliente.identification, 
    }));

    console.log("Clientes cargados:", clientes.value); // Verifica los datos en la consola
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    Swal.fire("Error", "No se pudieron cargar los clientes", "error");
  }
}

// **Función para registrar un nuevo cliente**
async function registrar() {
  if (!nombre.value || !tipoDocumento.value || !documento.value || !numeroCelular.value || !direccion.value || !email.value) {
    Swal.fire("Error", "Todos los campos son obligatorios", "error");
    return;
  }

  const nuevoCliente = {
    nombre: nombre.value,
    tipoDocumento: tipoDocumento.value,
    documento: documento.value,
    numeroCelular: numeroCelular.value,
    dv: dv.value,
    direccion: direccion.value,
    email: email.value,
    fecha: new Date().toISOString().split('T')[0], // Fecha en formato YYYY-MM-DD
    total: Math.floor(Math.random() * 100) + 1
  };

  try {
    loading.value = true;
    const response = await axios.post(API_URL, nuevoCliente);
    
    clientes.value.push(response.data); // Agregar cliente al estado local
    mostrarCarta.value = false; // Cerrar formulario

    // Limpiar formulario
    nombre.value = '';
    tipoDocumento.value = '';
    documento.value = '';
    numeroCelular.value = '';
    dv.value = '';
    direccion.value = '';
    email.value = '';

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cliente registrado con éxito",
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error("Error al registrar cliente:", error);
    Swal.fire("Error", "No se pudo registrar el cliente", "error");
  } finally {
    loading.value = false;
  }
}

function facturas(){
      router.replace("/factura")
    
    }

    function item(){
      router.replace("/items")
    
    }

// **Cargar clientes al iniciar**
onMounted(() => {
  getClientes();
});

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

function mas() {
  mostrarCarta.value = true;
}

function cerrar() {
  mostrarCarta.value = false;
}
</script>

    
    
