
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
//
function ingreso(){
  const email2=document.getElementById("signup-email");
  const contraseña2=document.getElementById("signup-password")
  firebase.auth().signInWithEmailAndPassword(email2, contraseña2).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode);
    console.log(errorMessage);
  });
}







//

function registrar(){
  const email=document.getElementById("signin-email").value;
  const contraseña=document.getElementById("signin-password").value;
  firebase.auth().createUserWithEmailAndPassword(email, contraseña).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode);
    console.log(errorMessage);
  });
  
}



