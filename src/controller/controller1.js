import {
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    dataBaseCloudFirestore,
    

} from "../services/firebase.js";


const changeHash = (hash) => {
    location.hash = hash;
};


const signInAfterClick = () => {
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
const signUpAfterClick = () => {
    const email2 = document.querySelector('#email2').value;
    const password2 = document.querySelector('#password2').value;
    const userName = document.querySelector('#name').value;
    const userLastName = document.querySelector('#last-name').value;
    // cambios *******
    if (email2 === '' || password2 === '' || userName === '' || userLastName === '') {
        alert('Completa tus datos para registrarte');
    } else {
        signUp(email2, password2)
        .then((cred) => { // afinar nombres *********
            console.log(cred.user);
            // cambiar el llamado de firebase ********
            return dataBaseCloudFirestore().collection('users').doc(cred.user.uid).set({
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

const signInWithGoogleAfterClick = () => {
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
            return dataBaseCloudFirestore().collection('users').doc(userId).set({
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

const signInWithFacebookAfterClick = () => {
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
            return dataBaseCloudFirestore().collection('users').doc(userId).set({
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

const signOutUser = () => {
    signOut()
        .then(() => changeHash(''))
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Paso por aqui');
        })
};

//Funcion que retorna la data del usuario (documento con el id del usuario)
const getDataOfUser = (uid) => {
    return dataBaseCloudFirestore().collection('users').doc(uid).get()
        .then(function(doc) {

            return doc.data(); // retorna una promesa

        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
};

// usuario activo 
const getUserActive = (callback) => { //printUserinfo()
    if ( firebase.auth().currentUser){ // si el usuario ha iniciado sesion y existe un current user
      callback(firebase.auth().currentUser) // printUserinfo() recibe al usuario actual
   }else {// si el usuario recarga la pagina ,se activa un observador para saber el estado del usuario
      const unsuscribe = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {// si se verifica que exite un current user
          callback (user)// printUserInfo recibe al usuario actual
        } else { // si no existe un current user
            unsuscribe(); //entonces se desactiva el observador  // se deberia poner el unsuscribe en esta posicion 
        }
    })
<<<<<<< HEAD
=======
  
>>>>>>> e81bba25b416534f18899b4736c8654eecf10837
   }
   
 };

export {
    signInAfterClick,
    signUpAfterClick,
    signInWithGoogleAfterClick,
    signInWithFacebookAfterClick,   
    signOutUser,
    getDataOfUser,
    getUserActive

};
