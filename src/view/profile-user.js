

    /* getImage().then(snapshot => snapshot.ref.getDownloadURL())
         .then((url) => {
             console.log(url);
             divElement.querySelector('#img-post').src = url;
         })
         .catch(console.error);*/

 
    /*     const likesButton = label.querySelector("#btn-likes");
        // const likesButton2 = label.querySelector("#btn-likes2");
        likesButton.addEventListener('click', () => {
            getUsersAfterLikes(post.id, (arr) => {
                arr.forEach((e) => {
                    if (e.hasOwnProperty(uidLikesUser) && e.uidLikesUser === current.userId) {
                        addClicksUsers(post.id, '')
                        post.likes = post.likes - 1
                    } else {
                        addClicksUsers(post.id, current.userId)
                        post.likes = post.likes + 1
                    }
                })
                likesForPosts(post.id, post.likes);
            })
        }) */
    /*     likesButton2.addEventListener('click', () => {
            if (user.userId === current.uid) {
                likesButton2.style.display = 'none';
                likesButton.style.display = 'block';
                likesForPosts(post.id, post.likes - 1, currentUser.uid);
            };
        }); */

    /*      const changeLikes=label.querySelector("#boxLike");
            const counterOfLikes=label.querySelector('#counter-likes');
            changeLikes.addEventListener('change',(e)=>{
                console.log(e);
                let likes =post.likes;
                e.target.setAttribute('value','true')
                likesForPosts(post.id, likes+1)
                counterOfLikes.innerHTML=likes+1;
            })  */
  