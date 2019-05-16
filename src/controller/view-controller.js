import { signInWithEmail, signInWithGoogle, signInWithFacebook, createEmailAndPassword, signOut, getUserReady } from "../lib/lib-firebase.js";
import { updatePerfilUser, updateEmailUser, dataBaseUser, getDataDoc } from '../model/model.js'

const changeHash = (hash) => {
  location.hash = hash;
}

export const registerUser = () => {
  const emailRegister = document.querySelector('#email-register').value;
  const passwordRegister = document.querySelector('#password-register').value;
  return createEmailAndPassword(emailRegister, passwordRegister)
    .then((result) => {
      dataBaseUser(result.user);
      alert('Registro con éxito')
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
export const createPost = (state, imagePost) => {
  let description = document.querySelector('#description').value;
  let userID = document.querySelector('#user-id').textContent;
  console.log('llegue aqui')
  console.log(state)
  let db = firebase.firestore();
  db.collection("posts").add({
    description: description,
    state: state,
    likes: 0,
    user: userID,
    image: imagePost
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
  const postList = document.querySelector('#post-list');
  data.forEach(doc => {
    getDataDoc(doc.data().user).then((getUser) => {
      if (getUser.exists) {
        // return doc.data()
        // console.log("Document data:", doc.data().name);
        const post = doc.data();
        const article = document.createElement('article');
        //console.log(doc.id);    
        const li = `  
    <li>
      <p>Publicado por ${post.user}</p>
      <p>${post.description}</p>
      <img class ='btn-post' src='./image/editar.png' alt ='boton de editar' id='btn-edit'>
      <img class ='btn-post' src='./image/boton-cancelar.png' alt ='boton para eliminar' id='btn-delete-${doc.id}'>
    </li>
    `
        article.innerHTML = li;
        let btnDelete = article.querySelector(`#btn-delete-${doc.id}`);
        btnDelete.addEventListener('click', () => {
          deletePost(doc.id);
        })
        return postList.appendChild(article);
      }
    });



    return postList
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
