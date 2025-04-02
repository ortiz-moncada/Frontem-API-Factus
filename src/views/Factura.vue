<template>
  <div class="Contenedor">
    <div class="Tabla">
      <h2 class="tituloTabla">
        FACTURAS
        <img class="imgC" src="https://cdn-icons-png.flaticon.com/128/1170/1170678.png" alt="">
      </h2>

      <q-btn class="mas" label="Nueva Factura" @click="mas" />

      <div class="card">
        <q-card class="mycard custom-modal" v-if="mostrarCarta">
          <q-card-section class="elfor">
            <div class="row justify-center items-center">
              <h3 class="q-ma-none">Crear Factura</h3>
              <q-btn flat round icon="close" color="white" @click="cerrar" />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-md">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label class="form-label">Código de Referencia</label>
                  <q-input v-model="facturaData.reference_code" outlined label="Código de Referencia"
                    class="custom-input" :rules="[val => !!val || 'Campo requerido']" />
                </div>

                <div class="form-group">
                  <label class="form-label">Cliente</label>
                  <q-select v-model="facturaData.customer" :options="clientes" option-label="names" option-value="id"
                    label="Seleccione un cliente" :rules="[val => !!val || 'Cliente requerido']"  />
                </div>

                <div class="form-group">
                  <label class="form-label">Forma de Pago</label>
                  <q-select v-model="facturaData.payment_form" :options="formasPago" label="Seleccione forma de pago"
                    :rules="[val => !!val || 'Forma de pago requerida']" />
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label class="form-label">Artículos</label>
                  <q-select v-model="facturaData.items" :options="items" option-label="name" option-value="id"
                    label="Seleccione artículos" />
                </div>

                <div class="form-group">
                  <label class="form-label">Fecha de Vencimiento de Pago</label>
                  <q-input v-model="facturaData.payment_due_date" outlined type="date" class="custom-input"
                    :rules="[val => !!val || 'Fecha de vencimiento requerida']" />
                </div>

                <div class="form-group">
                  <label class="form-label">Método de Pago</label>
                  <q-select v-model="facturaData.payment_method_code" :options="metodosPago"
                    label="Seleccione método de pago" :rules="[val => !!val || 'Método de pago requerido']" />
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label class="form-label">Observaciones</label>
                  <q-input v-model="facturaData.observation" outlined type="textarea" label="Observaciones (opcional)"
                    class="custom-input" />
                </div>

                <div class="form-group">
                  <label class="form-label">Período de Facturación</label>
                  <div class="row q-col-gutter-md">
                    <div class="col-6">
                      <q-input v-model="facturaData.billing_period.start_date" outlined type="date"
                        label="Fecha de Inicio" :rules="[val => !!val || 'Fecha de inicio requerida']" />
                    </div>
                    <div class="col-6">
                      <q-input v-model="facturaData.billing_period.end_date" outlined type="date" label="Fecha de Fin"
                        :rules="[val => !!val || 'Fecha de fin requerida']" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-white q-pa-md">
            <q-btn flat label="Cancelar" color="negative" @click="cerrar" />
            <q-btn :loading="loading" label="REGISTRAR" class="boton-personalizado" @click="validarYRegistrar">
              <template v-slot:loading>
                <q-spinner-dots color="white" />
              </template>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <q-table :rows="facturas" :columns="columns" row-key="reference_code" dense class="my-table" dark flat bordered
        separator="cell">
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props">
            <q-btn icon="visibility" color="blue-4" flat @click="verFactura(props.row)" />
            <q-btn icon="download" color="blue-7" flat @click="descargarFactura(props.row.data.bill.number)" />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../plugins/axios';
import { getDataFactus, postDataFactus } from '../services/factus.js';
import { postDataurl, getDataurl } from '../services/apiclient.js';
import Swal from 'sweetalert2';
import { useQuasar } from 'quasar';
import { useAdminStore } from '../store/administrador.js';


const adminStore = useAdminStore();

// Variables reactivas con ref
const Item = ref({
  id: 0,
  name: '',
  price: 0
});

