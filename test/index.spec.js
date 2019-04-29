// import MockFirebase from '../node_modules/mock-cloud-firestore/dist/mock-cloud-firestore';

// var jest = require('jest');
// jest.mock(global.firebase, () => {
//   return mocksdk;
// });

// mocksdk.firestore().flush();

// import firebasemock from 'firebase-mock'
// const mockauth = new firebasemock.MockFirebase(fixtureUser)

import MockFirebase from '../_mocks_/firebase-mock.js';

// importamos la funcion que vamos a testear
import { funcLogin } from "../src/lib/index";
import { constants } from "lib";

global.firebase = MockFirebase;

describe('funcLogin', () => {
  it('deberia ser una funcion', () => {
    return funcLogin('abc@gmail.com', '123456')
      .then(user => {
        expect(user.email).toBe('abc@gmail.com')
      });
  });
});
