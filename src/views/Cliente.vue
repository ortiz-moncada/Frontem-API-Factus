<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    
        <div class="Contenedor">
    
          <div class="Tabla">
            <h2 class="tituloTabla">CLIENTES</h2>
           
            <q-btn class="mas" label="+" @click="mas" />
            <div class="card">
        <q-card class="mycard" v-if="mostrarCarta">
          <q-card-section>
            <div class="contem-in-the-card">
              <div>
                <label class="Name-the-header">Crear Cliente</label>
                <q-btn flat style="color: #3F4F44" label="X" class="btn" @click="cerrar" />
              </div>

              <div class="contem-the-imputs"> 
                <div class="contem1">
                  <label>NOMBRE</label>
                  <q-input v-model="nombre" standout="bg-teal text-white" label="Ingrese un Nombre" />

                  <label>SELECCIONA TIPO DE DOCUMENTO</label>
                  <q-select v-model="tipoDocumento" :options="opcionesDocumento" standout="bg-teal text-white" label="Tipo de Documento" />

                  <label>DOCUMENTO</label>
                  <q-input v-model="documento" standout="bg-teal text-white" label="Ingrese Número de documento" type="tel" maxlength="10" mask="##########" />
                </div>

                <div class="contem2">
                  <label>CELULAR</label>
                  <q-input v-model="numeroCelular" standout="bg-teal text-white" label="Ingrese un número de celular" type="tel" maxlength="10" mask="##########" />

                  <label>DV</label>
                  <q-input v-model="dv" standout="bg-teal text-white" label="Ingrese DV" />

                  <label>DIRECCIÓN</label>
                  <q-input v-model="direccion" standout="bg-teal text-white" label="Ingrese una dirección" />
                </div>

                <div class="contem3">
                  <label>EMAIL</label>
                  <q-input v-model="email" standout="bg-teal text-white" label="Ingrese un email" type="email" />
                </div>
              </div>

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
            <th class="text-right">TOTAL</th>
            <th class="text-right">OPCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cliente, index) in clientes" :key="index">
            <td class="text-left">{{ cliente.nombre }}</td>
            <td class="text-right">{{ cliente.id }}</td>
            <td class="text-right">{{ cliente.fecha }}</td>
            <td class="text-right">{{ cliente.total }}</td>
            <td class="text-right">
              <q-btn icon="delete" color="red" flat @click="eliminarCliente(index)" />
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
    
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
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
.contem-the-imputs{
  display: grid;
  grid-template-columns: 33% 33% 33%;
  gap:10px ;
}
.Name-the-header{
  font-size: xx-large;
  margin: 3%;
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
  height: 90%;
  position: fixed;  
  background: #DCD7C9;
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
    import { ref } from 'vue'
    import { useAdminStore } from '../store/administrador';
    import { useRouter } from 'vue-router';
    import Swal from 'sweetalert2'
   
    
const store= useAdminStore()
const userName= store.userName
const rightDrawerOpen = ref(false)
const usuario = ref("Usuario"); 
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
    
    
    
    
    function toggleRightDrawer () {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }
    
    const cerrarSesion = () => {
      Swal.fire({
        title: "¿Seguro que quieres salir?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token');
          sessionStorage.clear();
    
          router.push('/');
        }
      });
    };
    
    function facturas(){
      router.replace("/home")
    
    }

    function item(){
  router.replace("/items")

}

const mostrarCarta = ref(false);

function mas() {
  mostrarCarta.value = true;
  console.log("Abrir formulario");
}

function cerrar() {
  mostrarCarta.value = false;
   console.log("Cerrar formulario");
}

function registrar() {
  if (!nombre.value || !tipoDocumento.value || !documento.value || !numeroCelular.value || !direccion.value || !email.value) {
    Swal.fire("Error", "Todos los campos son obligatorios", "error");
    return;
  }

  loading.value = true;

  // Agregar cliente
  clientes.value.push({
    id: clientes.value.length + 1,
    nombre: nombre.value,
    tipoDocumento: tipoDocumento.value,
    documento: documento.value,
    numeroCelular: numeroCelular.value,
    dv: dv.value,
    direccion: direccion.value,
    email: email.value,
    fecha: new Date().toLocaleDateString(),
    total: Math.floor(Math.random() * 100) + 1
  });

  // Limpiar formulario
  nombre.value = '';
  tipoDocumento.value = '';
  documento.value = '';
  numeroCelular.value = '';
  dv.value = '';
  direccion.value = '';
  email.value = '';

  loading.value = false;
  mostrarCarta.value = false;

  Swal.fire("Éxito", "Cliente registrado correctamente", "success");
}
 
</script>
    
    
