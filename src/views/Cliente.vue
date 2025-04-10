<template>
  <div class="Contenedor">
    <div class="Tabla">
      <h2 class="tituloTabla">
        CLIENTES
        <img class="imgC" src="https://cdn-icons-png.flaticon.com/128/6676/6676016.png" alt="">
      </h2>

      <q-btn class="mas" label="Nuevo Cliente" @click="mas" />

      <div class="card" v-if="mostrarCarta">
        <q-card class="mycard custom-modal">
          <q-card-section class="edid">
            <div class="row justify-between items-center">
              <h3 class="q-ma-none">Crear Cliente</h3>
              <q-btn flat round icon="close" color="white" @click="cerrar" />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-md">
            <div class="row q-col-gutter-md">
              <!-- Primera columna -->
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label class="form-label">NOMBRES</label>
                  <q-input 
                    v-model="clienteData.names" 
                    outlined 
                    class="custom-input"
                    label="Nombre completo" 
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">TIPO DE DOCUMENTO</label>
                  <q-select 
                    v-model="tipoDocumentoSeleccionado" 
                    :options="tiposDocumento" 
                    class="custom-input popup-select"
                    popup-content-class="select-popup-content"
                    behavior="menu"
                    outlined
                    option-label="name"
                    option-value="id"
                    label="Seleccione tipo de documento" 
                    :rules="[val => !!val || 'Campo requerido']"
                    @update:model-value="updateDocumentType"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">NÚMERO DE IDENTIFICACIÓN</label>
                  <q-input 
                    v-model="clienteData.identification" 
                    outlined 
                    type="number"
                    class="custom-input"
                    label="Número de documento" 
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">DV</label>
                  <q-input 
                    v-model="clienteData.dv" 
                    outlined 
                    type="number"
                    class="custom-input"
                    maxlength="1"
                    label="Dígito de verificación" 
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div>
              </div>

              <!-- Segunda columna -->
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label class="form-label">TELÉFONO</label>
                  <q-input 
                    v-model="clienteData.phone" 
                    outlined 
                    type="tel"
                    maxlength="10"
                    class="custom-input"
                    label="Número de teléfono" 
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">CORREO ELECTRÓNICO</label>
                  <q-input 
                    v-model="clienteData.email" 
                    outlined 
                    type="email"
                    class="custom-input"
                    label="Correo electrónico" 
                    :rules="[
                      val => !!val || 'Campo requerido',
                      val => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'Email inválido'
                    ]"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">DIRECCIÓN</label>
                  <q-input 
                    v-model="clienteData.address" 
                    outlined
                    class="custom-input" 
                    label="Dirección completa"
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">MUNICIPIO</label>
                  <q-select 
                    v-model="municipioSeleccionado" 
                    :options="municipios" 
                    outlined
                    class="custom-input popup-select"
                    popup-content-class="select-popup-content"
                    behavior="menu"
                    option-label="name"
                    option-value="id"
                    label="Seleccione municipio"
                    :rules="[val => !!val || 'Campo requerido']"
                    @update:model-value="updateMunicipality"
                  />
                </div>
              </div>

              <!-- Campos adicionales en una sola fila -->
              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">RÉGIMEN TRIBUTARIO</label>
                  <q-select 
                    v-model="tributoSeleccionado" 
                    :options="tiposTributos" 
                    outlined
                    option-label="name"
                    option-value="id"
                    class="custom-input popup-select"
                    popup-content-class="select-popup-content"
                    behavior="menu"
                    label="Seleccione régimen tributario"
                    :rules="[val => !!val || 'Campo requerido']"
                    @update:model-value="updateTribute"
                  />
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-white q-pa-md">
            <q-btn flat label="Cancelar" color="negative" @click="cerrar" />
            <q-btn :loading="loading" label="REGISTRAR" class="boton-personalizado" @click="registrar">
              <template v-slot:loading>
                <q-spinner-dots color="white" />
              </template>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <!-- Tabla con Quasar -->
      <q-table
        :rows="clientes"
        :columns="columns"
        row-key="identification"
        dense
        class="my-table"
        dark
        flat
        bordered
        separator="cell"
      >
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props">
            <q-btn icon="visibility" color="blue-4" flat @click="verCliente(props.row)" />
            <q-btn icon="edit_square" color="blue-7" flat @click="editarCliente(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';
