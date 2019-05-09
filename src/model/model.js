
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







