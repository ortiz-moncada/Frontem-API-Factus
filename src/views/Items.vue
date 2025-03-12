<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    
        <div class="Contenedor">
    
          <div class="Tabla">
            <h2 class="tituloTabla">ITEMS
              <img class="imgI" src="https://cdn-icons-png.flaticon.com/128/6680/6680236.png" alt="">
            </h2>
            <q-btn class="mas" label="+" @click="mas" />
            <div class="card">
        <q-card class="mycard" v-if="mostrarCarta">
          <q-card-section>
            <div class="contem-in-the-card">
              <div>
                <label class="Name-the-header"><h3>Crear Item</h3></label>
                <q-btn flat style="color: #3F4F44" label="X" class="btn" @click="cerrar" />
              </div>

              <div class="contem-the-imputs"> 
                <div class="contem1">
                  <label>NOMBRE</label>
                  <q-input v-model="nombre" standout="bg-teal text-white" label="Ingrese  nombre del item" />
                  <br><br>
                  
                  <label>PRECIO</label>
                  <q-input v-model="precio" standout="bg-teal text-white" label="ingrese valor del producto" type="number" />
                </div>
                
                <div class="contem2">
                  <label>CODIGO DE REFERENCIA</label>
                  <q-input v-model="codigoReferencia"  standout="bg-teal text-white" label="Ingrese codigo del producto" type="number"/>
                  <br><br>
                </div>

                <div class="contem3">
                  <label>IMPUESTO</label>
                  <q-input v-model="impuesto" standout="bg-teal text-white" label="Ingrese inpuesto del producto" type="number" />
                  <br><br>
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
            <th class="text-left">ITEMS</th>
            <th class="text-right">PRECIO</th>
            <th class="text-right">CODIGO DE REFERENCIA</th>
            <th class="text-right">IMPUESTO</th>
            <th class="text-right">OPCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(items, index) in items" :key="index">
            <td class="text-left">{{ items.nombre }}</td>
            <td class="text-right">{{ items.precio }}</td>
            <td class="text-right">{{ items.codigoReferencia }}</td>
            <td class="text-right">{{ items.impuesto }}</td>
            <td class="text-right">
              <q-btn icon="visibility" color="blue" flat @click="verItem(index)" />
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
.imgI{
  height: 50px;
  width: 50px;
}
    .mas{
      margin-top: -12%;
      margin-left: 85%;
      background-color: antiquewhite;
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
    import Swal from 'sweetalert2'
    import axios from 'axios';
    
    const store= useAdminStore()
    const userName= store.userName
    const rightDrawerOpen = ref(false)

    const router = useRouter();
    const nombre =  ref('');
    const precio =   ref('');
    const codigoReferencia = ref('');
    const impuesto = ref('');
    const items = ref([]);
    const loading = ref(false);


  
    async function getItems() {
  try {
    const response = await axios.get('http://localhost:3999/factus/items/items');

    // Asegurar que los datos sean asignados correctamente
    items.value = response.data.map(items => ({
      id: items.unit_measure_id,  
      nombre: items.name || 'Sin Nombre', 
      precio: items.price, 
      impuesto: items.tax_rate, 
    }));

    console.log("Items cargados:", items.value); // Verifica los datos en la consola
  } catch (error) {
    console.error("Error al obtener items:", error);
    Swal.fire("Error", "No se pudieron cargar los items", "error");
  }
}

    
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
      router.replace("/factura")
    
    }

    function cliente(){
      router.replace("/cliente")
    
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
  if (!nombre.value || !precio.value || !codigoReferencia.value || !impuesto.value) {
    Swal.fire("Error", "Todos los campos son obligatorios", "error");
    return;
  }

  // Agregar 
 items.value.push({
  id: items.value.length + 1,
      nombre: nombre.value,
      precio: precio.value,
      codigoReferencia: codigoReferencia.value,
      impuesto: impuesto.value,
      fecha: new Date().toLocaleDateString(),
      total: Math.floor(Math.random() * 100) + 1
 })

  // Limpiar formulario
  nombre.value = '';
  precio.value = '';
  codigoReferencia.value = '';
  impuesto.value = '';

  loading.value = false;
  mostrarCarta.value=false;


  Swal.fire({
  position: "center",
  icon: "success",
  title: "Cliente registrado con exito",
  showConfirmButton: false,
  timer: 1500
});
}
onMounted(() => {
  getItems();
});

    </script>
    