import { signInWithEmail, signInWithGoogle, signInWithFacebook, createEmailAndPassword, signOut, getUserReady } from "../lib/lib-firebase.js";
import { updatePerfilUser, updateEmailUser, dataBaseUser, getDataDoc, createComentPost, getPost, viewListPost, likesPost } from '../model/model.js'
import formComent from '../view/coment-post.js';
import viewformComent from '../view/view-coment-post.js'
import viewPostList from '../view/view-pos-list.js'
const changeHash = (hash) => {
  location.hash = hash;
}

export const registerUser = () => {
  const emailRegister = document.querySelector('#email-register').value;
  const passwordRegister = document.querySelector('#password-register').value;

  return createEmailAndPassword(emailRegister, passwordRegister)
    .then((result) => {
      dataBaseUser(result.user).then((docRef) => {
        alert('Registro con éxito')
        changeHash('/welcomeUser')

        console.log("Document written with ID: ", docRef);
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
      // console.log(nameUserCreate.value)


      // console.log(result)icono-login-user


    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert('El correo es inválido');
      } else if (errorCode == 'auth/email-already-in-use') {
        alert('El correo ya ha sido utilizado');
      } else if (errorCode == 'auth/weak-password') {
        alert('La contraseña no es lo suficientemente fuerte')
      } else {
        alert(errorMessage);
      }
    });
}

export const email = () => {
  const valueEmail = document.querySelector("#email-id").value;
  const password = document.querySelector("#password-id").value;
  return signInWithEmail(valueEmail, password)
    .then((result) => {
      dataBaseUser(result.user)
      changeHash('/welcomeUser')
    }
    ).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/user-not-found') {
        alert('El correo no ha sido registrado');
      } else if (errorCode == 'auth/invalid-email') {
        alert('El correo es inválido')
      } else if (errorCode == 'auth/wrong-password') {
        alert('La contraseña es equivocada.')
      } else {
        alert(errorMessage);
      }
    });
};

export const google = () => {
  return signInWithGoogle().then((result) => {
    dataBaseUser(result.user)
    changeHash('/welcomeUser')
  })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/cancelled-popup-request') {
        alert('Sólo se permite una solicitud emergente a la vez.');
      } else if (errorCode == 'auth/invalid-email') {
        alert('El correo es inválido')
      } else if (errorCode == 'auth/wrong-password') {
        alert('La contraseña es equivocada.')
      } else if (errorCode == 'auth/account-exists-with-different-credential') {
        alert('La cuenta ya ha sido utilizada con una credencial diferente')
      } else {
        alert(errorMessage);
      }
    });
}

export const facebook = () => {
  return signInWithFacebook().then((result) => {
    dataBaseUser(result.user);
    changeHash('/welcomeUser')
  }
  ).catch(error => {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/cancelled-popup-request') {
      alert('Sólo se permite una solicitud emergente a la vez.');
    } else if (errorCode == 'auth/invalid-email') {
      alert('El correo es inválido')
    } else if (errorCode == 'auth/wrong-password') {
      alert('La contraseña es equivocada.')
    } else if (errorCode == 'auth/account-exists-with-different-credential') {
      alert('La cuenta ya ha sido utilizada con una credencial diferente')
    } else {
      alert(errorMessage);
    }
  });
}

export const logOut = () => {
  return signOut()
    .then(() => {
      changeHash('/login')
    }).catch((err) => {
      console.log(err.message);
    });
}

