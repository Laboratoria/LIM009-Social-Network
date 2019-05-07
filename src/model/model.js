export const dataBaseUser = user => {
    let db = firebase.firestore();
    return db.collection('users').doc(user.uid).set({
        uid: user.uid,
        name: user.displayName || '',
        email: user.email,
        photo: user.photoURL || './image/profile-padre.jpg'
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef);
    }).catch((error) => {
        console.error("Error adding document: ", error);
    })
};

// export const dataBaseUserCreateEmail = user => {
//     let db = firebase.firestore();
//     return db.collection('users-create').doc(user.uid).set({
//         uid: user.uid,
//         name: 'Padre-respt',
//         email: user.email,
//         photo: './image/profile-padre.jpg'
//     }).then(function (docRef) {
//         console.log("Document written with ID: ", docRef);
//     }).catch(function (error) {
//         console.error("Error adding document: ", error);
//     });
// }

export const getDataDoc = user => {
    let db = firebase.firestore();
    var docRef = db.collection("users").doc(user.uid);

    return docRef.get().then(function (doc) {
        if (doc.exists) {
            return doc.data()
        } else {
            return alert("No existe el documento");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    })
}


// export const getDataCreat = users => {
//     let db = firebase.firestore();
//     var docRef = db.collection("users-create").doc(`${users}`);

//     return docRef.get().then(function (doc) {
//         if (doc.exists) {
//             return doc.data()
//             console.log("Document data:", doc.data());
//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//     }).catch(function (error) {
//         console.log("Error getting document:", error);
//     });
// }

// Actualizar los datos del perfil


export const updateDatos = (user, name, email) => {
    let db = firebase.firestore();
    db.collection("users").doc(user.uid).update({
        name: name,
        email: email
    })
    .then(function () {
        alert('Tus datos fueron actualizados exitosamente!')
        console.log("Document successfully updated!");
    }).catch(error => alert('Upps hubo un error! '));
}

// export const updateDatosCreate = (user, name, email) => {
//     let db = firebase.firestore();
//     db.collection("users-create").doc(`${user}`).update({
//         name: name,
//         email: email
//     })
//         .then(function () {
//             alert('Tus datos fueron actualizados exitosamente!')
//             console.log("Document successfully updated!");
//         }).catch(error => alert('Upps hubo un error! '));
// }







