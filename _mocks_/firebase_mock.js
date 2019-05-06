// const firestore = () => {
//     return {
//       collection: (nameCollection) => {
//         return {
//           add: (objData) => {
//             return new Promise((resolve) => {
//               resolve('el post fue agregado');
//             });
//           }
//         };
//       }
//     };
//   };
  
//   const firebase = {
//     firestore: firestore,
//   };
  
//   export default jest.fn(() => {
//     return firebase;
//   });


const auth = () => {
    return {
        signInWithEmailAndPassword: (email, password) => {
           return new Promise((resolve) => {
              resolve({email : email,
                      password : password                 
              });
            });
        }
    };
};
  
  const firebase = {
    auth: auth,
  };
  
  export default jest.fn(() => {
    return firebase;
  });