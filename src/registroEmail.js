var config = {
    apiKey: "AIzaSyDq83GdPtM8kOrF6BGhTuAkFFFC7T-ou2c",
    authDomain: "fir-basics-c204d.firebaseapp.com",
    databaseURL: "https://fir-basics-c204d.firebaseio.com",
    projectId: "fir-basics-c204d",
    storageBucket: "fir-basics-c204d.appspot.com",
    messagingSenderId: "582126712915"
};
firebase.initializeApp(config);

const buttonRegisterEmail = document.getElementById('buttonRegister')

buttonRegisterEmail.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });


});


const buttonLogInEmail = document.getElementById('buttonLogInEmail')

buttonLogInEmail.addEventListener('click', () => {
    const emailLogInEmail = document.getElementById('emailLogInEmail').value;
    const passwordLogInEmail = document.getElementById('passwordLogInEmail').value;

    firebase.auth().signInWithEmailAndPassword(emailLogInEmail, passwordLogInEmail).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });


});



function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log(" existe usuario acctivo")
          var displayName = user.displayName; 
          var email = user.email;
          console.log(email);
         
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;

          show();
          // ...
        } else {
        console.log("npoo existe usuario acctivo")
        }
      });
}

observador();


function show(){
    const contenido = document.getElementById("contenido");
    contenido.innerHTML = `<h1>Bienvenido</h1>
    <button id="buttonLogOut"></button>
    `;
    const buttonLogOut = document.getElementById('buttonLogOut');
    buttonLogOut.addEventListener('click',signOut);
}


function signOut(){
    firebase.auth().signOut()
    .then(function(){
        console.log("SALIENDO");
    })
    .catch(function(error){
        console.log(error)
    })
}