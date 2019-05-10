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



export { signUp, signIn, signInWithGoogle, signInWithFacebook, currentUser, signOut };
