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





const currentUser = () => {
    var user = firebase.auth().currentUser;
    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        return uid;
    }
};

const signOut = () => {
    return firebase.auth().signOut();
};


// Crear un post con el contenido del post y el id del usuario
export const addPost = (textNewNote, uidUser) =>
    firebase.firestore().collection('posts').doc(uidUser).set({
        content: textNewNote,
        likes: 0,
        idUser: uidUser,
        state: false,

    })
    //Elimina un post
export const deletePost = (idPost) =>
    firebase.firestore().collection('posts').doc(idPost).delete()


//Obteniedo cada document  post de firebase para posteriormente crear un array de posts
export const getPost = (callback) =>
    firebase.firestore().collection('posts')
    .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });
        callback(data); // [{},{},{}]
    });

export { signUp, signIn, signInWithGoogle, signInWithFacebook, currentUser, signOut };