const $q = useQuasar();
const showTokenExpiredDialog = ref(false);

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


const Factura = ref({
  id: 0,
  number: '',
  document: null,
  api_client_name: '',
  reference_code: '',
  customer: null,
  observation: '',
  payment_form: '',
  payment_due_date: '',
  payment_method_code: '',
  items: [],
  billing_period: {
    start_date: '',
    end_date: ''
  }
});

const invoice = ref(null)
const router = useRouter();
const loading = ref(false);
const facturas = ref([]);
const mostrarCarta = ref(false);
const clientes = ref([]);
const items = ref([]);

// Payment forms and methods
const formasPago = [
  { label: 'Contado', value: '1' },
  { label: 'Crédito', value: '2' }
];

const metodosPago = [
  { label: 'Efectivo', value: '1' },
  { label: 'Transferencia', value: '2' },
  { label: 'Tarjeta de Crédito', value: '3' }
];

const facturaData = ref({
  reference_code: '',
  observation: '',
  payment_form: '',
  payment_due_date: '',
  payment_method_code: '',
  customer: {
    identification: '',
    phone: '',
    name: '',
    id: 0
  },
  items: [],  // Asegurar que es un array
  billing_period: {
    start_date: '',
    end_date: ''
  }
});


const columns = [
  {
    name: 'api_client_name',
    label: 'CLIENTE',
    align: 'center',
    field: ((elemento)=> elemento.data.customer.names)
  },
  {
    name: 'reference_code',
    label: 'CODIGO DE REFERENCIA',
    align: 'center',
    field: ((elemento)=> elemento.data.bill.reference_code)
  },
  {
    name: 'number',
    label: 'NÚMERO',
    align: 'center',
    field: ((elemento)=> elemento.data.bill.number)
  },
  {
    name: 'total',
    label: 'PRECIO TOTAL',
    align: 'center',
    field: ((elemento)=> elemento.data.bill.total)
  },
  {
    name: 'opciones',
    label: 'OPCIONES',
    align: 'center',
    field: 'opciones'
  }
];

async function getClientes() {
  try {
    const response = await apiClient.get('/customer/customer');
    clientes.value = response.data || [];
  } catch (error) {
    console.error("Error al cargar clientes:", error);
    notifyEroor('No se encontraron clientes')
  }
}

async function getItems() {
  try {
    const response = await apiClient.get('/items/items');
    items.value = response.data || [];
  } catch (error) {
    console.error("Error al cargar items:", error);
    notifyEroor('No se encontraron productos')
  }
}

function formatearFecha(fecha){
  const fechaStr = fecha; 
    const [day, month, year] = fechaStr.split("-");
    const fechaValida = `${year}-${month}-${day}`; 
    return fechaValida
}


async function validarYRegistrar() {
  try {
    if (!validateForm()) {
      return;
    }
    loading.value = true;

    const customerData = {
      identification: String(facturaData.value.customer.identification || ''),
      dv: '3',
      names: facturaData.value.customer.names || '',
      phone: String(facturaData.value.customer.phone || ''),
      email: facturaData.value.customer.email || '',
      address: facturaData.value.customer.address || '',
      legal_organization_id: '2',
      tribute_id: '21',
      identification_document_id: '3',
      municipality_id: '980'
    };
    // Prepare items data
    const itemsData = (Array.isArray(facturaData.value.items)
      ? facturaData.value.items
      : [facturaData.value.items])
      .filter(Boolean)
      .map(item => ({
        code_reference: item.name || 'Producto',
        name: item.name,
        quantity: 1,
        discount_rate: item.discount_rate || 0,
        price: item.price,
        tax_rate: "19.00", // Default tax rate
        unit_measure_id: 70,
        standard_code_id: 1,
        is_excluded: 0,
        tribute_id: 1,
        withholding_taxes: [] // Optional: add withholding taxes if needed
      }));



    const validationResponse = await postDataFactus('/v1/bills/validate', {
      reference_code: facturaData.value.reference_code,
      observation: facturaData.value.observation || '',
      payment_form: facturaData.value.payment_form.value || facturaData.value.payment_form,
      payment_method_code: facturaData.value.payment_method_code.value || facturaData.value.payment_method_code,
      payment_due_date: facturaData.value.payment_due_date,
      billing_period: {
        start_date: formatearFecha(facturaData.value.billing_period.start_date),
        start_time: "00:00:00",
        end_date: formatearFecha(facturaData.value.billing_period.end_date),
        end_time: "23:59:59"
      },
      customer: customerData,
      items: itemsData
    });
    console.log("exito", validationResponse)
    validationResponse.data.billing_period.end_date = formatearFecha(facturaData.value.billing_period.end_date)
    validationResponse.data.billing_period.end_date = formatearFecha(facturaData.value.billing_period.start_date)
    registrarFactura(validationResponse.data)

  } catch (error) {
    console.error("Error completo al validar o registrar factura:", error);
  } finally {
    loading.value = false;
  }
}


