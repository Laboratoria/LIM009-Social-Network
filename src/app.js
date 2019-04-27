const registrar = () => {
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById('contrasena').value;

    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    };

const acceder = () => {
        const email2 = document.getElementById("email2").value;
        const contrasena2 = document.getElementById('contrasena2').value;
        firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
};