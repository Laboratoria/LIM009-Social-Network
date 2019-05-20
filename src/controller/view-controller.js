import { signInWithEmail, signInWithGoogle, signInWithFacebook, createEmailAndPassword, signOut, getUserReady } from "../lib/lib-firebase.js";
import { updatePerfilUser, updateEmailUser, dataBaseUser, getDataDoc, createComentPost, getPost, viewListPostPrivate, likesPost, viewListPostPublic } from '../model/model.js'
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
export const createPost = (state, imagePost, fechaPost, description, userID, horaPost) => {
  //console.log(fechaPost)
  //console.log(state)
  let db = firebase.firestore();
  return db.collection("posts").add({
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

}

export const setUpPost = (idUserAuth) => {

  // const getUserIdView = (idUserAuth) => {

  // changeHash('/welcomeUser')
  const postList = document.querySelector('#post-list');
  const postListPrivad = document.querySelector('#post-list-privados')
  // const postListPrivad = document.querySelector('#btn-view-post-privad')
  const postListPublic = document.querySelector('#btn-view-post-public')
  viewListPostPrivate(idUserAuth.uid).onSnapshot(data => {
    postListPrivad.innerHTML = ''
    data.forEach(doc => {
      getDataDoc(doc.data().user).then((getUser) => {
        // console.log(getUser.data().name)
        if (getUser.exists) {
          const post = doc.data();
          console.log(doc)
          postListPrivad.appendChild(viewPostList(doc, getUser, post, idUserAuth));
        }
        //;

      })
    })

  });

  viewListPostPublic().onSnapshot(data => {
    postList.innerHTML = ''
    data.forEach(doc => {
      getDataDoc(doc.data().user).then((getUser) => {
        // console.log(getUser.data().name)
        if (getUser.exists) {
          const post = doc.data();
          console.log(doc)
          postList.appendChild(viewPostList(doc, getUser, post, idUserAuth));
        }
        //;

      })
    })

  });
  return postListPrivad
  // }
  // getUserReady(getUserIdView)
}

export const getPosts = () => {
  let db = firebase.firestore();
  db.collection('posts').onSnapshot(snapshot => {
    //console.log(snapshot.docs)
    setUpPost(snapshot.docs);
  })
};

export const deletePost = id => {
  let db = firebase.firestore();
  return db.collection("posts").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

export const editPost = (id, description, state) => {
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