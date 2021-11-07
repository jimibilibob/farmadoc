/* eslint-disable @typescript-eslint/naming-convention */
export const saleFormValidations = {
  invoice_number: [
    { type: 'required', message: 'El número de factura es obligatorio'}
  ],
  name: [
    { type: 'required', message: 'El nombre del vendedor(a) es obligatorio'}
  ]
};
