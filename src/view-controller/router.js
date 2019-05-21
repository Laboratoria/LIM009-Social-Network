import { components } from '../view/index.js'
import { getDataOfUser, getUserActive,getPostsInRealtime, /* getUsersAfterLikes */ } from '../controller/controller1.js'

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
                                getPostsInRealtime((arrPosts) => {   
                                    root.innerHTML = '';
                                    root.appendChild(components.profile(dataUser, arrPosts)) // imprimeros el perfil del usuario
                                })
                            })
                            .catch((error)=>{
                                console.log(error)
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
        case '#/edit-profile': {
            const printUserInfo = (user) => {
                if (user) {
                    const uid = user.uid;
                    getDataOfUser(uid)
                        .then((dataUser) => {
                            root.appendChild(components.editProfile(dataUser));
                        })
                } else {
                    console.log("no hay usuario");
                }


            };
            getUserActive(printUserInfo);

        }
            break;
        default:
            root.appendChild(components.error())
    }
};

export { changeview };