export const logIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const logInGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}

export const createUser = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export const observer = (callback) => {
    return firebase.auth().onAuthStateChanged(callback);
}

export const currentUs = () => {
    return firebase.auth().currentUser;
}

export const signOut = () => {
    return firebase.auth().signOut()
}

export const signInWithRedirect = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
}