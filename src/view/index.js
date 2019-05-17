
import Login from './login.js';
import Register from '../view/register.js';
import Error404 from '../view/error.js';
import Profile from '../view/profile-user.js';
import Configuration from '../view/configuration.js'

const components = {
    login: Login,
    registro: Register,
    profile:Profile,
    configuration:Configuration,
    error:Error404
}

export { components }
