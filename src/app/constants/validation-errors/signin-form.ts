/* eslint-disable @typescript-eslint/naming-convention */
export const signinFormValidations = {
  email: [
    { type: 'required', message: 'Introduzca su email para iniciar sesión.' },
    { type: 'email', message: 'Debe introducir un email válido.' }
  ],
  password: [
    { type: 'required', message: 'Introduzca su contraseña para iniciar sesión.' }
  ]
};
