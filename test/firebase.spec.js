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

import { createUser, logIn, logInGoogle, signOut, currentUs, signInWithRedirect, observer } from "../src/firebase.js";

describe('logInGoogle', () => {
    it('Debería poder iniciar sesión con Google', () => {
        return logInGoogle()
        .then((user) => {
            expect(user.providerData[0].providerId).toBe('google.com')
        })
    });
})

describe('signInWithRedirect', () => {
    it('Debería poder iniciar sesión con Google abriendo una ventana emergente', () => {
        return signInWithRedirect()
        .then((result) => {
            expect(result.providerData[0].providerId).toBe('google.com') 
        })
    });
})

describe('createUser', () => {
    it('Debería poder registrarme', () => {
        return createUser('rocio@pilar.ch', 'rocio26')
        .then((user) => {
            expect(user.email).toBe('rocio@pilar.ch')
        })
    });
})

describe('logIn', () => {
    it('Debería poder iniciar sesión', () => {
        return logIn('rocio@pilar.ch', 'rocio26')
        .then((user) => {
            expect(user.email).toBe('rocio@pilar.ch')
        })
    });
})

describe('currentUs', () => {
    it('Debería poder retornar el email del usuario', () => {
        return logIn('rocio@pilar.ch', 'rocio26')
        .then(() => {
            const user=currentUs();
            expect(user.email).toBe('rocio@pilar.ch')
        })
    });
})
 
describe('observer', () => {
    it('Debería poder extraer información del usurario activo', (done) => {
        const callback = (user) => {
            const result = user.email
            expect(result).toBe('rocio@pilar.ch');
            done();
        }
        observer(callback);
        logIn('rocio@pilar.ch', 'rocio26')    
    })

}) 

describe('signOut', () => {
    it('Debería poder cerrar sesión', () => {
        return signOut()
        .then((user) => {
            expect(user).toBe(undefined)
        })
    });
})
