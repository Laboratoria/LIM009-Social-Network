
const auth = () => {
    return {
        signInWithEmailAndPassword: (email, password) => {
            return new Promise((resolve) => {
                resolve(console.log(email),console.log(password))
                reject('hubo un error')
                })
            })
        }
    }
};

const firebase = {
    auth: auth,
    // initializeApp() {}
};
export default jest.fn(() => {
    firebase
}) 