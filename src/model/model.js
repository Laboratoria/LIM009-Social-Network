
export const updatePerfilUser = (user, name) => {

    return user.updateProfile({
        displayName: `${name}`

    })
}
export const updateEmailUser = (user, email) => {
    // var user = firebase.auth().currentUser;
    // console.log(email, user)

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

export const createComentPost = (idPost, user, comemt, fechaComent) => {
    let db = firebase.firestore();
    let comentPost = db.collection('posts').doc(`${idPost.id}`)
        .collection('comemt').add({
            user: user,
            comment: comemt,
            fecha: fechaComent

        })
    return comentPost
}
export const getPost = (idPost) => {
    let db = firebase.firestore();
    return db.collection('posts').doc(`${idPost.id}`).collection('comemt')
}

export const viewListPost = (idUser) => {
    let db = firebase.firestore();
    return db.collection('posts').where('state', '==', 'privado').where('user', '==', `${idUser}`).orderBy('fechaPost', 'desc')
}
export const likesPost = (id, like) => {
    let db = firebase.firestore();
    return db.collection("posts").doc(id).update({
        likes: like
    })
}
// dbor()

// export editName


// export const dataBaseUser = user => {
//     let db = firebase.firestore();
//         return db.collection('users').doc(`${user.uid}`).set({
//         uid: user.uid,
//         name: user.displayName || '',
//         email: user.email,
//         photo: user.photoURL || './image/profile-padre.jpg'
//     }).then((docRef) => {
//         console.log("Document written with ID: ", docRef);
//     }).catch((error) => {
//         console.error("Error adding document: ", error);
//     })
// };

// export const getDataDoc = (uid) => {
//     let db = firebase.firestore();
//     var docRef = db.collection("users").doc(`${uid}`);

//     return docRef.get().then(function (doc) {
//         if (doc.exists) {
//             return doc.data();
//         } else {
//             console.log("No existe el documento");
//         }
//     }).catch(function (error) {
//         console.log("Error getting document:", error);
//     })
// }

// // Actualizar los datos del perfil


// export const updateDatos = (user, name, email) => {
//     let db = firebase.firestore();
//     db.collection("users").doc(`${user.uid}`).update({
//         name: name,
//         email: email
//     })
//     .then(function () {
//         alert('Tus datos fueron actualizados exitosamente!')
//         console.log("Document successfully updated!");
//     }).catch(error => alert('Upps hubo un error! '));
// }

// export const getUserUid = () => {
//         var user = firebase.auth().currentUser;
//         if (user) {
//           return user.uid;
//         } else {
//           console.log('No user is signed in.');
//         }
//     }

// setTimeout(() => {firebase.auth().currentUser != null}, 3000)







