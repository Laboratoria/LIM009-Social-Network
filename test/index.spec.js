// importamos la funcion que vamos a testear
import { signUp, signIn, signInWithGoogle, signInWithFacebook, promiseOfAddFirebase, addPostToCloudFirestore } from "../src/services/firebase.js";

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
        return signUp('user@laboratoria.la', 'aloha123')
            .then((user) => {
                expect(user.email).toEqual('user@laboratoria.la');
            });
    });
});

describe('singIn', () => {
    it('debería ser una función', () => {
        expect(typeof signIn).toBe('function');
    });
    it('deberia retornar el email: abc@gmail.com', () => {
        return signIn('abc@gmail.com', '123456')
            .then(user => {
                expect(user.email).toEqual('abc@gmail.com')
            });
    });
});
describe('signInWithGoogle', () => {
    it('debería ser una función', () => {
        expect(typeof signInWithGoogle).toBe('function');
    });
    it('Debería poder iniciar sesion con Google', () => {
        return signInWithGoogle()
            .then(() => {
                expect().toEqual();
            });
    });
});

describe('signInWithFacebook', () => {
    it('debería ser una función', () => {
        expect(typeof signInWithFacebook).toBe('function');
    });
    it('Debería poder iniciar sesion con Facebook', () => {
        return signInWithFacebook()
            .then((user) => {
                expect().toEqual();
            });
    });
});

/* 

describe('addPostToCloudFirestore', () => {
    it('debería ser una función', () => {
        expect(typeof addPostToCloudFirestore).toBe('function');
    });
    it('Debería poder agregar un post', () => {
        return addPostToCloudFirestore('comer brocoli es saludable', 'ElR66QAbMdXLzEbQGj4K4zUWvAu1', false, "https://firebasestorage.googleapis.com/v0/b/social-network-5a022.appspot.com/o/images%2Ftropical-fruit-parfait-6.jpg?alt=media&token=eb2c5648-22b9-4685-b3f5-f2abf5317066")
            .then((user) => {
                expect().toEqual();
            });
    });
});
describe('promiseOfAddFirebase', () => {
    it('debería ser una función', () => {
        expect(typeof promiseOfAddFirebase).toBe('function');
    });
    it('Debería poder agregar un post', () => {
        return promiseOfAddFirebase('posts', {
                hours: f.getHours() + ":" + f.getMinutes(),
                today: fecha,
                content: inputComment,
                userId: idUser,
                state: statusComment,
                likes: 0,
                photoPost: photo,
            })
            .then((user) => {
                expect().toEqual();
            });
    });
}); */