<template>
    <div class="home-container">
      <q-layout  view="hHh lpR fFf">
        <q-header elevated class="Enca">
          <q-toolbar>
            <q-toolbar-title>
              <q-avatar>
                <div class="fon">
                  <img class="img" src="https://cdn-icons-png.flaticon.com/128/3884/3884880.png">
                </div>
                
              </q-avatar>
              Gestión de Facturación Digital
            </q-toolbar-title>
            <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
          </q-toolbar>
        </q-header>
  
        <q-drawer v-model="rightDrawerOpen" side="right" bordered>
          <div class="caja1">
            <img class="imagen" src="https://img.freepik.com/vector-gratis/gradiente-verde-ola-3d-lujo-fondo-oscuro-abstracto-moderno_343694-3033.jpg?semt=ais_hybrid" alt="Background">
            <div class="perfil">
              <img class="imagen2" src="https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small_2x/user-icon-on-transparent-background-free-png.png" alt="User Profile">
            </div>
          </div>
          <div class="caja2">
            <label class="nombre" for="nombre-usuario">{{ userName }}</label><br>
          </div>
          <div class="caja3">
            <q-btn @click="navigateTo('factura')" class="full-width" label="Facturas" />
            <q-btn @click="navigateTo('items')" class="full-width" label="Productos" />
            <q-btn @click="navigateTo('cliente')" class="full-width" label="Clientes" />
          </div>
          <div class="caja4">
            <q-btn class="cerrar" @click="cerrarSesion()" color="red-10" glossy label="Cerrar Sesión" />
          </div>
        </q-drawer>

        <q-page-container>
          <div class="content-wrapper">
            <router-view />
          </div>
        </q-page-container>
      </q-layout>


    </div>
  </template>
  
<script>
  export default {
    name: 'HomeView',
    data() {
      return {
        rightDrawerOpen: false,
        userName: 'Usuario Administrador'
      }
    },
    methods: {
      toggleRightDrawer() {
        this.rightDrawerOpen = !this.rightDrawerOpen;
      },
      navigateTo(route) {
        this.$router.push(`/${route}`);
      },
      cerrarSesion() {
        // Reset any user data or tokens
        localStorage.removeItem('user-token');
        // Redirect to login page
        this.$router.push('/');
      }
    }
  }
</script>
  
<style >
*{
  margin: 0%;
  padding: 0%;
}  
.Enca{
  background-color: #2C3930;
  color: white;
}
  
  .caja1 {
    position: relative;
    height: 40%;
    width: 100%;
  }
  .fon{
    background: white;
  }
  .img{
    max-width: 100%;
  }
  
  .imagen {
    width: 100%;
    height: 100%;

  }
  
  .perfil {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid white;
  }
  
  .imagen2 {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
  
  .caja2 {
    padding: 10px 0;
    text-align: center;
  }
  
  .nombre {
    font-size: 1.2rem;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
  }
  
  .caja3 {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
  
  .caja3 .q-btn {
    background-color: #DCD7C9;
    color: #2C3930;
    font-weight: 500;
    border: 1px solid #2C3930;
    transition: all 0.3s ease;
  }
  
  .caja3 .q-btn:hover {
    background-color: #2C3930;
    color: #DCD7C9;
  }
  
  .caja4 {
    padding: 10px;
    display: flex;
    justify-content: center;
  }
  
  .cerrar {
    width: 90%;
    height: 30%;
    margin-left: -1%;
    margin-top: 25%;
  }
  
  @media (max-width: 600px) {
    .caja1 {
      height: 150px;
    }
    
    .perfil {
      width: 80px;
      height: 80px;
    }
  }
</style>