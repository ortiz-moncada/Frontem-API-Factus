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
                    label="Seleccione un cliente" :rules="[val => !!val || 'Cliente requerido']" />
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
            <q-btn icon="download" color="blue-7" flat @click="descargarFactura(props.row)" />
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
import axios from '../plugins/factus'
import Swal from 'sweetalert2';

// Variables reactivas con ref
const Item = ref({
  id: 0,
  name: '',
  price: 0
});

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
    field: 'api_client_name'
  },
  {
    name: 'reference_code',
    label: 'CODIGO DE REFERENCIA',
    align: 'center',
    field: 'reference_code'
  },
  {
    name: 'number',
    label: 'NÚMERO',
    align: 'center',
    field: 'number'
  },
  {
    name: 'total',
    label: 'PRECIO TOTAL',
    align: 'center',
    field: 'total'
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
    Swal.fire("Error", "No se pudieron cargar los clientes", "error");
  }
}

async function getItems() {
  try {
    const response = await apiClient.get('/items/items');
    items.value = response.data || [];
  } catch (error) {
    console.error("Error al cargar items:", error);
    Swal.fire("Error", "No se pudieron cargar los artículos", "error");
  }
}


async function validarYRegistrar() {
  try {
    if (!validateForm()) {
      return;
    }

    loading.value = true;

    console.log('Nombre del cliente:', facturaData.value.customer.name);
    console.log('Tipo de nombre:', typeof facturaData.value.customer.name);
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

    // Prepare full payload
    const payload = {

      reference_code: facturaData.value.reference_code,
      observation: facturaData.value.observation || '',
      payment_form: facturaData.value.payment_form.value || facturaData.value.payment_form,
      payment_method_code: facturaData.value.payment_method_code.value || facturaData.value.payment_method_code,
      payment_due_date: facturaData.value.payment_due_date,
      billing_period: {
        start_date: facturaData.value.billing_period.start_date,
        start_time: "00:00:00",
        end_date: facturaData.value.billing_period.end_date,
        end_time: "23:59:59"
      },
      customer: customerData,
      items: itemsData
    };

    console.log("Payload for validation:", JSON.stringify(payload, null, 2));

    const validationResponse = await axios.post('/v1/bills/validate', payload);

    if (validationResponse.data.valid) {
      await registrarFactura(payload);
    } else {
      Swal.fire("Error de Validación", validationResponse.data.message || "La factura no pasó la validación", "error");
    }
  } catch (error) {
    console.error("Error completo al validar o registrar factura:", error);

    const errorMessage = error.response?.data?.message ||
      (error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join('\n')
        : 'Error desconocido');

    Swal.fire({
      icon: 'error',
      title: 'Error de Validación',
      text: errorMessage,
      width: '800px'
    });
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
    Swal.fire("Error", "Código de referencia es requerido", "error");
    return false;
  }

  if (!customer) {
    Swal.fire("Error", "Debe seleccionar un cliente", "error");
    return false;
  }

  if (!items || items.length === 0) {
    Swal.fire("Error", "Debe seleccionar al menos un artículo", "error");
    return false;
  }

  const paymentFormValue = payment_form.value || payment_form;
  const paymentMethodValue = payment_method_code.value || payment_method_code;

  if (!paymentFormValue) {
    Swal.fire("Error", "Forma de pago es requerida", "error");
    return false;
  }

  if (!paymentMethodValue) {
    Swal.fire("Error", "Método de pago es requerido", "error");
    return false;
  }

  if (!payment_due_date) {
    Swal.fire("Error", "Fecha de vencimiento es requerida", "error");
    return false;
  }

  if (!billing_period.start_date || !billing_period.end_date) {
    Swal.fire("Error", "Período de facturación es requerido", "error");
    return false;
  }

  return true;
}

async function registrarFactura(payload) {
  try {
    await axios.post('/v1/bills', payload);
    await getFacturas();
    mostrarCarta.value = false;
    resetForm();
    Swal.fire("Éxito", "Factura registrada correctamente", "success");
  } catch (error) {
    console.error("Error al registrar factura:", error);
    Swal.fire("Error", "No se pudo registrar la factura", "error");
  }
}

