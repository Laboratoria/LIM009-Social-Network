import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
    __collection__: {
        posts: {
            __doc__: {
                ABC4GH4f: {
                    content: 'Hola, soy Mayte Souza  y amo practicar yoga',
                    hours: "15:1",
                    likes: -1,
                    photoPost: 'https://firebasestorage.googleapis.com/v0/b/social-network-5a022.appspot.com/o/images%2Fensalada.jpeg?alt=media&token=7580a4f8-ab8b-4013-b9fb-e656e352e6a4',
                    state: false,
                    today: '22-5-2019',
                    userId: 'jJNRMEPvenfHWF7EepyFIrYFfD03',

                },
                EF3nm8kO: {
                    content: 'Hola, soy Liz Escobar y amo practicar natacion',
                    hours: "15:2",
                    likes: 1,
                    photoPost: 'https://firebasestorage.googleapis.com/v0/b/social-network-5a022.appspot.com/o/images%2Fensalada.jpeg?alt=media&token=7580a4f8-ab8b-4013-b9fb-e656e352e6a4',
                    state: true,
                    today: '21-5-2019',
                    userId: 'xLBNaDvO7Tuhp9cnWrc0 ',

                },
                OP8v45TS: {
                    content: 'Hola, soy Mayte Samaniego y amo practicar voleibol',
                    hours: "15:3",
                    likes: 2,
                    photoPost: 'https://firebasestorage.googleapis.com/v0/b/social-network-5a022.appspot.com/o/images%2Fensalada.jpeg?alt=media&token=7580a4f8-ab8b-4013-b9fb-e656e352e6a4',
                    state: false,
                    today: '20-5-2019',
                    userId: 'wksG1ocO25dUtEHQHZB6 ',
                },
            }
        },
        users: {
            __doc__: {
                AO68SwmRrYPO6qjaCorCGgWFaSX2: {
                    email: 'maytezhou14@gmail.com',
                    name: "Mayte Zhou",
                    photo: "https://lh5.googleusercontent.com/-YP5U6_hihMY/AAAAAAAAAAI/AAAAAAAAAK8/6kckjTKHUJc/photo.jpg",
                    userId: 'AO68SwmRrYPO6qjaCorCGgWFaSX2',

                },
                AeC4tzlg9tNq4kcugc1u7y7ThIz2: {
                    email: 'liz@gmail.com',
                    name: "Liz Escobar",
                    photo: "https://lh6.googleusercontent.com/-LkJ8uR2PVvI/AAAAAAAAAAI/AAAAAAAAJxU/f6kiRxpusts/photo.jpg",
                    userId: 'AeC4tzlg9tNq4kcugc1u7y7ThIz2',

                },
                E5NDXeIZrZbOCfMKyPJPmOJ5BQG2: {
                    email: 'ana@gmail.com',
                    name: "Ana Souza",
                    photo: "https://diariojudio.com/files/2018/03/Gal-Gadot.jpg",
                    userId: 'E5NDXeIZrZbOCfMKyPJPmOJ5BQG2',


                },
            }

        }

    }
};



global.firebase = new MockFirebase(fixtureData, {
    isNaiveSnapshotListenerEnabled: true
});



import {
    promiseOfgetFirebase,
    promiseOfdeleteFirebase,
    promiseOfUpdateFirebase,
    promiseOfAddFirebase,
    promiseOnSnapshotFirebase,
    promiseOfSetFirebase,
    signUp
} from "../src/services/firebase.js";



describe('lista de notas', () => {
    it('Debería poder agregar una publicación', (done) => {
        return promiseOfAddFirebase('posts', {
            content: 'Hola, soy Ana Cecilia Quispe y amo practicar salto alto',
            hours: "15:5",
            likes: 1,
            photoPost: 'https://firebasestorage.googleapis.com/v0/b/social-network-5a022.appspot.com/o/images%2Fagua.jpg?alt=media&token=d107a41f-2a53-4663-a072-e03bb7ff1613',
            state: false,
            today: '19-5-2019',
            userId: 'E8ujt2VOvSFh6gaR7fv6 ',

        }).then((post) => promiseOfgetFirebase('posts', post.id).then((data) => {
            const result = data.data().content;
            expect(result).toEqual('Hola, soy Ana Cecilia Quispe y amo practicar salto alto');
            done()
        }))
    })
    it('Debería poder eliminar una publicación ', ( /* done */ ) => {
        return promiseOfgetFirebase('posts', 'ABC4GH4f').then((post1) => {
            return promiseOfdeleteFirebase('posts', post1.id).then((resolved) => {
                expect(resolved).toEqual(undefined);
            })

        })


    })
    it('Debería poder actualizar una publicación', () => {
        return promiseOfgetFirebase('posts', 'OP8v45TS')
            .then((post) => {
                //console.log(post);
                const postId = post.id
                return promiseOfUpdateFirebase('posts', postId, {
                        content: "Soy Lulu Zhou y me encanta la ensalada de frutas",
                    })
                    .then(() => {
                        return promiseOfgetFirebase('posts', 'OP8v45TS')
                            .then((postUpdated) => {
                                //console.log(postUpdated);
                                expect(postUpdated.data().content).toEqual("Soy Lulu Zhou y me encanta la ensalada de frutas");
                            })
                    })

            })
    })
    it('Debería poder obtener todas las publicaciones en tiempo real', (done) => {
        return promiseOnSnapshotFirebase('posts', (arrOfAllPosts) => {
            let arrOfPosts = [];
            arrOfAllPosts._data.forEach((docSnapshot) => {
                arrOfPosts.push(docSnapshot);
            })
            expect(arrOfPosts.length).toBe(3);
            done();
        })
    })
});

describe('lista de usuarios', () => {
    it('Debería agregar un usuario', (done) => {
        return promiseOfSetFirebase('users', 'E5NDXeIZrZbOCfMKyPJPmOJ5BQG2', {
            email: 'shawn@gmail.com',
            name: "Shawn Zhou",
            photo: "https://www.rollingstone.com/wp-content/uploads/2019/03/shutterstock_10101008ss.jpg",
            userId: 'E5NDXeIZrZbOCfMKyPJPmOJ5BQG2'
        }).then(() => {
            promiseOfgetFirebase('users', 'E5NDXeIZrZbOCfMKyPJPmOJ5BQG2')
                .then((doc) => {
                    console.log(doc.data());
                    const result = doc.data().name;
                    expect(result).toEqual('Shawn Zhou');
                    done();
                })
        })
    });
})