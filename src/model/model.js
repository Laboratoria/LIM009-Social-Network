export const dataBaseUser = user => {
   let db = firebase.firestore();
   return db.collection('users-rrss').doc(user.uid).set({
       uid: user.uid,
       name: user.displayName,
       email: user.email,
       photo: user.photoURL
   }).then((docRef) => {
    console.log("Document written with ID: ", docRef);
    }).catch((error) => {
    console.error("Error adding document: ", error);
    });
};


export const dataBaseUserCreateEmail = user => {
    let db = firebase.firestore();
    return db.collection('users-create').doc(user.uid).set({
        uid: user.uid,
        name: 'Padre-respt',
        email: user.email,
        photo: './image/profile-padre.jpg'
    }).then(function (docRef) {
       console.log("Document written with ID: ", docRef);
    }).catch(function (error) {
      console.error("Error adding document: ", error);
    });
 }



