/* eslint-disable @typescript-eslint/naming-convention */
export const invoiceFormValidations = {
  name: [
    { type: 'required', message: 'El proveedor es obligatorio.' }
  ],
  invoice_number: [
    { type: 'required', message: 'El número de factura es obligatorio'}
  ]
};
