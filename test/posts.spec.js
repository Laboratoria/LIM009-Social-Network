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
const postPrivad = {
  description: 'Hola a todos post privado',
  state: 'privado',
  likes: 0,
  user: 'abc',
  image: './image/image-post.png',
  fechaPost: '21/05/2019',
  horaPost: '13:05'
}


global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import { createPost, viewListPostPublic, dataBaseUser, getDataDoc, viewListPostPrivate, deletePost } from "../src/model/model.js";

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
})

describe('createPost', () => {
  it('debería ser una función', () => {
    expect(typeof createPost).toBe('function');
  });
  it('Debería poder crear una post público', () => {
    return createPost('publico', './image/image-post.png', '19/05/2019', 'Hola a todos', 'xyz', '12:05')
      .then(() => {
        viewListPostPublic().get().then(result => {
          expect(result.data().description).toBe('Hola a todos');
        })
      })
  });
  
  it('viewListPostPrivate deberia ser una funcion', () => {
    expect(typeof viewListPostPrivate).toBe('function')
  })
  it('deberia crear un post privado y visualizarlo', () => {
    return createPost('privado', './image/image-post.png', '21/05/2019', 'Hola a todos post privado', 'abc', '13:05').then((result) => {
      viewListPostPrivate(postPrivad.user).get().then(result => {
        expect(result._data[0].data().description).toBe('Hola a todos post privado')
      })
    })
  })
  it('deletePost deberia ser una funcion', () => {
    expect(typeof deletePost).toBe('function')
  })
  it('deberia poder eliminar un post', () => {
    return createPost('publico', './image/image-post.png', '19/05/2019', 'Hola a todos post eliminado', 'xyzab', '12:05')
      .then(() => {
        viewListPostPublic().get().then(result => {
          deletePost(result._data[2]).then(() => {
            viewListPostPublic.get().then(result => {
              expect(result).toBe(undefined);
            })
          })


        })
      })
  })

})