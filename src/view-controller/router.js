import { components } from '../view/index.js'
import { getDataOfUser, getUserActive } from '../controller/controller1.js'
import { getOnePostInRealtime } from "../services/firebase.js"

const changeview = (route) => {
    const root = document.getElementById("root");
    root.innerHTML = '';
    switch (route) {
        case '':
            root.appendChild(components.login());
            break;
        case '#/registro':
            root.appendChild(components.registro());
            break;
        case '#/user-profile':
            {
                const printUserInfo = (user) => {
                        if (user) { // si el  usuario existe
                            const uid = user.uid; // entonces obtenemos el id del usuario
                            getDataOfUser(uid) //  retorna una promesa ,en algun momento obtendremos el {} data del usuario
                                .then((dataUser) => { // cuando la promesa este resuelta(cuando obtengamos el {} dataUser del usuario)
                                    getOnePostInRealtime((arrPosts) => {
                                        root.innerHTML = '';
                                        root.appendChild(components.profile(dataUser, arrPosts)) // imprimeros el perfil del usuario
                                    })
                                })
                        } else {
                            console.log("no hay usuario");
                        }


                    } // printUserInfo es el callback
                getUserActive(printUserInfo); // funcion para aplicar el callback al usuario actual   
                // funcion para aplicar el callback al usuario actual ,despues de haber activado al observador (al momento de recargar) y verificar que existe un current user
                // funcion para desactivar el observador despues de haber activado al observador y haber identificado que no existe current user 
            }
            break;
        case '#/edit-profile':
                const printUserInfo = (user) => {
                    if (user) { // si el  usuario existe
                        const uid = user.uid; // entonces obtenemos el id del usuario
                        getDataOfUser(uid)  //  retorna una promesa ,en algun momento obtendremos el {} data del usuario
                            .then((data) => { // cuando la promesa este resuelta(cuando obtengamos el {} data del usuario)
                            root.appendChild(components.editProfiles());// imprimeros el perfil del usuario
                            })
                    } else {
                        console.log("no hay usuario");
                    }


                }                       // printUserInfo es el callback
                getUserActive(printUserInfo)
        default:
            { return root.appendChild(components.error()) }
    }
};

export { changeview };