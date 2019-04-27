// form de inicio de sesión
const signInForm = ()=>{

    const form = document.createElement('form');
// input email
    const email = document.createElement('input');
    email.type='email';
    pas.classList.add('espacio');
    email.placeholder ='Email';
// input password 
    const password = document.createElement('input');
   password.type ='password';
   password.classList.add('espacio');
   password.placeholder = 'Password'
  
// boton para iniciar sesion
    const btnLogin  = document.createElement('button');
    btnLogin.innerHTML ='Log in';
    btnLogin.classList.add('espacio');
  
    form.appendChild(email)
    document.getElementById('root').appendChild(lista)
    insertAfter(email,pass)
    insertAfter(pas,btn)
}

const insertAfter=(current,next)=>{ 
    if(current.nextSibling){ 
        current.parentNode.insertBefore(next,current.nextSibling); 
    } else { 
        current.parentNode.appendChild(i); 
    }
}
