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
const promiseOfSetFirebase = (nameCollection, docId, obj) => {

    return dataBaseCloudFirestore().collection(nameCollection).doc(docId).set(obj);
}
const promiseOfgetFirebase = (nameCollection, docId) => {
    return dataBaseCloudFirestore().collection(nameCollection).doc(docId).get();
}
const promiseOfdeleteFirebase = (nameCollection, docId) => {
    return dataBaseCloudFirestore().collection(nameCollection).doc(docId).delete();
}
const promiseOfUpdateFirebase = (nameCollection, docId, obj) => {
    return dataBaseCloudFirestore().collection(nameCollection).doc(docId).update(obj);
}
const promiseOnSnapshotFirebase = (nameCollection, callback) => {
    return dataBaseCloudFirestore().collection(nameCollection).orderBy('hours').onSnapshot(callback);
}
const firebaseAuthState = (callback) => {
    return firebase.auth().onAuthStateChanged(callback);
}
const promiseOfAddFirebase = (nameCollection, obj) => {
    return dataBaseCloudFirestore().collection(nameCollection).add(obj);
}
const promiseOfSubcollection = (name, postId, subName, obj) => {
    return dataBaseCloudFirestore().collection(name).doc(postId).collection(subName).add(obj)
}
const promiseGetSubcollection = (nameCollection, docId, subName, callback) => {
    return dataBaseCloudFirestore().collection(nameCollection).doc(docId).collection(subName).onSnapshot(callback);
}

const getUrlImageFromStorage = (selectedFile, progress, callback) => {
    const storageService = firebase.storage().ref().child(`images/${selectedFile.name}`).put(selectedFile);
    storageService.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        var percentage = (snapshot.bytesTransferred /
            snapshot.totalBytes) * 100;
        progress.value = percentage;
    }, (error) => {
        // Handle unsuccessful uploads
        console.log(error);
    }, () => {
        // Do something once upload is complete
        storageService.snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
            callback(url);
        });
    });

}


export {
    signUp,
    signIn,
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
    promiseOfSubcollection,
    promiseGetSubcollection,
    getUrlImageFromStorage
};