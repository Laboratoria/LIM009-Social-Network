const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => (path ? mockdatabase.child(path) : null),
  () => mockauth,
  () => mockfirestore
);

import { signInWithEmail, createEmailAndPassword, signInWithGoogle, signInWithFacebook } from '../lib/lib-firebase.js'


describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof createEmailAndPassword).toBe('function');
  });
  it('debería ser una función', () => {
    expect(typeof signInWithGoogle).toBe('function');
  });
  it('debería ser una función', () => {
    expect(typeof signWithGoogle).toBe('function');
  });
  it('debería ser una función', () => {
    expect(typeof signInWithFacebook).toBe('function');
  });
});




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