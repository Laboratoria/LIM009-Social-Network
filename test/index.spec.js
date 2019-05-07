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


import { signInWithEmail, createEmailAndPassword, signInWithGoogle, signInWithFacebook } from '../src/lib/lib-firebase'


describe('myFunction', () => {
  it('debería ser una función createEmailAndPassword', () => {
    expect(typeof signInWithEmail).toBe('function');
  });
  it('debería ser una función createEmailAndPassword', () => {
    expect(typeof createEmailAndPassword).toBe('function');
  });
  it('debería ser una función signInWithGoogle', () => {
    expect(typeof signInWithGoogle).toBe('function');
  });
  it('debería ser una función signInWithFacebook', () => {
    expect(typeof signInWithFacebook).toBe('function');
  });
});

describe('Incio de secion con autenticacion', () => {
  it('Deberia crear cuenta ', () => {
    return signInWithEmail('naye@gmail.com', '1234567')
      .then(user => {
        expect(user.email).toBe('naye@gmail.com');
      })
  });
  it('Deberia iniciar sesion con cuenta creada', () => {
    return createEmailAndPassword('naye@gmail.com', '1234567')
      .then(user => {
        expect(user.email).toBe('naye@gmail.com');
      })
  })
  it('Deberia iniciar sesion con Google', () => {
    return signInWithGoogle().then(user => {
      expect('').toBe('')
    })
  });
  it('Deberia iniciar sesion con facebook', () => {
    return signInWithFacebook().then(user => {
      expect('').toBe('')
    })
  })
})

