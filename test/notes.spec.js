import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
    __collection__: {
        posts: {
            __doc__: {
                ABC4GH4f: {
                    content: 'Hola Soy Mayte Amo practicar yoga',
                    hours: "15:1",
                    likes: -1,
                    photoPost: 'https://firebasestorage.googleapis.com/v0/b/social-network-5a022.appspot.com/o/images%2Fensalada.jpeg?alt=media&token=7580a4f8-ab8b-4013-b9fb-e656e352e6a4',
                    state: false,
                    today: '22-5-2019',
                    userId: 'jJNRMEPvenfHWF7EepyFIrYFfD03',

                },
                EF3nm8kO: {
                    content: 'Hola Soy Liz Amo practicar natacion',
                    hours: "15:2",
                    likes: 1,
                    photoPost: 'https://firebasestorage.googleapis.com/v0/b/social-network-5a022.appspot.com/o/images%2Fensalada.jpeg?alt=media&token=7580a4f8-ab8b-4013-b9fb-e656e352e6a4',
                    state: true,
                    today: '21-5-2019',
                    userId: 'xLBNaDvO7Tuhp9cnWrc0 ',

                },
                OP8v45TS: {
                    content: 'Hola Soy Mayte Samaniego Amo practicar voleibol',
                    hours: "15:3",
                    likes: 2,
                    photoPost: 'https://firebasestorage.googleapis.com/v0/b/social-network-5a022.appspot.com/o/images%2Fensalada.jpeg?alt=media&token=7580a4f8-ab8b-4013-b9fb-e656e352e6a4',
                    state: false,
                    today: '20-5-2019',
                    userId: 'wksG1ocO25dUtEHQHZB6 ',
                },
            }
        }
    }
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import {
    promiseOfgetFirebase,
    promiseOfdeleteFirebase,

    promiseOfAddFirebase,
} from "../src/services/firebase.js";



describe('lista de notas', () => {
    it('Debería porder agregar una nota', (done) => {
        return promiseOfAddFirebase('posts', {
            content: 'Hola Soy Mayte Amo practicar yoga',
            hours: "15:1",
            likes: -1,
            photoPost: 'https://firebasestorage.googleapis.com/v0/b/social-network-5a022.appspot.com/o/images%2Fensalada.jpeg?alt=media&token=7580a4f8-ab8b-4013-b9fb-e656e352e6a4',
            state: false,
            today: '22-5-2019',
            userId: 'jJNRMEPvenfHWF7EepyFIrYFfD03',

        }).then((post) => promiseOfgetFirebase('posts', post.id).then((data) => {
            const result = data.data().content /* === 'Hola Soy Mayte Amo practicar yoga' */ ;
            expect(result).toEqual('Hola Soy Mayte Amo practicar yoga');
            done()
        }))
    })
    it('Debería porder agregar una nota', (done) => {
        return promiseOfgetFirebase('posts', 'ABC4GH4f')
            .then((post) => {
                const postId = post.id
                promiseOfdeleteFirebase('posts', postId).then((data) => {
                    expect(data).toEqual(undefined);
                    done()
                })
            })
    })
});