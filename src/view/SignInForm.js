// form de inicio de sesión
let SignInForm = {

    signInForm() {

        const form = document.createElement('form');
    // input email
        const email = document.createElement('input');
        email.type='email';
        // email.classList.add('espacio');
        email.placeholder ='Email';
    // input password 
        const password = document.createElement('input');
        password.type ='password';
        // password.classList.add('espacio');
        password.placeholder = 'Password'
    
    // boton para iniciar sesion
        const btnLogin  = document.createElement('button');
        btnLogin.innerHTML ='Log in';
        // btnLogin.classList.add('espacio');

    // Boton para iniciar sesión con Google
        const btnGoogle  = document.createElement('button');
        btnGoogle.id = 'btn-google';
        btnGoogle.innerHTML ='Google';
    
        form.appendChild(email)
        document.getElementById('root').appendChild(form)
        this.insertAfter(email,password)
        this.insertAfter(password,btnLogin)
        this.insertAfter(btnLogin,btnGoogle)
    },

    insertAfter(current,next) { 
        if(current.nextSibling){ 
            current.parentNode.insertBefore(next,current.nextSibling); 
        } else { 
            current.parentNode.appendChild(next); 
        }
    }
}


export default SignInForm;