function validateForm() {
  const {
    reference_code,
    customer,
    items,
    payment_form,
    payment_method_code,
    payment_due_date,
    billing_period
  } = facturaData.value;

  if (!reference_code) {
    notifyEroor('Codigo de referencia es requerido ')
    return false;
  }

  if (!customer) {
    notifyEroor('debe seleccionar un cliente')
    return false;
  }

  if (!items || items.length === 0) {
    notifyEroor('debe seleccionar un articulo')
    return false;
  }

  const paymentFormValue = payment_form.value || payment_form;
  const paymentMethodValue = payment_method_code.value || payment_method_code;

  if (!paymentFormValue) {
    notifyEroor('Forma de pago es requerida')
    return false;
  }

  if (!paymentMethodValue) {
    notifyEroor('Metodo de pago es requerido')
    return false;
  }

  if (!payment_due_date) {
    notifyEroor('Fecha de vencimiento es requerida')
    return false;
  }

  if (!billing_period.start_date || !billing_period.end_date) {
    notifyEroor('Periodo de facturacion es requerido ')
    return false;
  }

  return true;
}



async function registrarFactura(data) {
  try {
    await postDataurl('/facturas', {data});
    await getFacturas();
    mostrarCarta.value = false;
    resetForm();
    notifySucess('La factura se ha registrado correctamente')
  } catch (error) {
    console.error("Error al registrar factura:", error);
    notifyEroor('No se pudo registrar la factura')
  }
}

async function getFacturas() {
  try {
    const response = await getDataurl('/facturas/FAT')
    console.log("Full server response:", response);

    const billsData = response || [];
    console.log("get facturas",response)

    if (Array.isArray(billsData)) {
      facturas.value = billsData;
      console.log("Facturas cargadas:", facturas.value);

      if (facturas.value.length === 0) {
        notifyEroor('No se encontraron facturas');
      }
    } else {
      console.error("Received data is not an array:", billsData);
      notifyEroor('Formato de Datos invalido');
      facturas.value = [];
    }
  } catch (error) {
    console.error("Error completo al cargar facturas:", error);

    facturas.value = [];
  }
}

function resetForm() {
  facturaData.value = {
    reference_code: '',
    observation: '',
    payment_form: { label: '', value: '' },
    payment_due_date: '',
    payment_method_code: { label: '', value: '' },
    customer: null,
    items: [],
    billing_period: {
      start_date: '',
      end_date: ''
    }
  };
}


