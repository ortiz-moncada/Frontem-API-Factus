<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <div class="Contenedor">

      <div class="Tabla">
        
        <h2 class="tituloTabla">FACTURAS
          <img class="imgF" src="https://cdn-icons-png.flaticon.com/128/1611/1611154.png" alt="">
        </h2>
        <q-btn class="mas" label="+" @click="mas" />

        <div class="card">
        <q-card class="mycard" v-if="mostrarCarta">
          <q-card-section>
            <div class="contem-in-the-card">
              <div>
                <label class="Name-the-header"><h3>Crear Factura</h3></label>
                <q-btn flat style="color: #3F4F44" label="X" class="btn" @click="cerrar" />
              </div>

              <div class="contem-the-imputs"> 
                <div class="contem1">
                  <label>Cliente</label>
                  <q-select v-model="clienteF" standout="bg-teal text-white" label="Seleccione un cliente" />
                  <br><br>
                  <label>Forma de pago</label>
                  <q-select v-model="fechaV" standout="bg-teal text-white" label="Seleccione  forma de pago" />
                  <br><br>
                </div>
                
                <div class="contem2">
                  <label>Item</label>
                  <q-select v-model="itemF" standout="bg-teal text-white" label="Seleccione un item"  />
                  <br><br>
                  <label>Fecha de vencimiento</label>
                  <q-input v-model="itemF" standout="bg-teal text-white" label="Anote fecha de vencimiento"  />
                  <br><br>
                  
                </div>

                <div class="contem3">
                  <label>CODIGO DE REFERENCIA</label>
                  <q-input v-model="codigoReferencia" standout="bg-teal text-white" label="Ingrese codigo de referencia"  />
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
            <th class="text-right">TOTAL</th>
            <th class="text-right">OPCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(factura, index) in factura" :key="index">
            <td class="text-left">{{ factura.clienteF }}</td>
            <td class="text-right">{{ factura.itemF }}</td>
            <td class="text-right">{{ factura.codigoReferencia }}</td>
            <td class="text-right">{{ factura.FormaPago }}</td>
            <td class="text-right">{{ factura.fechaV }}</td>
            <td class="text-right">
              <q-btn icon="visibility" color="blue" flat @click="VerFactura(index)" />
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
.imgF{
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
import { ref } from 'vue'
import { useAdminStore } from '../store/administrador';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'

const store= useAdminStore()
const userName= store.userName
const rightDrawerOpen = ref(false)
const router = useRouter();
const clienteF = ref('');
const itemF = ref('');
const codigoReferencia = ref('');
const FormaPago = ref('');
const fechaV = ref('');


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

function item(){
  router.replace("/items")

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
  if (!clienteF.value || !itemF.value || !codigoReferencia.value || !FormaPago.value || !fechaV.value) {
    Swal.fire("Error", "Todos los campos son obligatorios", "error");
    return;
  }

  loading.value = true;

  // Agregar cliente
  factura.value.push({
    id: factura.value.length + 1,
    cliente:clienteF.value,
    item: itemF.value,
    codigoReferencia: codigoReferencia.value,
    FormaPago: FormaPago.value,
    fechaV:fechaV.value,
    fecha: new Date().toLocaleDateString(),
    total: Math.floor(Math.random() * 100) + 1
  });

  // Limpiar formulario
  clienteF.value = '';
  itemF.value = '';
  codigoReferencia.value = '';
  FormaPago.value = '';
  fechaV.value = '';

  loading.value = false;
 mostrarCarta.value= false;


  Swal.fire({
  position: "center",
  icon: "success",
  title: "Cliente registrado con exito",
  showConfirmButton: false,
  timer: 1500
});
}


</script>


