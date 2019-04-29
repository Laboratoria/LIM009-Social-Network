const auth = ()=>{
    return {
        signInWithEmailAndPassword: (emailLogIn, passwordLogIn)=>{
return new Promise ((resolve)=>{
resolve('email ok')
}) }
    }
};
const firebase = {
    auth : auth
};
export default jest.fn(()=>{
    return firebase
})    