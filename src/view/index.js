import Login from './login.js';
import Register from '../view/register.js';
import Error404 from '../view/error.js';
import Profile from '../view/profile-user.js';
import editProfile from '../view/edit-profile.js';

const components = {
    login: Login,
    registro: Register,
    profile:Profile,
    error:Error404,
    editProfiles:editProfile

}

export { components }
