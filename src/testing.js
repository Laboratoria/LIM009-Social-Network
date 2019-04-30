const signinBtn = document.getElementById('signin-btn');

signinBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const signinEmail = document.getElementById('signin-email').value;
  const signinPassword = document.getElementById('signin-password').value;
  console.log(signinEmail);
  console.log(signinPassword);
  firebase.auth().createUserWithEmailAndPassword(signinEmail, signinPassword)
      .then(function(result){
        alert("registro correcto");
        location.href="home.html";
      })
      .catch(function(error){
       alert("no se realizado la autenticacion");
      });

})

// MODAL - REGISTRO
// Get the modal
const modal = document.getElementById('myModal');
// Get the button that opens the modal
const btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 
btn.addEventListener('click', () => {
  modal.style.display = 'block';
})
// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => {
  modal.style.display = 'none';
})
// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
    }
})

// FORM - REGISTRO
const signupBtn = document.getElementById('signup-btn');
signupBtn.addEventListener('click', () => {
  // const signupName = document.getElementById('signup-name').value;
  const signupEmail = document.getElementById('signup-email').value;
  const signupPassword = document.getElementById('signup-password').value;
  firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword )
  .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
})

// const registrar=()=>{
 
//   const email=document.getElementById("email").value;
//   const contraseña=document.getElementById("contraseña").value;
//   firebase.auth().createUserWithEmailAndPassword(email, contraseña)
//   .catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.log(errorCode);
//       console.log(errorMessage);
//       // ...
//     });
    

// rocio
googleSignIn=()=>{
  base_provider=new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(base_provider).then(function (result) {
console.log(result)

// borrar
var name = result.user-displayName;



       $('#page').css("display", "none") && $('#page2').css("display", "block");
       document.getElementById("borrar").textContent="Bienvenido"+name;

// borrar
    console.log("Success Goggle")
  }).catch(function (err){
    console.log(err)
    console.log("falled")

})
}
// rocio

// function registrar(){
//     const registrar=()=>{
 
//     const email=document.getElementById("email").value;
//     const contraseña=document.getElementById("contraseña").value;
//     firebase.auth().createUserWithEmailAndPassword(email, contraseña)
//     .catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log(errorCode);
//         console.log(errorMessage);
//         // ...
//       });
      


// };
// rocio
