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

const addPostToCloudFirestore = (inputComment, idUser, userName) =>
    dataBaseCloudFirestore().collection('posts').add({
        author: userName,
        content: inputComment,
        userId: idUser,
        state: false,
        likes: 0,
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });;


const getPostsInRealtime = (callback) => {
    dataBaseCloudFirestore().collection('posts').onSnapshot((arrOfAllPosts) => {
        const arrOfPosts = [];
        arrOfAllPosts.forEach((onePost) => {
            onePost;
            arrOfPosts.push({ id: onePost.id, ...onePost.data() })
        })
        callback(arrOfPosts)
    });

};


export {
    signUp,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    dataBaseCloudFirestore,
    currentUser,
    addPostToCloudFirestore,
    getPostsInRealtime
};