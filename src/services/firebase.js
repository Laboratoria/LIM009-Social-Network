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

const addPostToCloudFirestore = (inputComment, userId, userName) =>
    dataBaseCloudFirestore().collection('posts').add({
        name: userName,
        content: inputComment,
        id: userId,
        state: false,
        likes: 0,
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });;


const getOnePostInRealtime = (callback) => {
    dataBaseCloudFirestore().collection('posts').onSnapshot((arrOfAllPosts) => { // [{},{},{}] c/object representa un post diferente
        const arrOfOnePost = [];
        arrOfAllPosts.forEach((onePost) => { // {}
                onePost; // {}
                arrOfOnePost.push({ id: onePost.id, ...onePost.data() })
            })
            //arrOfOnePost [{}]
        callback(arrOfOnePost)
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
    getOnePostInRealtime
};
