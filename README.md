# Galería de Productos Interactiva & Dashboard de Analytics

Proyecto de Dashboard y Galería de Productos interactiva desarrollado como parte del módulo de Frontend. La aplicación procesa un catálogo dinámico aplicando métodos de manipulación del DOM, iteradores (`map`, `filter`) y funciones de agregación para el cálculo de KPIs en tiempo real.

---

## Integrantes del Equipo y Roles

| Nombre Integrante | Rol / Responsabilidad | Contribución Principal |
| :--- | :--- | :--- |
| **Ana Sánchez Vigil** | Lead Developer & Data Logic | Implementación de funciones de cálculo de KPIs (`SUM`, `AVERAGE`, `COUNT`, `MIN`, `MAX`) e integración de eventos del DOM.

---

## 📈 Indicadores Clave de Rendimiento (KPIs) e Métricas

El sistema calcula dinámicamente 4 indicadores financieros a partir del catálogo visualizado:

1. **Total de Inventario (COUNT):** Muestra el número exacto de productos en catálogo.
2. **Valor Total del Catálogo (SUM):** Sumatoria de los precios de todos los productos disponibles.
3. **Precio Promedio (AVERAGE):** Valor medio de los artículos en la tienda.
4. **Rango de Precios (MIN / MAX):** Identificación del producto más económico y el de mayor valor.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Semántico y accesible.
- **CSS3 / Bootstrap 5:** Estilizado responsivo con soporte para modo oscuro (`data-bs-theme="dark"`).
- **JavaScript (ES6+):** Renderizado dinámico mediante `.map()`, filtrado con `.filter()` y funciones estadísticas customizadas.

---

## 📝 Conclusiones y Análisis de Datos

- **Optimización de Renderizado:** La manipulación dinámica del DOM combinada con iteradores como `.map()` reduce la carga de código repetitivo y garantiza un rendimiento fluido al aplicar filtros.
- **Toma de Decisiones Basada en Datos:** Incluir métricas estadísticas de negocio (`SUM`, `AVG`, `MIN`, `MAX`) directamente en la interfaz permite analizar instantáneamente el comportamiento de precios y stock del inventario.