//Crear post con IDs por defecto
export const createPost = (state, imagePost, fechaPost, horaPost) => {
  let description = document.querySelector('#description').value;
  let userID = document.querySelector('#user-id').textContent;
  console.log(fechaPost)
  console.log(state)
  let db = firebase.firestore();
  db.collection("posts").add({
    description: description,
    state: state,
    likes: 0,
    user: userID,
    image: imagePost,
    fechaPost: fechaPost,
    horaPost: horaPost
  })
    .then(() => {
      //document.getElementById('create-post').reset();
      console.log("Document written succesfully");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  // })
}

export const setUpPost = data => {

  const getUserIdView = (idUserAuth) => {

    // changeHash('/welcomeUser')
    const postList = document.querySelector('#post-list');
    const postListPrivad = document.querySelector('#btn-view-post-privad')
    const postListPublic = document.querySelector('#btn-view-post-public')
    postList.innerHTML = ''
    postListPrivad.addEventListener('click', () => {
      postList.innerHTML = ''
      viewListPost(idUserAuth.uid).onSnapshot(snapshot => {
        postList.innerHTML = ''
        snapshot.forEach((doc) => {
          getDataDoc(doc.data().user).then((getUser) => {
            if (getUser.exists) {
              const post = doc.data();

              postList.appendChild(viewPostList(doc, getUser, post));
              let btnDelete = document.querySelector(`#btn-delete-${doc.id}`);
              let btnEdit = document.querySelector(`#btn-edit-${doc.id}`);
              let btnLike = document.querySelector(`#btn-like-${doc.id}`)
              btnLike.addEventListener('click', () => {
                // let cont = 0;

                console.log('hola')
                postList.innerHTML = ''
              })
              btnDelete.addEventListener('click', () => {
                // console.log(post.user)
                // console.log(idUserAuth.uid)
                if (post.user === idUserAuth.uid) {
                  alert('Post eliminado correctamente')
                  deletePost(doc.id);

                } else {
                  alert('Permiso denegado para eliminar este post')
                }
                postList.innerHTML = ''
              })
              btnEdit.addEventListener('click', () => {
                let editDescription = document.querySelector(`#description-${doc.id}`).value;
                const state = document.querySelector(`#estado-post-view-Post-${doc.id}`)
                state.onchange = () => {
                  console.log(state.value)
                }
                if (post.user === idUserAuth.uid) {
                  editPost(doc.id, editDescription, state.value);
                  alert('Post editado correctamente');
                  postList.innerHTML = ' ';
                } else {
                  alert('Permiso denegado para editar este post');
                }
                postList.innerHTML = ''
              });
            } else {
              alert('El usuario no existe')
            }
          })

        })

      })
      // postListPrivad.innerHTML = 'Ver todos los post'
    })
    postListPublic.addEventListener('click', () => {
      postList.innerHTML = ''

      data.forEach(doc => {

        getDataDoc(doc.data().user).then((getUser) => {
          // console.log(getUser.data().name)
          if (getUser.exists) {
            const post = doc.data();

            postList.appendChild(viewPostList(doc, getUser, post));
            let btnDelete = document.querySelector(`#btn-delete-${doc.id}`);
            // let btnLike = document.querySelector(`#btn-like-${doc.id}`)

            // btnLike.addEventListener('click', () => {
            //   // let cont = 0;
            //   let like = 0
            //   like = post.likes + 1
            //   likesPost(doc.id, like)

            //   // editPost(doc.id, editDescription, state.value, like)
            //   console.log(like)
            // })
            let btnEdit = document.querySelector(`#btn-edit-${doc.id}`);
            btnEdit.addEventListener('click', () => {
              let editDescription = document.querySelector(`#description-${doc.id}`).value;
              const state = document.querySelector(`#estado-post-view-Post-${doc.id}`)
              state.onchange = () => {

                console.log(state.value)
              }
              if (post.user === idUserAuth.uid) {
                editPost(doc.id, editDescription, state.value);
                alert('Post editado correctamente');

              } else {
                alert('Permiso denegado para editar este post');
              }
              postList.innerHTML = ''
            });
            let btnLike = document.querySelector(`#btn-like-${doc.id}`)

            btnLike.addEventListener('click', () => {
              // let cont = 0;
              let like = 0
              like = post.likes + 1
              likesPost(doc.id, like)

              // editPost(doc.id, editDescription, state.value, like)
              console.log(like)
              postList.innerHTML = ''
            })
            btnDelete.addEventListener('click', () => {
              // console.log(post.user)
              // console.log(idUserAuth.uid)
              if (post.user === idUserAuth.uid) {
                alert('Post eliminado correctamente')
                deletePost(doc.id);

              } else {
                alert('Permiso denegado para eliminar este post')
              }
              postList.innerHTML = ''
            })
            let btnComent = document.querySelector(`#btn-coment-${doc.id}`)
            const coment = document.querySelector(`#cont-coment-${doc.id}`)
            const contComentList = document.querySelector(`#comment-form-list-${doc.id}`)
            // coment.innerHTML = ''
            // console.log(coment)
            // coment.innerHTML = ''

            btnComent.addEventListener('click', () => {
              getDataDoc(idUserAuth.uid).then(result => {
                console.log(result.data())
                coment.innerHTML = formComent(doc.id, result)


                const textComentPost = document.querySelector(`#text-coment-post-${doc.id}`)
                const btnViewComentPost = document.querySelector(`#btn-coment-id-${doc.id}`)

                btnViewComentPost.addEventListener('click', () => {
                  let fecha = new Date();
                  let fechaPost = `Fecha: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}  hora: ${fecha.getHours()}:${fecha.getMinutes()} `;
                  createComentPost(doc, idUserAuth.uid, textComentPost.value, fechaPost)
                  getPost(doc).onSnapshot(snapshot => {
                    contComentList.innerHTML = ''
                    snapshot.forEach(function (result) {
                      console.log(result.id, " => ", result.data());
                      contComentList.appendChild(viewformComent(result.data()))
                    })

                  })
                })

                getPost(doc).get().then(function (querySnapshot) {
                  contComentList.innerHTML = ''
                  querySnapshot.forEach(function (idPost) {
                    contComentList.appendChild(viewformComent(idPost.data()))
                    // doc.data() is never undefined for query doc snapshots
                    console.log(idPost.id, " => ", idPost.data());
                  });
                });
              })
            })

            // return postList.appendChild(article);
          }
          //;

        })

      });
    })
    //auyiliooooooooooooooo

    data.forEach(doc => {

      getDataDoc(doc.data().user).then((getUser) => {
        // console.log(getUser.data().name)
        if (getUser.exists) {
          const post = doc.data();

          postList.appendChild(viewPostList(doc, getUser, post));
          let btnDelete = document.querySelector(`#btn-delete-${doc.id}`);
          // let btnLike = document.querySelector(`#btn-like-${doc.id}`)

          // btnLike.addEventListener('click', () => {
          //   // let cont = 0;
          //   let like = 0
          //   like = post.likes + 1
          //   likesPost(doc.id, like)

          //   // editPost(doc.id, editDescription, state.value, like)
          //   console.log(like)
          // })
          let btnEdit = document.querySelector(`#btn-edit-${doc.id}`);
          btnEdit.addEventListener('click', () => {
            let editDescription = document.querySelector(`#description-${doc.id}`).value;
            const state = document.querySelector(`#estado-post-view-Post-${doc.id}`)
            state.onchange = () => {

              console.log(state.value)
            }
            if (post.user === idUserAuth.uid) {
              editPost(doc.id, editDescription, state.value);
              alert('Post editado correctamente');

            } else {
              alert('Permiso denegado para editar este post');
            }
            postList.innerHTML = ''
          });
          let btnLike = document.querySelector(`#btn-like-${doc.id}`)

          btnLike.addEventListener('click', () => {
            // let cont = 0;
            let like = 0
            like = post.likes + 1
            likesPost(doc.id, like)

            // editPost(doc.id, editDescription, state.value, like)
            console.log(like)
            postList.innerHTML = ''
          })
          btnDelete.addEventListener('click', () => {
            // console.log(post.user)
            // console.log(idUserAuth.uid)
            if (post.user === idUserAuth.uid) {
              alert('Post eliminado correctamente')
              deletePost(doc.id);
              postList.innerHTML = ''
            } else {
              alert('Permiso denegado para eliminar este post')
            }
            postList.innerHTML = ''
          })
          let btnComent = document.querySelector(`#btn-coment-${doc.id}`)
          const coment = document.querySelector(`#cont-coment-${doc.id}`)
          const contComentList = document.querySelector(`#comment-form-list-${doc.id}`)
          // coment.innerHTML = ''
          // console.log(coment)
          // coment.innerHTML = ''

          btnComent.addEventListener('click', () => {
            getDataDoc(idUserAuth.uid).then(result => {
              console.log(result.data())
              coment.innerHTML = formComent(doc.id, result)


              const textComentPost = document.querySelector(`#text-coment-post-${doc.id}`)
              const btnViewComentPost = document.querySelector(`#btn-coment-id-${doc.id}`)

              btnViewComentPost.addEventListener('click', () => {
                let fecha = new Date();
                let fechaPost = `Fecha: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}  hora: ${fecha.getHours()}:${fecha.getMinutes()} `;
                createComentPost(doc, idUserAuth.uid, textComentPost.value, fechaPost)
                getPost(doc).onSnapshot(snapshot => {
                  contComentList.innerHTML = ''
                  snapshot.forEach(function (result) {
                    console.log(result.id, " => ", result.data());
                    contComentList.appendChild(viewformComent(result.data()))
                  })

                })
              })

              getPost(doc).get().then(function (querySnapshot) {
                contComentList.innerHTML = ''
                querySnapshot.forEach(function (idPost) {
                  contComentList.appendChild(viewformComent(idPost.data()))
                  // doc.data() is never undefined for query doc snapshots
                  console.log(idPost.id, " => ", idPost.data());
                });
              });
            })
          })

          // return postList.appendChild(article);
        }
        //;

      })

    });

    return postList
  }
  getUserReady(getUserIdView)
}


const deletePost = id => {
  let db = firebase.firestore();
  db.collection("posts").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

const editPost = (id, description, state) => {
  let db = firebase.firestore();
  return db.collection("posts").doc(id).update({
    description: description,
    state: state
  })
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

}

export const editPErfilUser = (idUser, name, email) => {
  updatePerfilUser(idUser, name).then(() => {
    // Update successful.
    alert('Nombre se actualizó correctamente')
    updateEmailUser(idUser, email).then(() => {
      // Update successful.
      alert('Email se actualizó correctamente')
    }).catch((error) => {
      // An error happened.
      alert(error + 'Actualización Ha ocurrido un error. en email..')
    });
  }).catch((error) => {
    // An error happened.
    if (error === 'Error: This operation is sensitive and requires recent authentication. Log in again before retrying this request.Actualización Ha ocurrido un error. en email..') {
      alert('esta operación es confidencial y requiere autenticación reciente. Vuelva a iniciar sesión antes de volver a intentar esta solicitud de Actualización ')
    } else {
      alert('Actualización Ha ocurrido un error. en nombre..')
    }
  });
}

/**
 *  const btnSubir = document.createElement('img')
            btnSubir.src = './image/subir.png'
            btnSubir.classList = 'img-post-prev'
            article.appendChild(btnSubir)
 */