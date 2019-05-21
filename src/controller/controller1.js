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
    //upLoadImageToFirestore,


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
    const userAge = document.querySelector('#age').value;
    const userSex = document.querySelector('#sex').value;
    const userBirthCountry = document.querySelector('#birth-country').value;
    const userUrlPhoto = document.querySelector('#user-photo').value;
    const userFilePhoto = document.querySelector("#user-photo2").value;

    // cambios *******
    if (email2 === '' || password2 === '' || userName === '' || userUrlPhoto === '' || userAge === '' || userSex === '' || userBirthCountry === '') {
        alert('Completa tus datos para registrarte');
    } else {
        signUp(email2, password2)
            .then((cred) => { // afinar nombres *********
                console.log(cred.user);
                // cambiar el llamado de firebase ********
                return dataBaseCloudFirestore().collection('users').doc(cred.user.uid).set({
                        name: userName,
                        age: userAge,
                        sex: userSex,
                        country: userBirthCountry,
                        photo: userUrlPhoto,
                        photoFile: userFilePhoto,
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
            // console.log(doc.data()
            return doc.data(); // retorna una promesa
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
};




/*
const createPostInCloudFirestore = () => {
    event.preventDefault();
    const inputComment = document.querySelector("#input-comment").value;
    const inputStatus = document.querySelector('#private').checked;
    console.log(inputStatus);
    let status;
    if (inputStatus) {
        status = true;
    } else {
        status = false;
    }
    const idUser = currentUser().uid;
    console.log(idUser);
    return addPostToCloudFirestore(inputComment, idUser, status, "");
};*/

const deletePostAfterClick = (e) => {
    console.log(e.target)
    const postId = e.target.dataset.idPost;
    const userIdOfPost = e.target.dataset.uidPost;
    deletePostInCloudFireStore(postId, userIdOfPost)
};

const editPostInCloudFireStore = (idPost, idUserOfPost, commentInputNewValue) => {

    const uidOfCurrentUser = currentUser().uid; // id del usuario logueado actual   
    console.log(idPost); // id del post
    if (uidOfCurrentUser === idUserOfPost) {
        dataBaseCloudFirestore().collection("posts").doc(idPost).update({
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
const validar = () => {
    const e = document.querySelector('#privatePost');
    try {
        if (e.checked == true) {
            return 'myPosts';
        } else if (e.checked == false) {
            return 'publicPost';
        }
    } catch (err) {
        return 'publicPost';
    }
};

const getPostsInRealtime = (callback) => {
    dataBaseCloudFirestore().collection('posts').onSnapshot((arrOfAllPosts) => {
        let arrOfPosts = [];
        arrOfAllPosts.forEach((onePost) => {
            arrOfPosts.push({ id: onePost.id, ...onePost.data() });
        })
        callback(arrOfPosts);
    });
};


/* const getUsersAfterLikes = (postId,callback) => {
    let subcollection = dataBaseCloudFirestore().collection('posts').doc(postId).collection('clicksUsers');
    let arr = [];
    subcollection.onSnapshot((arrOfUsers) => {
        arrOfUsers.forEach((elem) => {
            arr.push({ id: elem.id, ...elem.data() })
        })
        //console.log(arr[0].uidLikesUser)
        callback(arr);
    })
}; */
/*
const getIdPostsInRealtime = () => {
    dataBaseCloudFirestore().collection('posts').onSnapshot((arrOfAllPosts) => {
        const arrOfIdOfAllPost = [];
        arrOfAllPosts.forEach((onePost) => {
            arrOfIdOfAllPost.push(onePost.id);
        })
        return arrOfIdOfAllPost;

    });
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

/* const likesForPosts = (postId, contador1) => {
    let collectionPost = dataBaseCloudFirestore().collection('posts').doc(postId);
    console.log(contador1)
    collectionPost.update({
        likes: contador1,
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => { */


/*
const getImage = () => {
    const date = new Date();
    const file = document.querySelector('#image-file').files[0];
    return upLoadImageToFirestore(date, file)


};*/


let selectedFile;

const handleFileUploadChange = (e) => {


    selectedFile = e.target.files[0];


};

const handleFileUploadSubmit = (inputComment, idUser, statusComment, progress) => {
    const storageService = firebase.storage();
    const storageRef1 = storageService.ref();
    const uploadTask = storageRef1.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory


    uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        var percentage = (snapshot.bytesTransferred /
            snapshot.totalBytes) * 100;
        progress.value = percentage;
    }, (error) => {
        // Handle unsuccessful uploads
        console.log(error);
    }, () => {
        // Do something once upload is complete
        const downloadImg = uploadTask.snapshot.ref.getDownloadURL();
        return downloadImg.then((url) => {
            console.log(url);

            addPostToCloudFirestore(inputComment, idUser, statusComment, url);







        });

    });

};











const editProfile = (name1, age1, sex1, birthCountry, userId1) => {

    dataBaseCloudFirestore().collection("users").doc(userId1).update({

            name: name1,
            age: age1,
            sex: sex1,
            country: birthCountry,
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

};
/*
const addClicksUsers = (postId, idOfUser) => {
    return dataBaseCloudFirestore().collection('posts').doc(postId).collection('clicksUsers').add({
        uidLikesUser: idOfUser,
    })
        .then((docRef) => {
            console.log(docRef)
            console.log("users click successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating uid of users: ", error);
        });
};*/


const likesForPosts = (postId, contador1) => {
    let collectionPost = dataBaseCloudFirestore().collection('posts').doc(postId);
    console.log(contador1)
    return collectionPost.update({
            likes: contador1,
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
};

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
    validar,
    /*    likesForPosts,
       getUsersAfterLikes,
       addClicksUsers */

    editProfile,

    // getImage,
    likesForPosts,

    handleFileUploadChange,
    handleFileUploadSubmit,
};