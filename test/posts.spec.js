import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc123: {
          description: 'Hola a todos',
          fechaPost: '19/05/2019',
          horaPost: '12:05',
          image: './image/image-post.png',
          likes: 0,
          state: 'publico',
          user: 'xyz',
        }
      }
    }
  }
}

const user = {
  uid: '1234',
  displayName: 'nayruth',
  email: 'nayruth@gmail.com',
  photoURL: './image/icono-login-user.png'
}


global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import { createPost, viewListPostPublic, dataBaseUser, getDataDoc, updatePerfilUser } from "../src/model/model.js";
import { getUserReady } from "../src/lib/comple-firebase.js"
describe('Funciones para gestionar usuarios firestore', () => {
  it('dataBaseUser deberia ser una funcion ', () => {
    expect(typeof dataBaseUser).toBe('function')

  });
  it('deberia poder agregar un usuario ', () => {
    return dataBaseUser(user).then(() => {
      getDataDoc(user.uid).then(result => {
        expect(result.data().name).toBe('nayruth')
      })
    })

  })
  it('deberia poder editar mi nombre', () => {

    const activeUser = (user) => {
      return updatePerfilUser(user, 'david').then(result => {
        expect(result).toBe('nayruth')
      })
    }
    getUserReady(activeUser)
  })

})

describe('createPost', () => {
  it('debería ser una función', () => {
    expect(typeof createPost).toBe('function');
  });
  it('Debería poder crear una publicacion', () => {
    return createPost('publico', './image/image-post.png', '19/05/2019', 'Hola a todos', 'xyz', '12:05')
      .then(() => {
        viewListPostPublic().get().then(result => {
          expect(result.data().description).toBe('Hola a todos');

        })
      })
  })
})