/* eslint-disable @typescript-eslint/naming-convention */
export const itemFormValidations = {
  generic_name: [
    { type: 'required', message: 'El nombre genérico es obligatorio.' }
  ],
  commercial_name: [
    { type: 'required', message: 'El nombre comercial es obligatorio.' }
  ],
  price: [
    { type: 'required', message: 'El precio de compra producto es obligatorio.' },
    { type: 'pattern', message: 'Debe ingresar un precio válido.' }
  ],
  sale_price: [
    { type: 'required', message: 'El precio de venta del producto es obligatorio.' },
    { type: 'pattern', message: 'Debe ingresar un precio válido.' }
  ],
  laboratory: [
    { type: 'required', message: 'El laboratorio es obligatorio.' }
  ],
  exp_date: [
    { type: 'required', message: 'La fecha de vencimiento del producto es obligatoria.' }
  ],
};
