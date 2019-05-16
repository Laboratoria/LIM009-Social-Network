export default (file, uploader, calback) => {

    let metadata = {
        contentType: 'image/jpeg'
    };
    let storageRef = firebase.storage().ref('users_fotos/' + file.name);
    // Subir archivo
    let uploadTask = storageRef.put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {

            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = progress;
            // console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: alert('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: alert('exito'); break;
            }
        }, function (error) {

            switch (error.code) {
                case 'storage/unauthorized':
                    alert('User doesnt have permission to access the object')
                    break;

                case 'storage/canceled':
                    alert('// User canceled the upload')
                    break;

                // ...

                case 'storage/unknown':
                    alert(' // Unknown error occurred, inspect error.serverResponse')
                    break;
            }
        }, () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                calback(downloadURL)
            });
        });
}