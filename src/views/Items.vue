<template>
  <div class="Contenedor">
    <div class="Tabla">
      <h2 class="tituloTabla">
        PRODUCTOS
        <img class="imgI" src="https://cdn-icons-png.flaticon.com/128/6680/6680236.png" alt="">
      </h2>
      
      <q-btn class="mas"  label="Nuevo Producto" @click="mas" />
      
      <div class="card">
        <q-card class="custom-modal" v-if="mostrarCarta">
          <q-card-section class="elfor">
            <div class="row justify-between items-center">
              <h3 class="q-ma-none">Crear Producto</h3>
              <q-btn flat round icon="close" color="white" @click="cerrar" />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-md" >
            <div class="row q-col-gutter-md">
              <!-- Primera columna -->
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label class="form-label">NOMBRE DEL PRODUCTO</label>
                  <q-input 
                    v-model="itemData.name" 
                    outlined 
                    class="custom-input"
                    label="Nombre del producto" 
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div>

                

                <div class="form-group">
                  <label class="form-label">PRECIO</label>
                  <q-input 
                    v-model="itemData.price" 
                    outlined 
                    type="number"
                    class="custom-input"
                    prefix="$"
                    label="Precio unitario" 
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">CANTIDAD</label>
                  <q-input 
                    v-model="itemData.quantity" 
                    outlined 
                    type="number"
                    class="custom-input"
                    label="Cantidad disponible" 
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div>
              </div>

              <!-- Segunda columna -->
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label class="form-label">UNIDAD DE MEDIDA</label>
                  <q-select 
                    v-model="unidadMedidaSeleccionada" 
                    :options="unitMeasureOptions" 
                    outlined
                    option-label="name"
                    option-value="id"
                    class="custom-input"
                    label="Seleccione unidad de medida"
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div>

 <div class="form-group">
                  <label class="form-label">CÓDIGO DE REFERENCIA</label>
                  <q-input 
                    v-model="itemData.code_reference" 
                    outlined 
                    type="number"
                    class="custom-input"
                    label="Código de referencia" 
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">CÓDIGO ESTÁNDAR</label>
                  <q-select 
                    v-model="codigoEstandarSeleccionado" 
                    :options="standardCodeOptions" 
                    outlined
                    option-label="label"
                    option-value="value"
                    class="custom-input"
                    label="Seleccione código estándar"
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div> 

                <div class="form-group">
                  <label class="form-label">RÉGIMEN TRIBUTARIO</label>
                  <q-select 
                    v-model="tributoSeleccionado" 
                    :options="tributeOptions" 
                    outlined
                    option-label="name"
                    option-value="id"
                    class="custom-input"
                    label="Seleccione régimen tributario"
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div> 

                <div class="form-group">
                  <label class="form-label">PORCENTAJE DE DESCUENTO</label>
                  <q-input 
                    v-model="itemData.discount_rate" 
                    outlined 
                    type="number"
                    suffix="%"
                    class="custom-input"
                    label="Porcentaje de descuento" 
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div>
              </div>
              
              
              <!-- Tercera fila - Impuestos de retención -->
              <div class="col-12">
                <div class="form-group">
                  <div class="row items-center justify-between">
                    <label class="form-label">IMPUESTOS DE RETENCIÓN</label>
                    <q-btn dense flat  icon="add" @click="agregarImpuesto" label="Agregar impuesto" />
                  </div>
                  
                  <div v-for="(impuesto, index) in itemData.withholding_taxes" :key="index" class="q-mb-sm">
                    <div class="row q-col-gutter-sm">
                      <div class="col-5">
                        <q-input 
                          v-model="impuesto.code" 
                          outlined 
                          type="number"
                          dense
                          label="Código" 
                          :rules="[val => !!val || 'Requerido']"
                        />
                      </div>
                      <div class="col-5">
                        <q-input 
                          v-model="impuesto.withholding_tax_rate" 
                          outlined 
                          type="number"
                          dense
                          suffix="%"
                          label="Tasa" 
                          :rules="[val => !!val || 'Requerido']"
                        />
                      </div>
                      <div class="col-2 flex items-center">
                        <q-btn dense flat color="negative" icon="delete" @click="eliminarImpuesto(index)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Cuarta fila - Exclución -->
              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">PRODUCTO EXCLUIDO</label>
                  <q-option-group
                    v-model="itemData.is_excluded"
                    :options="opcionesExcluido"
                    color="primary"
                    inline
                  />
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-white q-pa-md">
            <q-btn flat label="Cancelar" color="negative" @click="cerrar" />
            <q-btn :loading="loading" label="REGISTRAR"  class="boton-personalizado" @click="registrar">
              <template v-slot:loading>
                <q-spinner-dots color="white" />
              </template>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <!-- Tabla de productos -->
      <q-table
        :rows="items"
        :columns="columns"
        row-key="code_reference"
        dense
        class="my-table"
        dark
        flat
        bordered
        separator="cell"
      >
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props">
            <q-btn icon="visibility" color="blue-4" flat @click="verItem(props.row)" />
            <q-btn icon="edit_square" color="blue-7" flat @click="editarItem(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAdminStore } from '../store/administrador';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import apiClient from '../plugins/axios';


