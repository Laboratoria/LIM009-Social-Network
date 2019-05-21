// Registro con solo correo y contraseña
const signUp = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

// Inicion de sesión  con solo email y contraseña
const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

// Inicio de sesión con g-mail y contraseña de g-mail
const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider);

};

// Inicio de sesión con  cuenta de facebook y contraseña de facebook
const signInWithFacebook = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(facebookProvider);
};

// Cerrar seión
const signOut = () => {
    return firebase.auth().signOut();
};
const dataBaseCloudFirestore = () => {
    return firebase.firestore();
};
const currentUser = () => {
    return firebase.auth().currentUser
};

const addPostToCloudFirestore = (inputComment, idUser, statusComment, photo) =>
    dataBaseCloudFirestore().collection('posts').add({
        content: inputComment,
        userId: idUser,
        state: statusComment,
        likes: 0,
        photoPost: photo,
  

    }).then(function(docRef) {
        console.log(docRef);
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

const deletePostInCloudFireStore = (idPost, idUserOfPost) => {

    const uidOfCurrentUser = currentUser().uid; // id del usuario logueado actual 
    console.log(uidOfCurrentUser); // id del usuario logueado actual 
    console.log(idUserOfPost); // id del usuario  dentro del objeto post
    console.log(idPost); // id del post
    if (uidOfCurrentUser === idUserOfPost) {
        dataBaseCloudFirestore().collection("posts").doc(idPost).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    } else {
        alert("You can not delete a comment which was not published by you");
    }
};
/*

const upLoadImageToFirestore = (file, callback) => {
    //create ref
    const storageRef = firebase.storage().ref()
    const imageRef = storageRef.child(`images/${file.name}`)

    //update file to fb storage
    const task = imageRef.put(file)
    return task.on('state_changed', (snapshot) => {},
     (error) => {}, 
     () => {
        //get updated img url
        const downloadImg = task.snapshot.ref.getDownloadURL()
        downloadImg.then(callback)
        return callback;
    })
};*/

/*

const upLoadImageToFirestore = (date, image) => {
    const ref = firebase.storage().ref();
    const task = ref.child(`images/${date}-${image.name}`);
    const metadata = { contentType: image.type };
    return task.put(image, metadata)

};*/












export {
    signUp,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    dataBaseCloudFirestore,
    currentUser,
    addPostToCloudFirestore,
    deletePostInCloudFireStore,
    // upLoadImageToFirestore,
};