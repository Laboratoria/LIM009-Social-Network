// // importamos la funcion que vamos a testear
// import { myFunction } from "../src/lib/index";

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

var firebasemock    = require('firebase-mock');

var mockauth = new firebasemock.MockAuthentication();
var mockdatabase = new firebasemock.MockFirebase();
var mockfirestore = new firebasemock.MockFirestore();
var mockstorage = new firebasemock.MockStorage();
var mockmessaging = new firebasemock.MockMessaging();
var mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  (path) => {
    return path ? mockdatabase.child(path) : mockdatabase;
  },
  // use null if your code does not use AUTHENTICATION
  () => {
    return mockauth;
  },
  // use null if your code does not use FIRESTORE
  () => {
    return mockfirestore;
  },
  // use null if your code does not use STORAGE
  () => {
    return mockstorage;
  },
  // use null if your code does not use MESSAGING
  () => {
    return mockmessaging;
  }
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