const store = useAdminStore();
const router = useRouter();
const loading = ref(false);
const items = ref([]);
const mostrarCarta = ref(false);


// Datos del formulario
const itemData = ref({
  code_reference: null,
  name: '',
  quantity: null,
  price: null,
  withholding_taxes: [],
  unit_measure_id: 70,
  standard_code_id: 1,
  is_excluded: 0,
  tribute_id: 1,
  discount_rate: 0
});

// Seleccionados
const unidadMedidaSeleccionada = ref(null);
const codigoEstandarSeleccionado = ref(null);
const tributoSeleccionado = ref(null);

// Opciones de selección
const unitMeasureOptions = ref([]);
const tributeOptions = ref([]);

// Opciones para código estándar
const standardCodeOptions = ref([
  { label: 'Estándar de adopción del contribuyente', value: 1 },
  { label: 'UNSPSC', value: 2 },
  { label: 'Partida Arancelaria', value: 3 },
  { label: 'GTIN', value: 4 },
]);

// Opciones predeterminadas (backup)
const unidadesMedida = ref([
  { id: 1, name: 'Unidad (UN)' },
  { id: 2, name: 'Kilogramo (KG)' },
  { id: 3, name: 'Caja (CJ)' },
  { id: 4, name: 'Metro (M)' },
  { id: 5, name: 'Litro (L)' }
]);

const codigosEstandar = ref([
  { id: 1, name: 'UNSPSC' },
  { id: 2, name: 'GTIN' },
  { id: 3, name: 'Código de barras' },
  { id: 4, name: 'Partida arancelaria' }
]);

const tiposTributos = ref([
  { id: 1, name: 'IVA 19%' },
  { id: 2, name: 'IVA 5%' },
  { id: 3, name: 'Consumo 8%' },
  { id: 4, name: 'Exento' }
]);

const opcionesExcluido = [
  { label: 'No', value: 0 },
  { label: 'Si', value: 1 }
];

// Columnas de la tabla
const columns = [
  { name: 'name', required: true, label: 'PRODUCTO', align: 'left', field: 'name' },
  { name: 'code_reference', label: 'CÓDIGO', align: 'center', field: 'code_reference' },
  { name: 'quantity', label: 'CANTIDAD', align: 'center', field: 'quantity' },
  { name: 'price', label: 'PRECIO', align: 'right', field: row => `$${row.price.toLocaleString()}` },
  { name: 'discount_rate', label: 'DESCUENTO', align: 'center', field: row => `${row.discount_rate}%` },
  { name: 'opciones', label: 'OPCIONES', align: 'center' }
];

