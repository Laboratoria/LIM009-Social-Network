import Login from './login.js';
import Register from '../view/register.js';
import Error404 from '../view/error.js';
import Profile from '../view/profile-user.js';
import Configuration from '../view/configuration-profile.js'

const components = {
    login: Login,
    registro: Register,
    profile:Profile,
    config:Configuration,
    error:Error404
}

export { components }
