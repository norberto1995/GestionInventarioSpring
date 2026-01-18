// src/utils/imprimirFactura.js

export const imprimirFactura = (venta) => {
  const detallesHTML = venta.detalles
    .map(
      (d) => `
      <tr>
        <td>${d.idDetalle}</td>
        <td>${d.producto?.nombre ?? "N/A"}</td>
        <td style="text-align: center;">${d.cantidad}</td>
        <td style="text-align: right;">${d.precioUnitario?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
        <td style="text-align: right;">${d.iva?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
        <td style="text-align: right;">${d.total?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
      </tr>`
    )
    .join("");

  const html = `
    <html>
    <head>
      <title>Factura #${venta.idVenta}</title>
      <style>
        @media print {
          @page { size: A4; margin: 20mm; }
        }

        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; color: #333; }
        .container { width: 210mm; margin: auto; padding: 20px; }

        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .header img { height: 80px; }
        .empresa { text-align: right; }
        .empresa p { margin: 2px 0; }

        h1 { text-align: center; font-size: 24px; margin-bottom: 10px; }
        .datos { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .datos div { width: 48%; }
        .datos p { margin: 2px 0; }

        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; font-size: 14px; }
        th { background-color: #4a5568; color: white; text-align: left; }
        tr:nth-child(even) { background-color: #f9f9f9; }

        .totales { width: 40%; float: right; border: 1px solid #ccc; padding: 10px; }
        .totales table { width: 100%; border: none; }
        .totales td { border: none; padding: 4px; }
        .totales td:first-child { text-align: left; }
        .totales td:last-child { text-align: right; font-weight: bold; }

        .footer { clear: both; text-align: center; margin-top: 40px; font-size: 12px; color: #555; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="Logo Empresa" />
          <div class="empresa">
            <p><strong>Empresa XYZ</strong></p>
            <p>Dirección: Calle Falsa 123</p>
            <p>Tel: 1234567</p>
            <p>Email: info@empresa.com</p>
          </div>
        </div>

        <h1>Factura #${venta.idVenta}</h1>

        <div class="datos">
          <div>
            <p><strong>Cliente:</strong> ${venta.cliente?.nombre ?? "N/A"}</p>
            <p><strong>Documento:</strong> ${venta.cliente?.documento ?? "N/A"}</p>
            <p><strong>Dirección:</strong> ${venta.cliente?.direccion ?? "N/A"}</p>
            <p><strong>Teléfono:</strong> ${venta.cliente?.telefono ?? "N/A"}</p>
          </div>
          <div>
            <p><strong>Vendedor:</strong> ${venta.vendedor}</p>
            <p><strong>Fecha:</strong> ${venta.fecha ? new Date(venta.fecha).toLocaleString() : "N/A"}</p>
            <p><strong>Forma de Pago:</strong> ${venta.formaPago}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID Detalle</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>IVA</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${detallesHTML}
          </tbody>
        </table>

        <div class="totales">
          <table>
            <tr>
              <td>Subtotal:</td>
              <td>${venta.subtotal?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
            </tr>
            <tr>
              <td>IVA:</td>
              <td>${venta.totalIva?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
            </tr>
            <tr>
              <td>Descuento:</td>
              <td>${venta.descuento?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>${venta.total?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
            </tr>
            <tr>
              <td>Pago:</td>
              <td>${venta.pago?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
            </tr>
            <tr>
              <td>Cambio:</td>
              <td>${venta.cambio?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
            </tr>
          </table>
        </div>

        <div class="footer">
          Gracias por su compra. Este documento es una representación de la factura.
        </div>
      </div>
    </body>
    </html>
  `;

  const ventana = window.open("", "_blank");
  ventana.document.write(html);
  ventana.document.close();
  ventana.focus();
  ventana.print();
};
