export const signupFormValidations = {
  email: [
    { type: 'required', message: 'El email es obligatorio.' },
    { type: 'email', message: 'Debe introducir un email válido.' }
  ],
  password: [
    { type: 'required', message: 'La contraseña debe ser obligatoria.' },
    { type: 'minlength', message: 'La contraseña debe tener al menos 6 dígitos.' },
    { type: 'maxlength', message: 'La contraseña debe tener un máximo de 30 dígitos.' }
  ]
};
