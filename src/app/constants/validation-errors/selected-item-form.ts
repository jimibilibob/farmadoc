/* eslint-disable @typescript-eslint/naming-convention */
export const selectedItemFormValidations = {
  units: [
    { type: 'required', message: 'Debe ingresar las unidades del producto que desea agregar.' },
    { type: 'pattern', message: 'Debe ingresar sólo números.' }
  ],
  price: [
    { type: 'required', message: 'El precio del producto es obligatorio.' },
    { type: 'pattern', message: 'Debe ingresar un precio válido.' }
  ]
};
