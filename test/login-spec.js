// // importamos la funcion que vamos a testear
// import { myFunction } from "../src/lib/index";

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

const firebasemock = require('firebase_mock');
const mockauth = new firebasemock.MockFirebase();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => (path ? mockdatabase.child(path) : null),
  () => mockauth,
  );

import {signInWithEmail, createEmailAndPassword, signInWithGoogle, signInWithFacebook} from '../lib/lib-firebase.js'

describe('signInWithEmail', () => {
  it('debería ser una función', () => {
    expect(typeof signInWithEmail).toBe('function');
  });
  it('Debería poder iniciar sesion', () => {
    return signInWithEmail('laboratoria_2017@hotmail.com', 'laboratoria123')
      .then((user) => {
        expect(user.email).toBe('laboratoria_2017@hotmail.com');
      });
  }); 
});