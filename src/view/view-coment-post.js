export default (post) => {
    const viewFormComent = document.createElement('form');

    const templateComent = `
      <div class= 'flex-container  margin-top  center'>    
        <header class='header-post'>       
        <img id='photo-post-user' src='./image/icono-login-user.png' alt='feminismo' class='img-perfil-post'>                
        <label id='name-user-post' class=''>${post.user}</label> 
        <label id='fecha-post' class='center color-fecha'>fecha</label>            
        </header>
        <section class='content-post'>      
        <textarea id = 'description' class="textarea-coment center">${post.comment}</textarea>           
        </section>
        <footer class = 'margin-footer center'>
        <div class = 'style-color-header style-content-post-img'>
        <button id ='btn-like' class='btn-post-create'>Like</button>
        <button id ='btn-love' class='btn-post-create'>Me encanta</button>           
        </footer>   
        </div>  
      
      `;
    viewFormComent.innerHTML = templateComent;
    return viewFormComent
}