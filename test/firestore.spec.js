// importamos la funcion que vamos a testear
import MockFirebase from 'mock-cloud-firestore';
const fixtureData = {
  __collection__: {
    notes: {
      __doc__: {
        abc1d: {
          post: "Post 001",
          uidUsuario: "abc123",
          name: "Rocio",
          foto: "",
          privacidad: "privado",
          weather: "01 de julio"
        },
      }
    }
  }
}

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import { databasePost, readData, deleteData, editFirestore, collectionUser, readOneUser } from "../src/firestore.js";
describe('databasePost', () => {
  it('Debería poder guardar un post', (done) => {
    return databasePost({
      post: "Nuevo post",
      uidUsuario: "abc124",
      name: "Pilar",
      foto: "",
      privacidad: "publico",
      weather: "02 de julio"
    })
      .then(() => {
        const callback = (notes) => {
          let result
          notes.forEach((e) => {
            if (e.data().post === 'Nuevo post') {
              result = e.data()
            };
          })
          expect(result.post).toBe('Nuevo post');
          done();
        }
        readData(callback)
      })
  })
})

describe('editFirestore', () => {
  it('Debería poder editar una nota con id: abc1d', (done) => {
    return editFirestore('abc1d', {
      post: "Post 001 editado"
    })
      .then(() => {
        const callback = (notes) => {
          let result
          notes.forEach((e) => {
            if (e.data().post === 'Post 001 editado') {
              result = e.data()
            };
          })
          expect(result.post).toBe('Post 001 editado');
          done();
        }
        readData(callback)
      })
  })
})

describe('deleteData', () => {
  it('Debería poder eliminar una nota con id: abc1d', (done) => {
    return deleteData('abc1d')
      .then(() => {
        const callback = (notes) => {
          let result
          notes.forEach((e) => {
            if (e.id === 'abc1d') {
              result = e.id
            };
          })
          expect(result).toBe(undefined);
          done();
        }
        readData(callback)
      })
  })
})

describe('collectionUser', () => {
  it('Debería poder agregar un nuevo usuario', () => {
    return collectionUser({
      foto: '',
      name: 'Ana',
      email: 'ana@gmail.com',
      uid: 'abc1245'
    })
    .then(() => {
      readOneUser('abc1245')
      .then((result) => {
        if (result && result.exists) {
          expect(result.data().email).toBe('ana@gmail.com');
        }
      })
    })
  })
})