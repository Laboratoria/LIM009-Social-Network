export const dataBaseUser = user => {
    const users = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
    };
    return firebase
        .database()
        .ref(`telmex/${user.uid}`)
        .set(users);
};