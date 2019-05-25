// importamos la funcion que vamos a testear
import { signUp, signIn, signInWithGoogle, signInWithFacebook, currentUser, signOut, firebaseAuthState } from "../src/services/firebase.js";

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


describe('signUp', () => {
    it('debería ser una función', () => {
        expect(typeof signUp).toBe('function');
    });
    it('Debería poder registrar con un usuario y contraseña', () => {
        return signUp('maytezhou14@gmail.com', 'aloha123')
            .then((user) => {
                expect(user.email).toEqual('maytezhou14@gmail.com');
            });
    });
});

describe('singIn', () => {
    it('debería ser una función', () => {
        expect(typeof signIn).toBe('function');
    });
    it('deberia retornar el email: abc@gmail.com', () => {
        return signIn('annie@gmail.com', '123456')
            .then(user => {
                expect(user.email).toEqual('annie@gmail.com');
            });
    });
});
describe('signInWithGoogle', () => {
    it('debería ser una función', () => {
        expect(typeof signInWithGoogle).toBe('function');
    });
    it('Debería poder iniciar sesion con Google', () => {
        return signInWithGoogle()
            .then((obj) => {
                const providerData = obj.providerData;
                const isAnonymous = obj.isAnonymous;
                const userProviderByGoogle = providerData[0].providerId;
                // console.log(providerData[0].providerId);
                // console.log(mockauth.getAuth());
                // console.log(providerData);
                // console.log(isAnonymous);
                expect(mockauth.getAuth().providerData[0].providerId).toBe(userProviderByGoogle);
                expect(mockauth.getAuth().isAnonymous).toBe(isAnonymous);;
            });
    });
});

describe('signInWithFacebook', () => {
    it('debería ser una función', () => {
        expect(typeof signInWithFacebook).toBe('function');
    });
    it('Debería poder iniciar sesion con Facebook', () => {
        return signInWithFacebook()
            .then((obj) => {
                const providerData = obj.providerData;
                const isAnonymous = obj.isAnonymous;
                const userProviderByFacebook = providerData[0].providerId;
                // console.log(obj);
                expect(mockauth.getAuth().providerData[0].providerId).toBe(userProviderByFacebook);
                expect(mockauth.getAuth().isAnonymous).toBe(isAnonymous);;
            });
    });
});


describe('Current User', () => {
    it('currentUser deberia de ser una funcion', () => {
        expect(typeof currentUser).toBe('function')
    });
    it('deberia de existir usuario ', () => {
        return signIn('abc@gmail.com', '123456')
            .then((user) => {
                // console.log(user);
                // console.log(user.email)
                const userLogueado = user.email;
                const userCurrent = currentUser();
                expect(userCurrent.email).toBe(userLogueado);
            })

    });
});

describe('Cerrar Sesión', () => {
    it('debería ser una función', () => {
        expect(typeof signOut).toBe('function');
    });

    it('Deberia poder cerrar sesion', () => {
        return signIn('abc@gmail.com', '123456')
            .then((user1) => {
                // console.log(user1)
                return signOut().then((user1) => {
                    // console.log(user1);

                    expect(user1).toBe(undefined);


                })

            });
    });
});

describe('Active User', () => {
    it('firebaseAuthState deberia de ser una funcion', () => {
        expect(typeof firebaseAuthState).toBe('function')
    });
    it('deberia de existir usuario activo', (done) => {

        return signIn('abc@gmail.com', '123456').then((user) => {
            //  console.log(user);
            const callback = (user1) => {
                //console.log(user1)
                expect(user1.email).toEqual('abc@gmail.com')

            };
            firebaseAuthState(callback(user));
            done();

        })


    })
});