// Watch para cambios en selecciones
computed(() => {
  if (unidadMedidaSeleccionada.value) {
    itemData.value.unit_measure_id = unidadMedidaSeleccionada.value.id;
  }
  if (codigoEstandarSeleccionado.value) {
    itemData.value.standard_code_id = codigoEstandarSeleccionado.value.value;
  }
  if (tributoSeleccionado.value) {
    itemData.value.tribute_id = tributoSeleccionado.value.id;
  }
});


// Cargar unidades de medida iniciales
async function loadInitialUnitMeasures() {
  try {
    const response = await axios.get('/v1/measurement-units');
    if (response && response.data && response.data.data) {
      unitMeasureOptions.value = response.data.data.map(unit => ({
        id: unit.id,
        name: unit.name,
        value: unit.id,
        label: unit.name
      }));
    } else {
      console.error('Formato de respuesta inesperado:', response);
      unitMeasureOptions.value = [];
      // Usar unidades de respaldo
      unitMeasureOptions.value = unidadesMedida.value;
    }
  } catch (error) {
    console.error('Error al cargar unidades de medida:', error);
    unitMeasureOptions.value = [];
    // Usar unidades de respaldo
    unitMeasureOptions.value = unidadesMedida.value;
  }
}

// Cargar tributos iniciales
async function loadInitialTributes() {
  try {
    const response = await axios.get('/v1/tributes/products');
    if (response && response.data && response.data.data) {
      tributeOptions.value = response.data.data.map(tribute => ({
        id: tribute.id,
        name: tribute.name,
        value: tribute.id,
        label: tribute.name
      }));
    } else {
      console.error('Formato de respuesta inesperado para tributos:', response);
      tributeOptions.value = [];
      // Usar tributos de respaldo
      tributeOptions.value = tiposTributos.value;
    }
  } catch (error) {
    console.error('Error al cargar tributos:', error);
    tributeOptions.value = [];
    // Usar tributos de respaldo
    tributeOptions.value = tiposTributos.value;
  }
}

// Obtener productos
async function getItems() {
  try {
    const response = await apiClient.get('/items/items');
    items.value = response.data;
  } catch (error) {
    console.error("Error al obtener items:", error);
    Swal.fire("Error", "No se pudieron cargar los productos", "error");
  }
}

// Funciones para impuestos de retención
function agregarImpuesto() {
  itemData.value.withholding_taxes.push({
    code: null,
    withholding_tax_rate: null
  });
}

function eliminarImpuesto(index) {
  itemData.value.withholding_taxes.splice(index, 1);
}

// Registrar producto
async function registrar() {
  // Verificar que todos los campos requeridos estén completos
 
  // Verificar impuestos de retención
  if (itemData.value.withholding_taxes.length > 0) {
    const impuestosInvalidos = itemData.value.withholding_taxes.some(
      impuesto => !impuesto.code || !impuesto.withholding_tax_rate
    );
    
    if (impuestosInvalidos) {
      Swal.fire("Error", "Complete todos los campos de impuestos", "error");
      return;
    }
  }

  try {
    loading.value = true;
    const response = await apiClient.post('/items', itemData.value);
    
    // Actualizar lista de productos
    await getItems();
    
    // Cerrar modal y limpiar formulario
    mostrarCarta.value = false;
    resetForm();
    
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Producto registrado con éxito",
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error("Error al registrar producto:", error);
    $q.notify({
          type: 'negative',
          message: 'This is a "negative" type notification.'
        });
  } finally {
    loading.value = false;
  }
}

// Resetear formulario
function resetForm() {
  itemData.value = {
    code_reference: null,
    name: '',
    quantity: null,
    price: null,
    withholding_taxes: [],
    unit_measure_id: 70,
    standard_code_id: 1,
    is_excluded: 0,
    tribute_id: 1,
    discount_rate: 0
  };
  unidadMedidaSeleccionada.value = null;
  codigoEstandarSeleccionado.value = null;
  tributoSeleccionado.value = null;
}

