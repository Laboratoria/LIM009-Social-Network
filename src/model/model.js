
export const updatePerfilUser = (user, name) => {

    return user.updateProfile({
        displayName: `${name}`

    })
}
export const updateEmailUser = (user, email) => {
    return user.updateEmail(`${email}`)
}
export const updatePhoto = (user, photo) => {
    // console.log(user, photo)
    return user.updateProfile({
        // displayName: "Jane Q. User",

        photoURL: `${photo}`

    }).then(function () {
        console.log(user, photo)
        alert('exito')
    }).catch(function (error) {
        alert('no exito')
    });
}
export const dataBaseUser = (user) => {
    let db = firebase.firestore();
    return db.collection('users').doc(user.uid).set({
        uid: user.uid,
        name: (user.displayName === null) ? 'Anónimo' : user.displayName,
        email: user.email,
        photo: (user.photoURL === null) ? './image/icono-login-user.png' : user.photoURL
    })
};
export const getDataDoc = users => {
    let db = firebase.firestore();
    var docRef = db.collection("users").doc(`${users}`);

    return docRef.get()
}

export const createComentPost = (idPost, user, comment, fechaComment) => {
    let db = firebase.firestore();
    let comentPost = db.collection('posts').doc(`${idPost.id}`)
        .collection('comment').add({
            user: user,
            comment: comment,
            fecha: fechaComment

        })
    return comentPost
}
export const getPost = (idPost) => {
    let db = firebase.firestore();
    return db.collection('posts').doc(`${idPost.id}`).collection('comment')
}

export const viewListPostPrivate = (idUser) => {
    let db = firebase.firestore();
    return db.collection('posts').where('state', '==', 'privado').where('user', '==', `${idUser}`).orderBy('fechaPost', 'desc')
}
export const viewListPostPublic = () => {
    let db = firebase.firestore();
    return db.collection('posts').where('state', '==', 'publico').orderBy("fechaPost", "desc")
}
export const likesPost = (id, like) => {
    let db = firebase.firestore();
    return db.collection("posts").doc(id).update({
        likes: like
    })
}
export const deletePost = id => {
    let db = firebase.firestore();
    return db.collection("posts").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}
export const deleteComment = (idPost, id) => {

    let db = firebase.firestore();
    return db.collection('posts').doc(`${idPost.id}`).collection('comemt').doc(id).get()

}
//Crear post con IDs por defecto
export const createPost = (state, imagePost, fechaPost, description, userID, horaPost) => {

    let db = firebase.firestore();
    return db.collection("posts").add({
        description: description,
        state: state,
        likes: 0,
        user: userID,
        image: imagePost,
        fechaPost: fechaPost,
        horaPost: horaPost
    })

}










