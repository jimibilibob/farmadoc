/* eslint-disable @typescript-eslint/naming-convention */
export const itemFormValidations = {
  generic_name: [
    { type: 'required', message: 'El nombre genérico es obligatorio.' }
  ],
  commercial_name: [
    { type: 'required', message: 'El nombre comercial es obligatorio.' }
  ],
  price: [
    { type: 'required', message: 'El precio del producto es obligatorio.' }
  ],
  provider: [
    { type: 'required', message: 'El laboratorio es obligatorio.' }
  ],
  exp_date: [
    { type: 'required', message: 'La fecha de vencimiento del producto es obligatoria.' }
  ],
};
