import { signInWithEmail, signInWithGoogle, signInWithFacebook, createEmailAndPassword, signOut } from "../lib/lib-firebase.js";
import { updatePerfilUser, updateEmailUser, dataBaseUser, getDataDoc, viewListPostPrivate, viewListPostPublic, updatePhoto } from '../model/model.js';
import { getUserReady } from '../lib/comple-firebase.js'
import viewPostList from '../view/view-pos-list.js';

const changeHash = (hash) => {
  location.hash = hash;
};

export const registerUser = () => {
  const emailRegister = document.querySelector('#email-register').value;
  const passwordRegister = document.querySelector('#password-register').value;

  return createEmailAndPassword(emailRegister, passwordRegister)
    .then(result => {
      console.log(result.user)
      dataBaseUser(result.user).then(() => {
        const updateUSer = (user) => {
          updatePerfilUser(user, 'Aninimo');
          updatePhoto(user, './image/icono-login-user.png')
        }
        getUserReady(updateUSer)
        alert('Registro con éxito');
        // changeHash('/welcomeUser');
        console.log("Document written with ID: ");
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
    }).catch(error => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        alert('El correo es inválido');
      } else if (errorCode === 'auth/email-already-in-use') {
        alert('El correo ya ha sido utilizado');
      } else if (errorCode === 'auth/weak-password') {
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
      dataBaseUser(result.user);
      changeHash('/welcomeUser');
    }
    ).catch(error => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == 'auth/user-not-found') {
        alert('El correo no ha sido registrado');
      } else if (errorCode === 'auth/invalid-email') {
        alert('El correo es inválido');
      } else if (errorCode === 'auth/wrong-password') {
        alert('La contraseña es equivocada.');
      } else {
        alert(errorMessage);
      }
    });
};

export const google = () => {
  return signInWithGoogle().then((result) => {
    dataBaseUser(result.user);
    changeHash('/welcomeUser');
  })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/cancelled-popup-request') {
        alert('Sólo se permite una solicitud emergente a la vez.');
      } else if (errorCode === 'auth/invalid-email') {
        alert('El correo es inválido');
      } else if (errorCode === 'auth/wrong-password') {
        alert('La contraseña es equivocada.');
      } else if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('La cuenta ya ha sido utilizada con una credencial diferente')
      } else {
        alert(errorMessage);
      }
    });
};

export const facebook = () => {
  return signInWithFacebook().then((result) => {
    dataBaseUser(result.user);
    changeHash('/welcomeUser');
  }
  ).catch(error => {
    let errorCode = error.code;
    let errorMessage = error.message;
    if (errorCode === 'auth/cancelled-popup-request') {
      alert('Sólo se permite una solicitud emergente a la vez.');
    } else if (errorCode === 'auth/invalid-email') {
      alert('El correo es inválido');
    } else if (errorCode === 'auth/wrong-password') {
      alert('La contraseña es equivocada.');
    } else if (errorCode === 'auth/account-exists-with-different-credential') {
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


export const setUpPost = (idUserAuth) => {
  const postList = document.querySelector('#post-list');
  const postListPrivad = document.querySelector('#post-list-privados');
  viewListPostPrivate(idUserAuth.uid).onSnapshot(data => {
    postListPrivad.innerHTML = '';
    data.forEach(doc => {
      getDataDoc(doc.data().user).then((getUser) => {
        // console.log(getUser.data().name)
        if (getUser.exists) {
          const post = doc.data();
          // console.log(doc)
          postListPrivad.appendChild(viewPostList(doc, getUser, post, idUserAuth));
        }
      });
    });
  });

  viewListPostPublic().onSnapshot(data => {
    postList.innerHTML = '';
    data.forEach(doc => {
      getDataDoc(doc.data().user).then((getUser) => {
        // console.log(getUser.data().name)
        if (getUser.exists) {
          const post = doc.data();
          // console.log(doc)
          postList.appendChild(viewPostList(doc, getUser, post, idUserAuth));
        }
      });
    });
  });
  return postListPrivad;
}

export const editPErfilUser = (idUser, name, email) => {
  updatePerfilUser(idUser, name).then(() => {
    alert('Nombre se actualizó correctamente');
    updateEmailUser(idUser, email).then(() => {
      // Update successful.
      alert('Email se actualizó correctamente');
    }).catch((error) => {
      // An error happened.
      alert(error + 'Actualización Ha ocurrido un error. en email..');
    });
  }).catch((error) => {
    // An error happened.
    if (error === 'Error: This operation is sensitive and requires recent authentication. Log in again before retrying this request.Actualización Ha ocurrido un error. en email..') {
      alert('esta operación es confidencial y requiere autenticación reciente. Vuelva a iniciar sesión antes de volver a intentar esta solicitud de Actualización ')
    } else {
      alert('Actualización Ha ocurrido un error. en nombre..')
    }
  });
};