async function descargarFactura(number) {
  console.log("Iniciando descarga de factura:", number);
  
  try {
    // 1. Obtener datos de la API
    const invoiceResponse = await getDataFactus(`/v1/bills/download-pdf/${number}`);
    
    // 2. Validar respuesta
    if (!invoiceResponse?.data?.pdf_base_64_encoded) {
      throw new Error("La respuesta no contiene datos válidos del PDF");
    }
    
    const { file_name = `factura_${number}`, pdf_base_64_encoded } = invoiceResponse.data;
    
    // 3. Decodificar base64 (manejo más eficiente)
    const byteCharacters = atob(pdf_base_64_encoded);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    
    // 4. Crear Blob y descargar
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${number}.pdf`;
    
    document.body.appendChild(a);
    a.click();
    
    // 5. Limpieza
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    // 6. Notificar al usuario
    Notify.create({
      message: "Factura descargada correctamente",
      color: 'positive',
      icon: 'cloud_download'
    });
    
    console.log(`Factura ${file_name} descargada correctamente`);
    
  } catch (error) {
    console.error("Error en downloadInvoice:", error);
  
  // Mostrar mensaje más específico al usuario
  let errorMessage = "Error al descargar la factura";
  if (error.response && error.response.status === 404) {
    errorMessage = "La factura solicitada no se encuentra disponible";
  }
  
  Notify.create({
    message: errorMessage,
    color: 'negative',
    icon: 'error'
  });
  }
}

function verFactura(factura) {
   Swal.fire({
      html: `
      <div class="divicion">
         <div class="Encabezado">
       <br><br><h3>Gestión de Facturación Digital</h3><br><br>
       <img class="img" src="https://cdn-icons-png.flaticon.com/128/3884/3884880.png">
     </div>
     <div class="qr"></p><img class="qr1" src="${factura.data.bill.qr_image}" alt="Código QR"></div>
        </div><br><br>
    
         <div class="uni">
       <p><strong>Período de Facturación:</strong>
        ${factura.data.billing_period?.start_date || 'N/A'} - 
        ${factura.data.billing_period?.end_date || 'N/A'}
       </p>
     </div>
     
     <!-- Información de Factura -->
     <div class="Cj1">
       <div><p><strong>Código de Referencia:</strong> ${factura.data.bill.reference_code}</p></div>
       <div><p><strong>Número de Factura:</strong> ${factura.data.bill.number || 'N/A'}</p></div>
     </div>
     
     <!-- Información del Cliente -->
     <div class="cliente-info">
       <h4>Información del Cliente</h4>
       <div class="Cj2">
         <p><strong>Cliente:</strong> ${factura.data.customer.names || 'N/A'}</p>
         <p><strong>Identificación:</strong> ${factura.data.customer.identification || 'N/A'}</p>
       </div>
       <div class="Cj3">
         <p><strong>Email:</strong> ${factura.data.customer.email || 'N/A'}</p>
         <p><strong>Teléfono:</strong> ${factura.data.customer.phone || 'N/A'}</p>
       </div>
     </div>
     
     <!-- Información de Pago -->
     <div class="pago-info">
       <h4>Información de Pago</h4>
       <div class="Cj2">
         <p><strong>Forma de Pago:</strong> ${factura.data.bill.payment_form.name || 'N/A'}</p>
         <p><strong>Método de Pago:</strong> ${factura.data.bill.payment_method.name || 'N/A'}</p>
       </div>
       <div class="Cj3">
         <p><strong>Fecha de Vencimiento:</strong> ${factura.data.bill.payment_due_date || 'N/A'}</p>
         <p><strong>Fecha de Creación:</strong> ${factura.data.bill.created_at || 'N/A'}</p>
       </div>
     </div>
     
     <!-- Información del Producto -->
     <div class="producto-info">
       <h4>Detalle de Productos</h4>
       <table class="tabla-productos">
         <thead>
           <tr>
             <th>Descripción</th>
             <th>Cantidad</th>
             <th>Precio Unit.</th>
             <th>Total</th>
           </tr>
         </thead>
         <tbody>
           ${factura.data.items ? 
             factura.data.items.map(item => `
               <tr>
                 <td>${item.description || 'N/A'}</td>
                 <td>${item.quantity || 'N/A'}</td>
                 <td>${item.price || 'N/A'}</td>
                 <td>${item.total || 'N/A'}</td>
               </tr>
             `).join('') : 
             `<tr><td colspan="4">No hay productos disponibles</td></tr>`
           }
         </tbody>
       </table>
     </div>
     
     <!-- Resumen de Factura -->
     <div class="resumen">
       <h4>Resumen</h4>
       <div>
         <p><strong>Subtotal:</strong> ${factura.data.bill.gross_value || 'N/A'}</p>
         <p><strong>Descuento:</strong> ${factura.data.bill.discount || 'N/A'}</p>
         <p><strong>Impuestos:</strong> ${factura.data.bill.tax_amount || 'N/A'}</p>
         <p><strong>Total a Pagar:</strong> ${factura.data.bill.total || 'N/A'}</p>
       </div>
     </div>
     

     ${factura.data.bill.observation
       ? `<p><strong>Observaciones:</strong> ${factura.data.bill.observation}</p>`
       : ''}
    
     
     <div class="legal-info">
       <p><strong>CUFE:</strong> ${factura.data.bill.cufe || 'N/A'}</p>
      
       <p><strong>URL Pública:</strong> ${factura.data.bill.public_url || 'N/A'}</p>
     </div>
     
     
     `,
     confirmButtonText: "Cerrar",
     confirmButtonColor: "#2C3930",
     width: '80%',  
     customClass: {
       container: 'factura-container',
       popup: 'factura-popup'
     }
   });
   
   console.log(factura);
}
function mas() {
  resetForm();
  mostrarCarta.value = true;
}

function cerrar() {
  mostrarCarta.value = false;
  resetForm();
}

onMounted(() => {
  getFacturas();
  getClientes();
  getItems();
});
</script>

<style>
/* Estilos generales para la factura electrónica */
.factura-popup {
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #fff;
  padding: 0;
  border-radius: 8px;
}

.factura-container {
  padding: 0;
}



.divicion{
  display: grid;
  grid-template-columns: 70% 30%;
}
.qr{
  background-color: #f8f9fa;
  border-bottom: 2px solid #2C3930;
  padding: 15px;
  text-align: center;
  border-radius: 8px 8px 0 0;
}
.qr1{
  padding: 15px;
}

/* Encabezado */
.Encabezado {
  background-color: #f8f9fa;
  border-bottom: 2px solid #2C3930;
  padding: 15px;
  text-align: center;
  border-radius: 8px 8px 0 0;
}

.Encabezado h3 {
  color: #2C3930;
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.Encabezado .img {
  width: 60px;
  height: auto;
  margin-top: 10px;
}

/* Secciones de información */
.Cj1, .Cj2, .Cj3, .cliente-info, .pago-info, .producto-info, .resumen, .uni, .legal-info {
  padding: 10px 20px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.cliente-info, .pago-info, .producto-info, .resumen {
  border-left: 4px solid #2C3930;
  background-color: #f8f9fa;
}

h4 {
  color: #2C3930;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 16px;
}

/* Organización en columnas */
.Cj1, .Cj2, .Cj3 {
  display: flex;
  justify-content: space-between;
}

.Cj1 div, .Cj2 p, .Cj3 p {
  margin: 5px 0;
  font-size: 14px;
}

/* Tabla de productos */
.tabla-productos {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 14px;
}

.tabla-productos th {
  background-color: #2C3930;
  color: white;
  text-align: left;
  padding: 8px;
  font-weight: normal;
}

.tabla-productos td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
}

.tabla-productos tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tabla-productos tr:hover {
  background-color: #e9e9e9;
}

/* Resumen financiero */
.resumen div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.resumen p {
  margin: 5px 0;
  font-size: 14px;
}

.resumen p:last-child {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

/* Información legal */
.legal-info {
  font-size: 12px;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-top: 15px;
  word-break: break-all;
}

.legal-info p {
  margin: 5px 0;
}

/* Observaciones */
p strong {
  color: #2C3930;
}

/* Responsive */
@media print {
  .factura-popup {
    width: 100% !important;
    box-shadow: none !important;
  }
  
  .swal2-actions {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .Cj1, .Cj2, .Cj3 {
    flex-direction: column;
  }
  
  .factura-popup {
    width: 95% !important;
    margin: auto;
  }
}
</style>