import apiCliente from '../plugins/axios';
import axios from '../plugins/factus'
import Swal from 'sweetalert2';

const $q = useQuasar()


const router = useRouter();
const loading = ref(false);
const clientes = ref([]);
const mostrarCarta = ref(false);

// Datos del formulario
const clienteData = ref({
  identification: null,
  dv: "3",
  names: '',
  address: '',
  email: '',
  phone: null,
  identification_document_id: "3",
  tribute_id: "21",
  municipality_id: null
});


function notifySucess(message) {
  $q.notify({
    message: message,
    color: "green", // Color correcto
  });
}
function notifyEroor(message) {
  $q.notify({
    message: message,
    color: "red", // Color correcto
  });
}

// Seleccionados
const tipoDocumentoSeleccionado = ref(null);
const tributoSeleccionado = ref(null);
const municipioSeleccionado = ref(null);

// Opciones para selects
const tiposDocumento = ref([]);
const tiposTributos = ref([]);
const municipios = ref([]);

// Funciones de actualización para los campos seleccionados
function updateDocumentType(selected) {
  if (selected) {
    clienteData.value.identification_document_id = selected.id;
  }
}

function updateTribute(selected) {
  if (selected) {
    clienteData.value.tribute_id = selected.id;
  }
}

function updateMunicipality(selected) {
  if (selected) {
    clienteData.value.municipality_id = selected.id;
  }
}

// Cargar tipos de documento
async function loadDocumentTypes() {
  try {
    const response = await axios.get('/v1/identification-documents');
    if (response && response.data && response.data.data) {
      tiposDocumento.value = response.data.data.map(doc => ({
        id: doc.id,
        name: doc.name,
        value: doc.id,
        label: doc.name
      }));
    } else {
      console.error('Formato de respuesta inesperado para tipos de documento:', response);
      tiposDocumento.value = [
        { id: 1, name: 'Cédula de Ciudadanía', value: 1, label: 'Cédula de Ciudadanía' },
        { id: 2, name: 'Cédula de Extranjería', value: 2, label: 'Cédula de Extranjería' },
        { id: 3, name: 'Tarjeta de Identidad', value: 3, label: 'Tarjeta de Identidad' },
        { id: 4, name: 'RUT', value: 4, label: 'RUT' },
        { id: 5, name: 'DNI', value: 5, label: 'DNI' }
      ];
    }
  } catch (error) {
    console.error('Error al cargar tipos de documento:', error);
    // Valores por defecto en caso de error
    tiposDocumento.value = [
      { id: 1, name: 'Cédula de Ciudadanía', value: 1, label: 'Cédula de Ciudadanía' },
      { id: 2, name: 'Cédula de Extranjería', value: 2, label: 'Cédula de Extranjería' },
      { id: 3, name: 'Tarjeta de Identidad', value: 3, label: 'Tarjeta de Identidad' },
      { id: 4, name: 'RUT', value: 4, label: 'RUT' },
      { id: 5, name: 'DNI', value: 5, label: 'DNI' }
    ];
  }
}

// Cargar tributos
async function loadTributes() {
  try {
    const response = await axios.get('/v1/tributes');
    if (response && response.data && response.data.data) {
      tiposTributos.value = response.data.data.map(tribute => ({
        id: tribute.id,
        name: tribute.name,
        value: tribute.id,
        label: tribute.name
      }));
    } else {
      console.error('Formato de respuesta inesperado para tributos:', response);
      tiposTributos.value = [
        { id: 1, name: 'Régimen Común', value: 1, label: 'Régimen Común' },
        { id: 2, name: 'Régimen Simplificado', value: 2, label: 'Régimen Simplificado' },
        { id: 3, name: 'Régimen Especial', value: 3, label: 'Régimen Especial' }
      ];
    }
  } catch (error) {
    console.error('Error al cargar tributos:', error);
    // Valores por defecto en caso de error
    tiposTributos.value = [
      { id: 1, name: 'Régimen Común', value: 1, label: 'Régimen Común' },
      { id: 2, name: 'Régimen Simplificado', value: 2, label: 'Régimen Simplificado' },
      { id: 3, name: 'Régimen Especial', value: 3, label: 'Régimen Especial' }
    ];
  }
}

