// ==========================================
// 1. BASE DE DATOS DEL CATÁLOGO
// ==========================================
const PRODUCTOS = [
  { id: 1, nombre: 'Laptop Gamer', precio: 1200, categoria: 'Electrónica', imagen: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&auto=format&fit=crop&q=80' },
  { id: 2, nombre: 'Audífonos Bluetooth', precio: 80, categoria: 'Electrónica', imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80' },
  { id: 3, nombre: 'Camiseta Algodón', precio: 25, categoria: 'Ropa', imagen: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80' },
  { id: 4, nombre: 'Chaqueta Impermeable', precio: 110, categoria: 'Ropa', imagen: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&auto=format&fit=crop&q=80' },
  { id: 5, nombre: 'Cafetera Programable', precio: 65, categoria: 'Hogar', imagen: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&auto=format&fit=crop&q=80' },
  { id: 6, nombre: 'Lámpara de Escritorio', precio: 35, categoria: 'Hogar', imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format&fit=crop&q=80' },
  { id: 7, nombre: 'Smartwatch', precio: 150, categoria: 'Electrónica', imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80' },
  { id: 8, nombre: 'Sartén Antiadherente', precio: 40, categoria: 'Hogar', imagen: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=400&auto=format&fit=crop&q=80' }
];

// Estado global del carrito
let carrito = [];

// Captura de elementos principales del DOM
const contenedorProductos = document.getElementById('contenedor-productos');
const contadorProductos = document.getElementById('contador-productos');
const inputPrecio = document.getElementById('input-precio');
const btnFiltrarPrecio = document.getElementById('btn-filtrar-precio');
const btnLimpiar = document.getElementById('btn-limpiar');
const contenedorCategorias = document.getElementById('contenedor-categorias');

let categoriaActual = 'Todas';

// ==========================================
// 2. FUNCIONES DE CÁLCULO ESTADÍSTICO Y KPIS
// ==========================================
const contarProductos = (lista) => lista.length;

const calcularSumaTotal = (lista) => {
  return lista.reduce((acumulador, prod) => acumulador + prod.precio, 0);
};

const calcularPromedio = (lista) => {
  if (lista.length === 0) return 0;
  return calcularSumaTotal(lista) / lista.length;
};

const obtenerPrecioMaximo = (lista) => {
  if (lista.length === 0) return 0;
  return Math.max(...lista.map((p) => p.precio));
};

const obtenerPrecioMinimo = (lista) => {
  if (lista.length === 0) return 0;
  return Math.min(...lista.map((p) => p.precio));
};

const renderizarDashboard = (lista) => {
  const kpiContador = document.getElementById('kpi-count');
  const kpiSuma = document.getElementById('kpi-sum');
  const kpiPromedio = document.getElementById('kpi-avg');
  const kpiRangos = document.getElementById('kpi-rangos');

  if (kpiContador) kpiContador.textContent = contarProductos(lista);
  if (kpiSuma) kpiSuma.textContent = `$${calcularSumaTotal(lista).toFixed(2)}`;
  if (kpiPromedio) kpiPromedio.textContent = `$${calcularPromedio(lista).toFixed(2)}`;
  if (kpiRangos) {
    kpiRangos.textContent = `$${obtenerPrecioMinimo(lista)} - $${obtenerPrecioMaximo(lista)}`;
  }
};

// ==========================================
// 3. RENDERIZADO DEL CATÁLOGO EN EL DOM (USO DE .MAP)
// ==========================================
const renderizarProductos = (lista) => {
  if (lista.length === 0) {
    contenedorProductos.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-secondary h6">No se encontraron productos con los criterios seleccionados.</p>
      </div>
    `;
    contadorProductos.textContent = 'Total: 0';
    renderizarDashboard(lista);
    return;
  }

  const tarjetasHTML = lista.map((producto) => `
    <div class="col-md-6 col-lg-4">
      <div class="card bg-black border-secondary text-light h-100 shadow-sm">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 180px; object-fit: cover;">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h3 class="h6 text-warning mb-0 fw-bold">${producto.nombre}</h3>
              <span class="badge bg-secondary">${producto.categoria}</span>
            </div>
          </div>
          <div>
            <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-dark mb-3">
              <small class="text-secondary">Precio:</small>
              <span class="fs-5 text-success fw-bold">$${producto.precio}</span>
            </div>
            <button class="btn btn-outline-warning w-100 fw-bold" onclick="agregarAlCarrito(${producto.id})">
              ➕ Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  contenedorProductos.innerHTML = tarjetasHTML;
  contadorProductos.textContent = `Total: ${lista.length}`;

  renderizarDashboard(lista);
};

// ==========================================
// 4. LÓGICA DEL CARRITO DE COMPRAS
// ==========================================
window.agregarAlCarrito = (id) => {
  const producto = PRODUCTOS.find((p) => p.id === id);
  if (producto) {
    carrito.push(producto);
    actualizarCarritoUI();
  }
};

window.eliminarDelCarrito = (index) => {
  carrito.splice(index, 1);
  actualizarCarritoUI();
};

document.getElementById('btn-vaciar')?.addEventListener('click', () => {
  carrito = [];
  actualizarCarritoUI();
});

const actualizarCarritoUI = () => {
  const contador = document.getElementById('contador-carrito');
  const lista = document.getElementById('lista-carrito');
  const totalElem = document.getElementById('total-carrito');

  if (contador) contador.textContent = carrito.length;

  if (lista) {
    lista.innerHTML = '';
    if (carrito.length === 0) {
      lista.innerHTML = `<li class="list-group-item bg-transparent text-secondary text-center">El carrito está vacío</li>`;
    } else {
      carrito.forEach((prod, index) => {
        const item = document.createElement('li');
        item.className = 'list-group-item bg-dark text-light d-flex justify-content-between align-items-center border-secondary';
        item.innerHTML = `
          <div class="d-flex align-items-center">
            <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 45px; height: 45px; object-fit: cover;" class="rounded me-3">
            <div>
              <strong>${prod.nombre}</strong><br>
              <small class="text-success">$${prod.precio}</small>
            </div>
          </div>
          <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${index})">❌</button>
        `;
        lista.appendChild(item);
      });
    }
  }

  if (totalElem) {
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    totalElem.textContent = `$${total.toFixed(2)}`;
  }
};

// ==========================================
// 5. MOTOR DE FILTRADO COMBINADO
// ==========================================
const aplicarFiltros = () => {
  let resultado = [...PRODUCTOS];

  if (categoriaActual !== 'Todas') {
    resultado = resultado.filter((p) => p.categoria === categoriaActual);
  }

  const precioMaximo = parseFloat(inputPrecio.value);
  if (!isNaN(precioMaximo) && precioMaximo >= 0) {
    resultado = resultado.filter((p) => p.precio <= precioMaximo);
  }

  renderizarProductos(resultado);
};

// ==========================================
// 6. EVENTOS E INTERACTIVIDAD
// ==========================================
contenedorCategorias.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const botones = contenedorCategorias.querySelectorAll('button');
    botones.forEach((btn) => btn.classList.remove('active'));
    e.target.classList.add('active');

    categoriaActual = e.target.getAttribute('data-categoria');
    aplicarFiltros();
  }
});

btnFiltrarPrecio.addEventListener('click', aplicarFiltros);

btnLimpiar.addEventListener('click', () => {
  inputPrecio.value = '';
  categoriaActual = 'Todas';
  
  const botones = contenedorCategorias.querySelectorAll('button');
  botones.forEach((btn) => btn.classList.remove('active'));
  botones[0].classList.add('active');

  renderizarProductos(PRODUCTOS);
});

// Carga Inicial
renderizarProductos(PRODUCTOS);

// ==========================================
// 7. FINALIZAR COMPRA Y GENERAR RECIBO
// ==========================================
const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');

btnFinalizarCompra?.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
    return;
  }

  // 1. Llenar fecha del recibo
  const fechaElem = document.getElementById('recibo-fecha');
  if (fechaElem) {
    fechaElem.textContent = `Fecha: ${new Date().toLocaleString('es-ES')}`;
  }

  // 2. Generar el desglose de productos
  const reciboItems = document.getElementById('recibo-items');
  if (reciboItems) {
    reciboItems.innerHTML = carrito.map(p => `
      <div class="d-flex justify-content-between mb-1">
        <span>${p.nombre}</span>
        <span class="text-success">$${p.precio.toFixed(2)}</span>
      </div>
    `).join('');
  }

  // 3. Calcular total del recibo
  const reciboTotal = document.getElementById('recibo-total');
  const totalPagado = carrito.reduce((acc, p) => acc + p.precio, 0);
  if (reciboTotal) {
    reciboTotal.textContent = `$${totalPagado.toFixed(2)}`;
  }

  // 4. Cerrar Modal de Carrito y abrir Modal de Recibo usando Bootstrap JS
  const modalCarritoElem = document.getElementById('modalCarrito');
  const modalReciboElem = document.getElementById('modalRecibo');
  
  const modalCarritoBS = bootstrap.Modal.getInstance(modalCarritoElem);
  if (modalCarritoBS) modalCarritoBS.hide();

  const modalReciboBS = new bootstrap.Modal(modalReciboElem);
  modalReciboBS.show();

  // 5. Vaciar el carrito tras generar la compra exitosa
  carrito = [];
  actualizarCarritoUI();
});