async function getFacturas() {
  try {
    const response = await axios.get('/v1/bills', {
      params: {
        'filter[identification]': '',
        'filter[names]': '',
        'filter[number]': '',
        'filter[prefix]': '',
        'filter[reference_code]': '',
        'filter[status]': ''
      }
    });

    console.log("Full server response:", response);

    const billsData = response.data?.data?.data || [];

    if (Array.isArray(billsData)) {
      facturas.value = billsData;
      console.log("Facturas cargadas:", facturas.value);

      if (facturas.value.length === 0) {
        Swal.fire("Aviso", "No se encontraron facturas", "info");
      }
    } else {
      console.error("Received data is not an array:", billsData);
      Swal.fire("Error", "Formato de datos inválido", "error");
      facturas.value = [];
    }
  } catch (error) {
    console.error("Error completo al cargar facturas:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar facturas',
        text: errorMessage || 'Error desconocido'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar facturas',
        text: 'Error inesperado'
      });
    }

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

function verFactura(factura) {
  Swal.fire({
    
    html: `
    <div class="Encabezado">
      <h3>Gestión de Facturación Digital</h3><br><br>
      <img class="img" src="https://cdn-icons-png.flaticon.com/128/3884/3884880.png">
      </div><br><br>
      <div class="Cj1">
        <div><p><strong>Código de Referencia:</strong> ${factura.reference_code}</p></div>
      <div><p><strong>Número de Factura:</strong> ${factura.number || 'N/A'}</p></div>
      </div>
       <div class="Cj2">
      <p><strong>Cliente:</strong> ${factura.names || 'N/A'}</p>
      <p><strong>Forma de Pago:</strong> ${factura.payment_form|| 'N/A'}</p>
      </div>
      <div class="Cj3">
       <p><strong>Método de Pago:</strong> ${factura.payment_method_code}</p>
       <p><strong>Fecha de Vencimiento:</strong> ${factura.payment_due_date}</p>
      </div>
     
      <div class="uni">
        <p><strong>Período de Facturación:</strong> 
        ${factura.start_date || 'N/A'} - 
        ${factura.end_date || 'N/A'}
        </p>
      </div>
      
      
      
      ${factura.observation
        ? `<p><strong>Observaciones:</strong> ${factura.observation}</p>`
        : ''}
    `,
    confirmButtonText: "Cerrar",
    confirmButtonColor: "#2C3930"
  });
}



async function descargarFactura(factura) {
  try {
    // Validate that a factura is passed
    if (!factura || !factura.number) {
      Swal.fire("Error", "No se ha seleccionado una factura válida", "error");
      return;
    }

    // Show loading indicator
    loading.value = true;

    // Log the full factura object for debugging
    console.log("Factura para descargar:", factura);

    // Detailed logging of the request
    console.log("Intentando descargar factura con número:", factura.number);

    // Try to get the PDF using the backend route
    const downloadResponse = await apiClient.get(`/factus/bills/${factura.number}/download-pdf`, {
      params: {
        bill_number: factura.number
      },
      responseType: 'blob'
    });

    // Log the response details
    console.log("Respuesta de descarga:", {
      status: downloadResponse.status,
      headers: downloadResponse.headers,
      data: downloadResponse.data
    });

    // Verify the response is a PDF
    if (downloadResponse.data.type !== 'application/pdf') {
      throw new Error('La respuesta no es un archivo PDF válido');
    }

    // Create a blob from the response data
    const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    
    // Generate filename based on invoice details
    const filename = `Factura_${factura.reference_code || factura.number}.pdf`;
    link.download = filename;

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire("Éxito", "Factura descargada correctamente", "success");
  } catch (error) {
    // Comprehensive error logging
    console.error("Error detallado al descargar factura:", {
      message: error.message,
      response: error.response,
      request: error.request,
      config: error.config
    });

    // More detailed error handling
    let errorMessage = 'No se pudo descargar la factura.';
    
    if (error.response) {
      // Detailed logging for server response errors
      console.error("Detalles de la respuesta del servidor:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });

      errorMessage = error.response.data.message || 
        `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // Logging for request errors
      console.error("Detalles de la solicitud:", error.request);
      errorMessage = 'No se recibió respuesta del servidor. Verifique su conexión.';
    } else {
      // Logging for other types of errors
      console.error("Error de configuración:", error.message);
      errorMessage = error.message;
    }
    
    Swal.fire({
      icon: 'error',
      title: 'Error de Descarga',
      text: errorMessage,
      footer: 'Intente nuevamente o contacte soporte técnico'
    });
  } finally {
    loading.value = false;
  }
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
.Cj1,.Cj2,.Cj3,.uni{
  display: grid;
  grid-template-columns: 50% 50%;
  border: 1px black solid;
  margin: 4px;
  border-radius: 5px;
}

h3{
  color: black;
}

.swal2-popup{
  width: 90%;
}

</style>