// import MockFirebase from '../node_modules/mock-cloud-firestore/dist/mock-cloud-firestore';

// var jest = require('jest');
// jest.mock(global.firebase, () => {
//   return mocksdk;
// });

// mocksdk.firestore().flush();

// import firebasemock from 'firebase-mock'
// const mockauth = new firebasemock.MockFirebase(fixtureUser)

import MockFirebase from 'mock-cloud-firestore';
global.firebase = new MockFirebase(fixtureData);

// importamos la funcion que vamos a testear
import { funcLogin } from "../src/lib/index";
import { constants } from "lib";

const fixtureData = {
  __collection__: {
    users: {
      __doc__: {
        user_a: {
          email:'abc@gmail.com'
        }}}}};
 

describe('funcLogin', () => {
  it('deberia ser una funcion', () => {
    return funcLogin('abc@gmail.com', '123456')
      .then(user => {
        expect(user.email).toBe('abc@gmail.com')
      });
  });
});
