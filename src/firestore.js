// crear y guardar coleccion de usuario
export const collectionUser = (objUser) => {
    return firebase.firestore().collection("user2").doc(objUser.uid).set(objUser);
} 
//guardar datos
export const databasePost = (objPost) => {
    return firebase.firestore().collection("notes").add(objPost);
}
  
//leer datos
export const readOneUser = (uid) => {
    return firebase.firestore().collection("user2").doc(uid).get();
}

export const editFirestore = (id, objEdit) => {
    return firebase.firestore().collection("notes").doc(id).update(objEdit);
}
 
//borrar 
export const deleteData = (id) => { 
    return firebase.firestore().collection("notes").doc(id).delete()
      
} 

export const readData = (callbackTemplate) => {
    return firebase.firestore().collection("notes").orderBy("weather", "desc").onSnapshot(callbackTemplate);
}