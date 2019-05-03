import { components } from '../view/index.js'

const changeview = (route) => {
    const root = document.getElementById("root");
    root.innerHTML = '';
    switch (route) {
        case '#/login':
            { return components.login() };
        case '#/registro':
            { return root.appendChild(components.registro()) };
        default:
            {return root.appendChild(components.error())}
    }
};

export { changeview }; 