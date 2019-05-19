export default (idPost) => {
  // const formComent = document.createElement('form');
  const templateComent = `
    <div class= 'flex-container  margin-top  center'>    
      <header class='header-post'>       
      <img id='photo-post-user' src='./image/icono-login-user.png' alt='feminismo' class='img-perfil-post'>                
      <label id='name-user-post' class=''>nommbre de usuario</label> 
      <label id='fecha-post' class='center color-fecha'>fecha</label>            
      </header>
      <section class='content-post'>      
      <textarea id = 'text-coment-post-${idPost}' class="textarea-coment center"></textarea>
      <button id = 'btn-coment-id-${idPost}' class='btn-post-create'>Comentar</button>      
      </section>
      </div>  
    
    `;
  // formComent.innerHTML = templateComent;
  return templateComent
}