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
          state : 'Público',
          user: 'xyz',
        }      
      }
    }
  }
}

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import {createPost, getPosts} from "../controller/view-controller.js";

describe('createPost', () => {
    it('debería ser una función', () => {
      expect(typeof createPost).toBe('function');
    });
    it('Debería poder crear una publicacion', (done) => {
    return createPost('Hola de nuevo', '15/05/2019', '12:05', './image/image-post.png', 0, 'Prueba publicacion', 'xyz')
    .then(() => getPosts(
      (data) => {
        const result = data.find((posts) => posts.description === 'Hola de nuevo');
        expect(result.mensaje).toBe('Hola de nuevo');
        done()
      }
    ))
  })
})

// describe('postLike', () => {
//     it('debería ser una función', () => {
//       expect(typeof postLike).toBe('function');
//     });
//     it('Debería poder dar like', (done) => {
//     return postLike('abc134', 1 )
//     .then(() => obtenerPost(
//       (data) => {
//         const result = data.find((note) => note.like === 1);
//         expect(result.like).toBe(1);
//         done()
//       }
//     ))
//   })
// })


// describe('editarPost', () => {
//     it('debería ser una función', () => {
//       expect(typeof editarPost).toBe('function');
//     });
//     it('Debería poder editar una publicacion', (done) => {
//     return editarPost('abc134', "Hola de nuevo" )
//     .then(() => obtenerPost(
//       (data) => {
//         const result = data.find((note) => note.mensaje === "Hola de nuevo");
//         expect(result.mensaje).toBe("Hola de nuevo");
//         done()
//       }
//     ))
//   })
// })

// describe('eliminarPost', () => {
//     it('debería ser una función', () => {
//       expect(typeof eliminarPost).toBe('function');
//     });
//     it('Debería poder eliminar una publicacion', (done) => {
//     return eliminarPost('abc123')
//     .then(() => obtenerPost(
//       (data) => {
//         const result = data.find((note) => note.id === 'abc123');
//         expect(result).toBe(undefined);
//         done()
//       }
//     ))
//   })
// })