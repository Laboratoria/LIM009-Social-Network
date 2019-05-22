
/*

const upLoadImageToFirestore = (file, callback) => {
    //create ref
    const storageRef = firebase.storage().ref()
    const imageRef = storageRef.child(`images/${file.name}`)

    //update file to fb storage
    const task = imageRef.put(file)
    return task.on('state_changed', (snapshot) => {},
     (error) => {}, 
     () => {
        //get updated img url
        const downloadImg = task.snapshot.ref.getDownloadURL()
        downloadImg.then(callback)
        return callback;
    })
};*/

/*

const upLoadImageToFirestore = (date, image) => {
    const ref = firebase.storage().ref();
   const task = ref.child(`images/${date}-${image.name}`);
    const metadata = { contentType: image.type };
    return task.put(image, metadata)
   
};*/

