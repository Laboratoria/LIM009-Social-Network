import MockFirebase from '../node_modules/mock-cloud-firestore/dist/mock-cloud-firestore';
global.firebase = new MockFirebase(fixtureUser)
// importamos la funcion que vamos a testear
import { funcLogin } from "../src/lib/index";

describe('funcLogin', () => {
  it('deberi­a ser una funcion', () => {
    return funcLogin('abc@gmail.com', '123456')
    .then(user =>{
      expect(user.email).toBe('abc@gmail.com')
    });
  });
});
