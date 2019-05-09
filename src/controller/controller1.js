import {
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
 //   getUser

} from "../services/firebase.js";


const changeHash = (hash) => {
    location.hash = hash;
};

/* import { signUpWithGoogle } from "../services/firebase.js"  */
const signInOnSubmit = () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    if (email === '' || password === '') {
        alert('Completa tus datos para ingresar');
    } else {
        signIn(email, password).then((cred) => {
                changeHash('#/user-profile');
               })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                if (errorCode == 'auth/weak-password') {
                    alert('El nivel de seguridad de la contraseña es : débil.');
                } else if (errorCode == "auth/email-already-in-use") {
                    alert('Ya existe esta cuenta')
                } else if (errorCode == 'auth/invalid-email') {
                    alert('La dirección de correo electrónico es inválida')
                } else if (errorCode == 'auth/invalid-email') {
                    alert('La dirección de correo electrónico es inválida')
                } else {
                    alert('No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado.')
                }
                console.log(error);
            });
    }
};



// cambiar nombre de la funcion **********
const signUpOnSubmit = () => {
    const email2 = document.querySelector('#email2').value;
    const password2 = document.querySelector('#password2').value;
    const userName = document.querySelector('#name').value;
    const userLastName = document.querySelector('#last-name').value;
    // cambios *******
    if (email2 === '' || password2 === '' || userName === '' || lastName === '') {
        alert('Completa tus datos para registrarte');
    } else {
        signUp(email2, password2)
        .then((cred) => { // afinar nombres *********
            console.log(cred.user);
            // cambiar el llamado de firebase ********
            return firebase.firestore().collection('users').doc(cred.user.uid).set({
                name: userName,
                lastName: userLastName,
                uid: cred.user.uid,
                email: email2,
                password: password2,
            })
            .then(()=>{
              const form = document.querySelector('#register-form');
                form.reset();
                alert('Registrado exitosamente');
            })
            .then(() => changeHash(''));
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            if (errorCode == 'auth/weak-password') {
                alert('El nivel de seguridad de la contraseña es : débil.');
            } else if (errorCode == "auth/email-already-in-use") {
                alert('Ya existe esta cuenta')
            } else if (errorCode == 'auth/invalid-email') {
                alert('La dirección de correo electrónico es inválida')
            } else if (errorCode == 'auth/invalid-email') {
                alert('La dirección de correo electrónico es inválida')
            } else {
                alert('No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado.')
            }
            console.log(error);
        })
    };
};

const signInOnSubmitGoogle = () => {
    signInWithGoogle()
        .then((result) => {
            changeHash('#/user-profile')
                // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user; // ...
            console.log(token);
            const userName = user.displayName;
            const userEmail = user.email;
            const userPhoto = user.photoURL;
            const userId = user.uid;
            return firebase.firestore().collection('users').doc(userId).set({
                name: userName,
                uid: userId,
                email: userEmail,
                photo: userPhoto,
            });


        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}

const signInOnSubmitFacebook = () => {
    signInWithFacebook()
        .then((result) => {
            changeHash('#/user-profile');
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            var user = result.user;

            const userName = user.displayName;
            const userEmail = user.email;
            const userPhoto = user.photoURL;
            const userId = user.uid;
            return firebase.firestore().collection('users').doc(userId).set({
                name: userName,
                uid: userId,
                email: userEmail,
                photo: userPhoto,
            });
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
};
/*

const editProfileUser = ()=>{

    var usuarios = db.collection("users").doc(userId);

    // Set the "capital" field of the city 'DC'
    return usuarios.update({
        name: true,
        email :true,
        photo : true

    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}
// Funcion para actualizar un documento de la coleccion users like
const addCommentToUserDoc = () => { //userId,commentValue
    const inputCommentUser = document.querySelector('#input-comment').value;
    console.log(inputCommentUser);
    const currentUserId = firebase.auth().currentUser.uid;
    console.log(currentUserId);
    return firebase.firestore().collection('users').doc(currentUserId).update({
        'comment': inputCommentUser,
    });
};*/

const signOutUser = () => {
    signOut()
        .then(() => changeHash(''))
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Paso por aqui');
        })
};

//import profileUser from "../view/profile-user.js"
const getData = (uid) => {
    return firebase.firestore().collection('users').doc(uid).get()
        .then(function(doc) {

            return doc.data();

        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
};

// usuario activo 
const getUserActive = (callback) => { //userinfo()
    if ( firebase.auth().currentUser){
      callback(firebase.auth().currentUser) // userinfo recibe al usuario actual
   }else {
      const unsuscribe = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          callback (user)
        } else {
         callback (null)
        }
    })
    unsuscribe();
   // desactiva el observador
   }
   
 };

export {
    signInOnSubmit,
    signUpOnSubmit,
    signInOnSubmitGoogle,
    signInOnSubmitFacebook,   
    signOutUser,
    //activeUserObserver,
 
    getData,
    getUserActive

};
