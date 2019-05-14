import { signInWithEmail, signInWithGoogle, signInWithFacebook, createEmailAndPassword, signOut } from "../lib/lib-firebase.js";

const changeHash = (hash) => {
  location.hash = hash;
}

export const registerUser = () => {
  const emailRegister = document.querySelector('#email-register').value;
  const passwordRegister = document.querySelector('#password-register').value;
  return createEmailAndPassword(emailRegister, passwordRegister)
    .then((result) => {
      // dataBaseUser(result.user);
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
    .then(() => changeHash('/welcomeUser')
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
  return signInWithGoogle().then(() =>
    changeHash('/welcomeUser'))
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
  return signInWithFacebook().then(() =>
    changeHash('/welcomeUser')
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
export const createPost = () => {
  let description = document.querySelector('#description').value;
  let db = firebase.firestore();
  db.collection("posts").add({
    description: description,
    state: 'Público',
    likes: 0
  })
    .then(() => {
      document.getElementById('create-post').reset();
      console.log("Document written succesfully");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

/*let db = firebase.firestore();
db.collection('posts').get.then(snapshot => {
  console.log(snapshot.docs)
});*/

export const setUpPost = (data) => {
  let html = '';
  const postList = document.querySelector('#post-list');
  data.forEach(doc => {
    const post = doc.data();
    const li = `
    <li>
      <p>${post.description}</p>
    </li>
    `;
    html += li;
  });

  return postList.innerHTML = html;
}