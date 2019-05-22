

/* const getUsersAfterLikes = (postId,callback) => {
    let subcollection = dataBaseCloudFirestore().collection('posts').doc(postId).collection('clicksUsers');
    let arr = [];
    subcollection.onSnapshot((arrOfUsers) => {
        arrOfUsers.forEach((elem) => {
            arr.push({ id: elem.id, ...elem.data() })
        })
        //console.log(arr[0].uidLikesUser)
        callback(arr);
    })
}; */



/* const likesForPosts = (postId, contador1) => {
    let collectionPost = dataBaseCloudFirestore().collection('posts').doc(postId);
    console.log(contador1)
    collectionPost.update({
        likes: contador1,
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => { */



/* const addClicksUsers = (postId, idOfUser) => {
    return dataBaseCloudFirestore().collection('posts').doc(postId).collection('clicksUsers').add({
        uidLikesUser: idOfUser,
    })
        .then((docRef) => {
            console.log(docRef)
            console.log("users click successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating uid of users: ", error);
        });
} */


/* const likesForPosts = (postId, contador1) => {
    let collectionPost = dataBaseCloudFirestore().collection('posts').doc(postId);
    console.log(contador1)
    return collectionPost.update({
            likes: contador1,
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
}; */
