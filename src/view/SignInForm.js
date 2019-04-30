// form de inicio de sesión
import {loginGoogle}  from '../lib/index.js';

let SignInForm = {
    render : async () => {
        let view = `
            <section>
                <form>
                    <h3>Crianza Respetuosa</h3>
                    <input type="email" id="email2" placeholder="Escriba su email">
                    <input type="password" id="password2" placeholder="Escriba su contraseña">
                    <button id="btn-submit">Log in</button>
                    <button id="btn-google">Google</button>
                    <button id="btn-fb">Facebook</button>
                </form>
            </section>
            `;
        return view;
    },
    after_render :  async () => {
        document.getElementById('btn-google').addEventListener('click', loginGoogle);

    }
 }

export default SignInForm;



