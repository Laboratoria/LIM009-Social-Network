import { getUrlImageFromStorage } from "../src/services/firebase.js"
const storageMock = {
    storage: () => ({
        ref: () => ({
            child: (file) => ({
                put: (images) => ({
                    snapshot: {
                        ref: {
                            getDownloadURL: () => {
                                return new Promise((resolve) => {
                                    resolve(`https://storage.firebaseapp.com/${file}`);
                                });
                            }
                        
                        },

                    },
                    on: (changeEvent, progress, error, callback) => {
                        callback()
                        error
                    }, 
                })
            })
        })
    })

};
global.firebase = storageMock;


describe('agregar imagen', () => {
    it('Debería agregar una imagen al storage', (done) => {
        const file = new File([], 'hola.jpg');
        getUrlImageFromStorage(file, (url) => {
            expect(url).toBe('https://storage.firebaseapp.com/images/hola.jpg')
            done()
        })

    })
})