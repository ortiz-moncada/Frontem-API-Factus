<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <div class="Contenedor">

      <div class="Tabla">
        
        <h2 class="tituloTabla">FACTURAS</h2>

        <q-markup-table dark class="bg-indigo-8">
      <thead>
        <tr>
          <th class="text-left">CLIENTE </th>
          <th class="text-right">ID</th>
          <th class="text-right">FECHA</th>
          <th class="text-right">TOTAL</th>
          <th class="text-right">OPCIONES</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">KSPKOK</td>
          <td class="text-right">159</td>
          <td class="text-right">6</td>
          <td class="text-right">24</td>
          <td class="text-right">4</td>
          
        </tr>
        <tr>
          <td class="text-left">NUHNO</td>
          <td class="text-right">237</td>
          <td class="text-right">9</td>
          <td class="text-right">37</td>
          <td class="text-right">4.3</td>
          
        </tr>
        <tr>
          <td class="text-left">Eclair</td>
          <td class="text-right">262</td>
          <td class="text-right">16</td>
          <td class="text-right">23</td>
          <td class="text-right">6</td>
          
        </tr>
        <tr>
          <td class="text-left">Cupcake</td>
          <td class="text-right">305</td>
          <td class="text-right">3.7</td>
          <td class="text-right">67</td>
          <td class="text-right">4.3</td>
          
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
const usuario = ref("Usuario"); 
const router = useRouter();



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


</script>


