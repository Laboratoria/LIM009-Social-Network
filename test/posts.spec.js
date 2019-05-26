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
          __collection__: {
            comment: {
              __doc__: {
                comment_post_123: {
                  reference: '__ref__:posts/abc123',
                  user: 'xyz',
                  comment: 'esto esun comentario',
                  fecha: '19/05/2019'

                }, comment_post_124: {
                  reference: '__ref__:posts/abc123',
                  user: 'xyz',
                  comment: 'este comentario será eliminado',
                  fecha: '20/05/2019'
                }
              }
            }
          }
        },
        abc124: {
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
};

const user = {
  uid: '1234',
  displayName: 'nayruth',
  email: 'nayruth@gmail.com',
  photoURL: './image/icono-login-user.png'
};
const postPrivad = {
  description: 'Hola a todos post privado',
  state: 'privado',
  likes: 0,
  user: 'abc',
  image: './image/image-post.png',
  fechaPost: '21/05/2019',
  horaPost: '13:05'
};


global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import { createPost, viewListPostPublic, dataBaseUser, getDataDoc, viewListPostPrivate, deletePost, editPost, createCommentPost, getComentPost, likesPost , editComment, deleteComment} from "../src/model/model.js";

describe('Funciones para gestionar usuarios firestore', () => {
  it('dataBaseUser deberia ser una funcion ', () => {
    expect(typeof dataBaseUser).toBe('function');
  });
  it('deberia poder agregar un usuario ', () => {
    return dataBaseUser(user).then(() => {
      getDataDoc(user.uid).then(result => {
        expect(result.data().name).toBe('nayruth');
      });
    });
  });
});

describe('createPost', () => {
  it('debería ser una función', () => {
    expect(typeof createPost).toBe('function');
  });
  it('Debería poder crear una post público', () => {
    return createPost('publico', './image/image-post.png', '19/05/2019', 'Hola a todos', 'xyz', '12:05')
      .then(() => {
        viewListPostPublic().get().then(result => {
          expect(result._data[0].data().description).toBe('Hola a todos');
        });
      });
  });
  
  it('viewListPostPrivate deberia ser una funcion', () => {
    expect(typeof viewListPostPrivate).toBe('function');
  });
  it('deberia crear un post privado y visualizarlo', () => {
    return createPost('privado', './image/image-post.png', '21/05/2019', 'Hola a todos post privado', 'abc', '13:05').then((result) => {
      viewListPostPrivate(postPrivad.user).get().then(result => {
        expect(result._data[0].data().description).toBe('Hola a todos post privado');
      });
    });
  });
  it('deletePost deberia ser una funcion', () => {
    expect(typeof deletePost).toBe('function');
  });
  it('deberia poder eliminar un post', () => {
    return deletePost('abc124').then(() => {
      viewListPostPublic().get().then(result => {
        console.log("Document successfully deleted!");
        expect(result._data[0]._ref._firestore._data.__collection__.posts.__doc__.abc124.__isDeleted__).toBe(true);
      });
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  });

  it('editPost deberia ser una funcion', () => {
    expect(typeof editPost).toBe('function');
  });

  it('deberia poder editar un post', () => {
    return editPost('abc123', 'hola a todos post editado', 'publico').then(() => {
      viewListPostPublic().get().then(result => {
        expect(result._data[0].data().description).toBe('hola a todos post editado');
      });
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  });

  it('likesPost deberia ser una funcion', () => {
    expect(typeof likesPost).toBe('function');
  });
  it('deberia poder agregar un like', () => {
    return likesPost('abc123', 1).then(() => {
      getComentPost('abc123').get().then(result => {
        expect(result._data[0]._ref._firestore._data.__collection__.posts.__doc__.abc123.likes).toBe(1);
      });
    });
  });
});
describe('test para comentarios', () => {
  it('createCommentPost deberia ser una funcion', () => {
    expect(typeof createCommentPost).toBe('function');
  });
  it('deberia crear un comentario', () => {
    return createCommentPost('abc123', 'user123', 'esto esun comentario', '21/05/2019').then(() => {
      getComentPost('abc123').get().then(result => {
        expect(result._data[0]._data.comment).toBe('esto esun comentario');
      });
    });
  });
  it('deberia ser una funcion', () => {
    expect(typeof editComment).toBe('function');
  });
  it('deberia poder editar un comentario', () => {
    return editComment('abc123', 'comment_post_123', 'edite comentario').then(() => {
      getComentPost('abc123').get().then(result => {
        expect(result._data[0]._data.comment).toBe('edite comentario');
      });      
    });
  });
  it('deberia ser una funcion', () => {
    expect(typeof deleteComment).toBe('function');
  });
  it('deberia poder eliminar un comentario', () => {
    return deleteComment('abc123', 'comment_post_124').then(() => {
      getComentPost('abc123').get().then(result => {
        expect(result._data[0]._ref._firestore._data.__collection__.posts.__doc__.abc123.__collection__.comment.__doc__.comment_post_124.__isDeleted__).toBe(true);
      });      
    });
  });
});