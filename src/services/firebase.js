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

const addPostToCloudFirestore = (inputComment, idUser,photoUrl) =>
    dataBaseCloudFirestore().collection('posts').add({
        content: inputComment,
        userId: idUser,
        state: false,
        likes: 0,
        photo: photoUrl,
    }).then(function(docRef) {
        console.log(docRef);
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

const deletePostInCloudFireStore = (idPost,idUserOfPost) => {
   
    const uidOfCurrentUser=currentUser().uid; // id del usuario logueado actual 
    console.log(uidOfCurrentUser); // id del usuario logueado actual 
    console.log(idUserOfPost); // id del usuario  dentro del objeto post
    console.log(idPost); // id del post
    if(uidOfCurrentUser=== idUserOfPost){
    dataBaseCloudFirestore().collection("posts").doc(idPost).delete().then(()=>{
        alert("Document successfully deleted!");
    }).catch((error)=>{
        console.error("Error removing document: ", error);
    });
}else{ alert("You can not delete a comment which was not published by you");
}
};

const editPostInCloudFireStore = (idPost,idUserOfPost,commentInputNewValue) => {
   
    const uidOfCurrentUser=currentUser().uid; // id del usuario logueado actual 
    console.log(uidOfCurrentUser); // id del usuario logueado actual 
    console.log(idUserOfPost); // id del usuario  dentro del objeto post
  
    console.log(idPost); // id del post
    if(uidOfCurrentUser=== idUserOfPost){
    dataBaseCloudFirestore().collection("posts").doc(idPost).update({
        content: commentInputNewValue,
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });


}
else{ alert("You can not edit a comment which was not published by you");

}
};
    
const getPostsInRealtime = (callback) => {
    dataBaseCloudFirestore().collection('posts').onSnapshot((arrOfAllPosts) => {
        const arrOfPosts = [];
        arrOfAllPosts.forEach((onePost) => {
            console.log(Object.keys(onePost));
            arrOfPosts.push({ id: onePost.id, ...onePost.data() })
        })
        callback(arrOfPosts)
    });

};



const uploadImageToPost = (file, callback) => {
    //create ref
    const storageRef = firebase.storage().ref()
    const imageRef = storageRef.child(`images/${file.name}`)
  
    //update file to fb storage
    const task = imageRef.put(file)
    return task.on('state_changed', (snapshot) => {
        console.log (snapshot);
    }, (error) => {
    }, () => {
    //get updated img url 
      const downloadImg = task.snapshot.ref.getDownloadURL()
      downloadImg.then(callback)
    })
  }


















export {
    signUp,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    dataBaseCloudFirestore,
    currentUser,
    addPostToCloudFirestore,
    getPostsInRealtime,
    deletePostInCloudFireStore,
    editPostInCloudFireStore,
    uploadImageToPost,
};