// Cargar municipios
async function loadMunicipalities() {
  try {
    const response = await axios.get('/v1/municipalities');
    if (response && response.data && response.data.data) {
      municipios.value = response.data.data.map(mun => ({
        id: mun.id,
        name: mun.name,
        value: mun.id,
        label: mun.name
      }));
    } else {
      console.error('Formato de respuesta inesperado para municipios:', response);
      municipios.value = [
        { id: 1, name: 'Bogotá', value: 1, label: 'Bogotá' },
        { id: 2, name: 'Medellín', value: 2, label: 'Medellín' },
        { id: 3, name: 'Cali', value: 3, label: 'Cali' },
        { id: 4, name: 'Barranquilla', value: 4, label: 'Barranquilla' }
      ];
    }
  } catch (error) {
    console.error('Error al cargar municipios:', error);
    // Valores por defecto en caso de error
    municipios.value = [
      { id: 1, name: 'Bogotá', value: 1, label: 'Bogotá' },
      { id: 2, name: 'Medellín', value: 2, label: 'Medellín' },
      { id: 3, name: 'Cali', value: 3, label: 'Cali' },
      { id: 4, name: 'Barranquilla', value: 4, label: 'Barranquilla' }
    ];
  }
}

// Columnas de la tabla
const columns = [
  { name: 'names', required: true, label: 'CLIENTE', align: 'left', field: 'names' },
  { name: 'identification', label: 'DOCUMENTO', align: 'center', field: 'identification' },
  { name: 'dv', label: 'DV', align: 'center', field: 'dv' },
  { name: 'phone', label: 'TELÉFONO', align: 'center', field: 'phone' },
  { name: 'email', label: 'EMAIL', align: 'center', field: 'email' },
  { name: 'address', label: 'DIRECCIÓN', align: 'center', field: 'address' },
  { name: 'opciones', label: 'OPCIONES', align: 'center' }
];

// Obtener clientes
async function getClientes() {
  try {
    const response = await apiCliente.get('/customer/customer');
    clientes.value = response.data;
  } catch (error) {
    console.error("Error al cargar clientes:", error);
    notifyEroor('No se pudieron cargar los clientes')
  }
}

// Registrar cliente
async function registrar() {
  // Verificar que todos los campos requeridos estén completos
  const camposRequeridos = [
    'identification', 'dv', 'names', 'address', 'email', 
    'phone', 'identification_document_id', 'tribute_id', 'municipality_id'
  ];
  
  const camposFaltantes = camposRequeridos.filter(campo => !clienteData.value[campo]);
  
  if (camposFaltantes.length > 0) {
    notifyEroor('Todos los campos son obligatorios')

    return;
  }

  try {
    loading.value = true;
    const response = await apiCliente.post('/customer/', clienteData.value);
    
    // Actualizar lista de clientes
    await getClientes();
    
    // Cerrar modal y limpiar formulario
    mostrarCarta.value = false;
    resetForm();
    
    notifySucess('Registrado con exito')
  } catch (error) {
    console.error("Error al registrar cliente:", error);
    this.notifyEroor('No se pudo Registrar')
  } finally {
    loading.value = false;
  }
}

// Resetear formulario
function resetForm() {
  clienteData.value = {
    identification: null,
    dv: null,
    names: '',
    address: '',
    email: '',
    phone: null,
    identification_document_id: null,
    tribute_id: null,
    municipality_id: null
  };
  tipoDocumentoSeleccionado.value = null;
  tributoSeleccionado.value = null;
  municipioSeleccionado.value = null;
}

// Ver detalles del cliente
function verCliente(cliente) {
   Swal.fire({
     title: "Detalles del Cliente",
     html: `
          <div class="contem">
        <div class="q-pa-md">
          <div class="caji"><p><strong>Nombre:</strong></p></div>
         <div class="cajo"><p> ${cliente.names}</p></div>
 
         <div class="caji"><p><strong>Documento:</strong></p></div>
         <div class="cajo"><p> ${cliente.identification}</p></div>
 
         <div class="caji"><p><strong>DV:</strong></p></div>
         <div class="cajo"><p> ${cliente.dv}</p></div>
 
         <div class="caji"><p><strong>Teléfono:</strong></p></div>
         <div class="cajo"><p> ${cliente.phone}</p></div> 
 
         <div class="caji"><p><strong>Email:</strong> </p></div>
         <div class="cajo"><p> ${cliente.email}</p></div>
 
         <div class="caji"><p><strong>Dirección:</strong> </p></div>
         <div class="cajo"><p> ${cliente.address}</p></div>
 
       </div>
       </div>
      
     `,
     confirmButtonText: "Cerrar",
     confirmButtonColor: "#2C3930"
   });
 }
