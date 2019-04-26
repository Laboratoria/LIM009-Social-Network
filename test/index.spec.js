import MockFirebase from '../node_modules/mock-cloud-firestore/dist/mock-cloud-firestore';
global.firebase = new MockFirebase(fixtureUser)
// importamos la funcion que vamos a testear
import { funcLogin } from "../src/lib/index";

describe('funcLogin', () => {
  it('debería ser una función', () => {
    expect(typeof funcLogin).toBe('function');
  });
});
