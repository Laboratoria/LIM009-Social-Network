// importamos la funcion que vamos a testear
import { signUpOnSubmit } from "../src/controller/controller1.js";
import { signInOnSubmit} from '../src/controller/controller1.js'
  
describe('signInOnSubmit', () => {
  it('Deberia poder iniciar sesión  con email: test@test.la y password:abc123') // asercion 
  //test con jest */
  addNote()
});

describe('signUpOnSubmit', () => {
  it('debería poder registrarme', () => {
    expect(typeof myFunction).toBe('function');
  });
});

//Creando mi firebase falso 
//
const auth = () => {
  return {
      signInWithEmailAndPassword: (emailLogIn, passwordLogIn) => {
          return new Promise((resolve) => {
              resolve({
                  email: emailLogIn,
              })
          })
      }
  }
};

const firebase = {
  auth: auth,
  // initializeApp() {}
};
export default jest.fn(() => {
  return firebase
}) 