// Ver detalles del producto
function verItem(item) {
 // Buscar nombres para los IDs
 const unidadMedida = unitMeasureOptions.value.find(u => u.id === item.unit_measure_id)?.name || 'No especificado';
 const codigoEstandar = standardCodeOptions.value.find(c => c.value === item.standard_code_id)?.label || 'No especificado';
 const tributo = tributeOptions.value.find(t => t.id === item.tribute_id)?.name || 'No especificado';
 
 let impuestosHtml = '';
 if (item.withholding_taxes && item.withholding_taxes.length > 0) {
   impuestosHtml = '<p><strong>Impuestos de retención:</strong></p><ul>';
   item.withholding_taxes.forEach(imp => {
     impuestosHtml += `<li>Código: ${imp.code} - Tasa: ${imp.withholding_tax_rate}%</li>`;
   });
   impuestosHtml += '</ul>';
 } else {
   impuestosHtml = '<p><strong>Impuestos de retención:</strong> Ninguno</p>';
 }

 Swal.fire({
   title: "Detalles del Producto",
   html: `
     <div class="q-pa-md text-left">
       <p><strong>Nombre:</strong> ${item.name}</p>
       <p><strong>Código de referencia:</strong> ${item.code_reference}</p>
       <p><strong>Precio:</strong> $${item.price.toLocaleString()}</p>
       <p><strong>Cantidad:</strong> ${item.quantity}</p>
       <p><strong>Unidad de medida:</strong> ${unidadMedida}</p>
       <p><strong>Código estándar:</strong> ${codigoEstandar}</p>
       <p><strong>Régimen tributario:</strong> ${tributo}</p>
       <p><strong>Descuento:</strong> ${item.discount_rate}%</p>
       <p><strong>Excluido:</strong> ${item.is_excluded ? 'Sí' : 'No'}</p>
       ${impuestosHtml}
     </div>
   `,
   confirmButtonText: "Cerrar",
   confirmButtonColor: "#2C3930"
 });
}

// Editar producto
function editarItem(item) {
 // Asignar datos al formulario
 itemData.value = { ...item };
 
 // Buscar y asignar las opciones seleccionadas
 unidadMedidaSeleccionada.value = unitMeasureOptions.value.find(
   u => u.id === item.unit_measure_id
 );
 
 codigoEstandarSeleccionado.value = standardCodeOptions.value.find(
   c => c.value === item.standard_code_id
 );
 
 tributoSeleccionado.value = tributeOptions.value.find(
   t => t.id === item.tribute_id
 );
 
 // Mostrar modal
 mostrarCarta.value = true;
}

// Mostrar formulario de creación
function mas() {
 resetForm();
 mostrarCarta.value = true;
}

// Cerrar formulario
function cerrar() {
 mostrarCarta.value = false;
 resetForm();
}

// Cargar productos al iniciar
onMounted(() => {
 getItems();
 loadInitialUnitMeasures();
 loadInitialTributes();
});
</script>

<style >
.custom-modal {
  max-width: 800px; /* Reduce el ancho del modal */
  width: 90%;
  max-height: 80vh; /* Limita la altura para que no se salga de la pantalla */
  overflow-y: auto; /* Permite desplazamiento vertical */
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.imgI {
 height: 50px;
 width: 50px;
}

.tituloTabla {
 font-family: "Poppins", sans-serif;
 font-weight: 500;
 display: flex;
 align-items: center;
 gap: 10px;
 margin-bottom: 20px;
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


.custom-input {
 width: 100%;
}

.custom-input .q-field__control {
 border-radius: 8px;
}

.boton-personalizado {
 font-weight: 500;
 padding: 8px 20px;
 border-radius: 8px;
}

.mas {
  border-radius: 8px;
  margin-top: -5%;
  margin-left: 80%;
  position: fixed;
  background-color:#4A5D52;
}

.Contenedor {
 padding: 20px;
}

.Tabla {
 background-color: #fff;
 border-radius: 10px;
 padding: 20px;
 box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

.card:not(:has(.custom-modal)) {
 display: none;
}
</style>