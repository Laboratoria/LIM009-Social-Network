import { components } from '../view/index.js'
import { getDataOfUser, getUserActive, getPostsInRealtime, /* getUsersAfterLikes */ } from '../controller/controller1.js'

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
                    if (user) {
                        const uid = user.uid;
                        getDataOfUser(uid)
                            .then((dataUser) => {
                                getPostsInRealtime((arrPosts) => {
                                    root.innerHTML = '';
                                    root.appendChild(components.profile(dataUser, arrPosts))
                                })
                            }).catch((error) => {
                                console.log(error)
                            })
                    } else {
                        console.log("no hay usuario");
                    }


                }
                getUserActive(printUserInfo);
            }
            break;
        case '#/edit-profile':
            {
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