// Editar cliente
async function editarCliente(cliente) {
  try {
    // Asignar datos al formulario
    clienteData.value = { ...cliente };
    
    // Esperar a que las opciones estén cargadas
    await Promise.all([
      loadDocumentTypes(),
      loadTributes(),
      loadMunicipalities()
    ]);
    
    // Buscar y asignar las opciones seleccionadas
    tipoDocumentoSeleccionado.value = tiposDocumento.value.find(
      tipo => tipo.id === parseInt(cliente.identification_document_id)
    );
    
    tributoSeleccionado.value = tiposTributos.value.find(
      tributo => tributo.id === parseInt(cliente.tribute_id)
    );
    
    municipioSeleccionado.value = municipios.value.find(
      municipio => municipio.id === parseInt(cliente.municipality_id)
    );
    
    // Mostrar modal
    mostrarCarta.value = true;
  } catch (error) {
    console.error("Error al editar cliente:", error);
    Swal.fire("Error", "No se pudieron cargar los datos del cliente", "error");
  }
}

// Mostrar formulario de creación
async function mas() {
  try {
    resetForm();
    
    // Cargar datos para los selectores
    await Promise.all([
      loadDocumentTypes(),
      loadTributes(),
      loadMunicipalities()
    ]);
    
    mostrarCarta.value = true;
  } catch (error) {
    console.error("Error al preparar formulario:", error);
    Swal.fire("Error", "No se pudo cargar el formulario", "error");
  }
}

// Cerrar formulario
function cerrar() {
  mostrarCarta.value = false;
  resetForm();
}

// Cargar clientes al iniciar
onMounted(async () => {
  await getClientes();
  
  // Pre-cargar datos para selectores
  await Promise.all([
    loadDocumentTypes(),
    loadTributes(),
    loadMunicipalities()
  ]);
});
</script>

<style>
.imgC {
  height: 50px;
  width: 50px;
}
.edid{
  background-color: #1E2921;
  color: white;

}
.swal2-popup {
  width: 70%;
}
.q-pa-md{
  text-align: start;
  display: grid;
  grid-template-columns: 50% 50%;
  border: 1px black solid;
  border-radius: 15px;
}

.caji,.cajo{
  border-radius: 15px 0% 0px 15px;
  color: black;
  background:#acacac;
  border: 1px rgb(255, 255, 255) solid;
  text-align: center;
  margin-top: 2%;
}
.cajo{
  background: #d7d7d7;
  border-radius: 0% 15px 15px 0px ;
}

.tituloTabla {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
}

.my-table {
  background: #2C3930;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
}

.custom-modal {
  max-width: 900px;
  width: 90%;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #2C3930;
  font-size: 0.9rem;
}

.custom-input {
  width: 100%;
}

.custom-input .q-field__control {
  border-radius: 8px;
}

/* Asegura que el menú desplegable de q-select aparezca por encima del modal */
.popup-select .q-menu {
  z-index: 10001 !important; /* Mayor que el z-index del modal (9999) */
}

/* Aplicar z-index alto a todos los menús emergentes */
.q-menu {
  z-index: 10001 !important;
}

/* Clase específica para el contenido del popup */
.select-popup-content {
  z-index: 10001 !important;
}

.boton-personalizado {
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 8px;
  background-color: #2C3930;
  color: white;
}

.mas {
  border-radius: 8px;
  margin-top: -5%;
  margin-left: 80%;
  position: relative;
  background-color:#4A5D52;
  color: white;
}

.Contenedor {
  padding: 20px;
}

.Tabla {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;
}

/* Estilo para los encabezados de la tabla */
.my-table .q-table__top,
.my-table thead tr:first-child th {
  background-color: #1E2921;
  color: white;
}

/* Estilo para las filas de la tabla */
.my-table tbody tr:nth-child(even) {
  background-color: #384940;
}

.my-table tbody tr:hover {
  background-color: #4A5D52;
}

/* Estilo para los botones de acción */
.my-table .q-btn {
  margin: 0 5px;
}

/* Estilo para los mensajes de error de validación */
.q-field__bottom {
  color: #FF5252;
  font-size: 0.8rem;
}

/* Estilo para los modal cuando está activo */
.card {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: all 0.3s ease;
}
</style>