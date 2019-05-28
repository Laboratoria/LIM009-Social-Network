import {
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    currentUser,
    promiseOfSetFirebase,
    promiseOfgetFirebase,
    promiseOfdeleteFirebase,
    promiseOfUpdateFirebase,
    promiseOnSnapshotFirebase,
    firebaseAuthState,
    promiseOfAddFirebase,
    getUrlImageFromStorage,
} from "../services/firebase.js";

const changeHash = (hash) => {
    location.hash = hash;
};

const signInAfterClick = (email, password) => {
    if (email === '' || password === '') {
        alert('Completa tus datos para ingresar');
    } else {
        signIn(email, password)
            .then((cred) => {
                changeHash('#/user-profile');
            })
            .catch((error) => {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
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


const signUpAfterClick = (email2, password2, userName, userUrlPhoto) => {

    if (email2 === '' || password2 === '' || userName === '' || userUrlPhoto === '') {
        alert('Completa tus datos para registrarte');
    } else {
        signUp(email2, password2)
            .then((cred) => {
                console.log(cred.user);

                return promiseOfSetFirebase('users', cred.user.uid, {
                        name: userName,
                        photo: userUrlPhoto,
                        userId: cred.user.uid,
                        email: email2,
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
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user; // ...
            console.log(token);
            const userName = user.displayName;
            const userEmail = user.email;
            const userPhoto = user.photoURL;
            const idUser = user.uid;
            return promiseOfSetFirebase('users', idUser, {
                name: userName,
                userId: idUser,
                email: userEmail,
                photo: userPhoto,
            });
        })
        .catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
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
            let token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            let user = result.user;
            const userName = user.displayName;
            const userEmail = user.email;
            const userPhoto = user.photoURL;
            const idUser = user.uid;
            return promiseOfSetFirebase('users', idUser, {
                name: userName,
                userId: idUser,
                email: userEmail,
                photo: userPhoto,
            });
        }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
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
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log('Paso por aqui');
        })
};

//Funcion que retorna la data del usuario (documento con el id del usuario)
const getDataOfUser = (uid) => {
    return promiseOfgetFirebase('users', uid)
        .then((doc) => {
            // console.log(doc.data()
            return doc.data(); // retorna una promesa
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
};

const deletePostAfterClick = (idPost, idUserOfPost) => {
    const uidOfCurrentUser = currentUser().uid; // id del usuario logueado actual 
    console.log(uidOfCurrentUser); // id del usuario logueado actual 
    console.log(idUserOfPost); // id del usuario  dentro del objeto post
    console.log(idPost); // id del post
    if (uidOfCurrentUser === idUserOfPost) {
        promiseOfdeleteFirebase("posts", idPost)
            .then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    } else {
        alert("You can not delete a comment which was not published by you");
    }
};

const editPostInCloudFireStore = (idPost, idUserOfPost, commentInputNewValue) => {
    const uidOfCurrentUser = currentUser().uid; // id del usuario logueado actual   
    console.log(idPost); // id del post
    if (uidOfCurrentUser === idUserOfPost) {
        promiseOfUpdateFirebase("posts", idPost, {
                content: commentInputNewValue,
            })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    } else {
        alert("You can not edit a comment which was not published by you");

    }
};

const getPostsInRealtime = (callback) => {
    promiseOnSnapshotFirebase('posts', (arrOfAllPosts) => {
        let arrOfPosts = [];
        arrOfAllPosts.forEach((onePost) => {
            arrOfPosts.push({ id: onePost.id, ...onePost.data() })
        })
        callback(arrOfPosts);
    });
};
// usuario activo 
const getUserActive = (callback) => { //printUserinfo()
    if (currentUser()) { // si el usuario ha iniciado sesion y existe un current user
        callback(currentUser()) // printUserinfo() recibe al usuario actual
    } else { // si el usuario recarga la pagina ,se activa un observador para saber el estado del usuario
        const unsuscribe = firebaseAuthState((user) => {
            if (user) { // si se verifica que existe un current user
                callback(user) // printUserInfo recibe al usuario actual
            } else { // si no existe un current user
                unsuscribe(); //entonces se desactiva el observador  // 
            }
        })

    }

};
const addPostToCloudFirestore = (inputComment, idUser, statusComment, photo) => {
    const f = new Date();
    let fecha = f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear();
    promiseOfAddFirebase('posts', {
            hours: f.getHours() + ":" + f.getMinutes(),
            today: fecha,
            content: inputComment,
            userId: idUser,
            state: statusComment,
            likes: 0,
            photoPost: photo,
        }).then((docRef) => {
            console.log(docRef);
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

};


const handleFileUploadSubmit = (inputComment, idUser, statusComment, /* progress, */ selectedFile) => {
    if (selectedFile !== undefined) {
        getUrlImageFromStorage(selectedFile, /* progress, */ (url) => {
            addPostToCloudFirestore(inputComment, idUser, statusComment, url)
        })
    } else {
        addPostToCloudFirestore(inputComment, idUser, statusComment, '');
    }
};

const editProfile = (name1, age1, sex1, birthCountry, userId1) => {
    promiseOfUpdateFirebase("users", userId1, {
            name: name1,
            age: age1,
            sex: sex1,
            country: birthCountry,
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
};


/* const likesForPosts = (postId, contador1) => {
    promiseOfUpdateFirebase('posts', postId, {
            likes: contador1,
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
}; */


export {
    signInAfterClick,
    signUpAfterClick,
    signInWithGoogleAfterClick,
    signInWithFacebookAfterClick,
    signOutUser,
    getDataOfUser,
    getUserActive,
    deletePostAfterClick,
    editPostInCloudFireStore,
    getPostsInRealtime,
    editProfile,
    /*     likesForPosts,
     */
    handleFileUploadSubmit,
    /*     generateSubcollections,
        getUsersLikesInRealtime */
};