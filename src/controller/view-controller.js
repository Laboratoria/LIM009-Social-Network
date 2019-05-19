import { signInWithEmail, signInWithGoogle, signInWithFacebook, createEmailAndPassword, signOut, getUserReady } from "../lib/lib-firebase.js";
import { updatePerfilUser, updateEmailUser, dataBaseUser, getDataDoc, createComentPost, getPost } from '../model/model.js'
import formComent from '../view/coment-post.js';
import viewformComent from '../view/view-coment-post.js'
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
export const createPost = (state, imagePost, fechaPost) => {
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
    fechaPost: fechaPost
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
    const postList = document.querySelector('#post-list');
    postList.innerHTML = '';
    data.forEach(doc => {
      // console.log(doc)
      getDataDoc(doc.data().user).then((getUser) => {
        // console.log(getUser.data())
        if (getUser.exists) {
          // console.log(doc.id)
          // console.log("Document data:", doc.data().name);
          const post = doc.data();
          const article = document.createElement('article');

          const li = `
    <article id = 'content-post' class= 'flex-container  margin-top border center'> 
    <div class = 'btn-post-edit-del'>
    <img class ='img-perfil-post' src='./image/editar.png' alt ='boton de editar' id='btn-edit'>
    <img class ='img-perfil-post' src='./image/boton-cancelar.png' alt ='boton para eliminar' id='btn-delete-${doc.id}'>
    </div>    
      <header class='header-post'>       
      <img id='photo-post-user' src='${getUser.data().photo}' alt='feminismo' class='img-perfil-post'>                
      <label id='name-user-post' class=''>${getUser.data().name}</label> 
      <label id='fecha-post' class='center color-fecha'>${post.fechaPost}</label>            
      </header>
      <section class='content-post'>     
      <img id='image-post-view' src='${post.image}' alt="imagen-post" class='img-post-prev'> 
      <textarea id = 'description' class="textarea center">${post.description}</textarea>      
      </section>
      <footer class = 'margin-footer center'>
      <div class = 'style-color-header style-content-post-img'>
      <button id ='btn-like' class='btn-post-create'>Like</button>
      <button id ='btn-love' class='btn-post-create'>Me encanta</button>
      <button id ='btn-coment-${doc.id}' class='btn-post-create'>Comentar</button> 
      <div id = 'comment-form'></div>      
      </div >       
      </footer>
      <div id = 'cont-coment-${doc.id}'></div>
      <div id = 'comment-form-list-${doc.id}'></div> 
    </article>  
        `
          article.innerHTML = li;
          let btnDelete = article.querySelector(`#btn-delete-${doc.id}`);
          btnDelete.addEventListener('click', () => {
            // console.log(post.user)
            // console.log(idUserAuth.uid)
            if (post.user === idUserAuth.uid) {
              alert('Post eliminado correctamente')
              deletePost(doc.id);

            } else {
              alert('Permiso denegado paraeliminar este post')
            }

          })
          let btnComent = article.querySelector(`#btn-coment-${doc.id}`)
          const coment = article.querySelector(`#cont-coment-${doc.id}`)
          const contComentList = article.querySelector(`#comment-form-list-${doc.id}`)
          // coment.innerHTML = ''
          console.log(coment)
          // coment.innerHTML = ''

          btnComent.addEventListener('click', () => {

            coment.innerHTML = formComent(doc.id)
            const textComentPost = document.querySelector(`#text-coment-post-${doc.id}`)
            const btnViewComentPost = document.querySelector(`#btn-coment-id-${doc.id}`)

            btnViewComentPost.addEventListener('click', () => {

              createComentPost(doc, idUserAuth.uid, textComentPost.value)
              getPost(doc).onSnapshot(snapshot => {
                contComentList.innerHTML = ''
                snapshot.forEach(function (result) {
                  // console.log(result.id, " => ", result.data());


                  contComentList.appendChild(viewformComent(result.data()))

                })
              })
            })

            // if()
            // btnViewComentPost.addEventListener('click', () => {
            //   createComentPost(doc, idUserAuth.uid, textComentPost.value)
            // })
            getPost(doc).get().then(function (querySnapshot) {
              contComentList.innerHTML = ''
              querySnapshot.forEach(function (idPost) {
                contComentList.appendChild(viewformComent(idPost.data()))
                // doc.data() is never undefined for query doc snapshots
                console.log(idPost.id, " => ", idPost.data());
              });
            });

            // getPost(doc).onSnapshot(snapshot => {
            //   snapshot.forEach(function (result) {
            //     console.log(result.id, " => ", result.data());

            //     coment.appendChild(viewformComent(result.data()))
            // })
            // })



          })
          return postList.appendChild(article);
        }
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
