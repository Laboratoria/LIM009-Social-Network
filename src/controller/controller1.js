import {
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    dataBaseCloudFirestore,
    currentUser,
    addPostToCloudFirestore,
    deletePostInCloudFireStore,
    //editPostInCloudFireStore,


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
        signIn(email, password)
            .then((cred) => {
                changeHash('#/user-profile');
            })
            .catch(function (error) {
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
    const userPhoto = document.querySelector('#user-photo').value;
    // cambios *******
    if (email2 === '' || password2 === '' || userName === '' || userPhoto === '') {
        alert('Completa tus datos para registrarte');
    } else {
        signUp(email2, password2)
            .then((cred) => { // afinar nombres *********
                console.log(cred.user);
                // cambiar el llamado de firebase ********
                return dataBaseCloudFirestore().collection('users').doc(cred.user.uid).set({
                    name: userName,
                    photo: userPhoto,
                    userId: cred.user.uid,
                    email: email2,
                    // password: password2,
                })
                    .then(() => {
                        const form = document.querySelector('#register-form');
                        form.reset();
                        alert('Registrado exitosamente');
                    })
                    .then(() => changeHash(''))

            })
    }
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
            const idUser = user.uid;
            return dataBaseCloudFirestore().collection('users').doc(idUser).set({
                name: userName,
                userId: idUser,
                email: userEmail,
                photo: userPhoto,
            });


        })
        .catch(function (error) {
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
            const idUser = user.uid;
            return dataBaseCloudFirestore().collection('users').doc(idUser).set({
                name: userName,
                userId: idUser,
                email: userEmail,
                photo: userPhoto,
            });
        }).catch(function (error) {
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
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Paso por aqui');
        })
};

//Funcion que retorna la data del usuario (documento con el id del usuario)
const getDataOfUser = (uid) => {
    return dataBaseCloudFirestore().collection('users').doc(uid).get()
        .then(function (doc) {
            console.log(doc.data())
            return doc.data(); // retorna una promesa
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
};


const createPostInCloudFirestore = () => {
    event.preventDefault();
    const inputComment = document.querySelector("#input-comment").value;
    // console.log(inputComment);
    //console.log(getDataOfUser(currentUser().uid));
    const idUser = currentUser().uid;
    console.log(currentUser());
    console.log(idUser);
    return addPostToCloudFirestore(inputComment, idUser);
};

 const deletePostAfterClick = (e) =>{
    const postId=e.target.parentElement.getAttribute('data-id');
   
    const  userIdOfPost=e.target.getAttribute('data-uid-post');
console.log(postId);
 deletePostInCloudFireStore(postId,userIdOfPost)};




/*
 const editPostAfterClick = (e) =>{
    const divContent=document.querySelector("#content-comment-div");
    const saveBtn=document.querySelector("#btn-save-after-edit");
    
    console.log(divContent);
     const currentUserId=currentUser().uid;
     console.log(currentUserId);
     console.log(e);
     console.log(e.target);
    const  userIdOfPost=e.target.dataset.uidPost;
    console.log(userIdOfPost);
    const  idOfPost=e.target.parentElement.getAttribute('data-id');
    console.log(idOfPost);
    if (currentUserId=== userIdOfPost){
       divContent.setAttribute("contenteditable",true);
       console.log("You can edit now");
       console.log(e.target);
       saveBtn.addEventListener('click',()=>{
        divContent.setAttribute("contenteditable",false);
        const newContent=(divContent.textContent);
        console.log(newContent);
        editPostInCloudFireStore(idOfPost,userIdOfPost,newContent);
    })
    
    }else{
        alert("You cant edit a coment that was not published by you");
    }
    
    
 };*/



// usuario activo 
const getUserActive = (callback) => { //printUserinfo()
    if (currentUser()) { // si el usuario ha iniciado sesion y existe un current user
        callback(currentUser()) // printUserinfo() recibe al usuario actual
    } else { // si el usuario recarga la pagina ,se activa un observador para saber el estado del usuario
        const unsuscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) { // si se verifica que existe un current user
                callback(user) // printUserInfo recibe al usuario actual
            } else { // si no existe un current user
                unsuscribe(); //entonces se desactiva el observador  // se deberia poner el unsuscribe en esta posicion 
            }
        })

    }

};


export const deletePost = (postId) => {
    return dataBaseCloudFirestore().collection("posts").doc(postId).delete();
}


export const editPost = (postId,postText) => {
    document.querySelector('#post-content').value = postText;

    let  collectionPost = dataBaseCloudFirestore().collection("posts").doc(postId);
    // Set the "capital" field of the city 'DC'
    return collectionPost.update({
        content: postText,
      
    })
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}


export {
    signInAfterClick,
    signUpAfterClick,
    signInWithGoogleAfterClick,
    signInWithFacebookAfterClick,
    signOutUser,
    getDataOfUser,
    getUserActive,
    createPostInCloudFirestore,
    deletePostAfterClick,
   // editPostAfterClick,
   


};