export default (idPost, user) => {
  const templateComent = `
    <div class= 'flex-container  margin-top  center'>    
      <header class='header-post'>       
        <img id='photo-post-user' src='${user.data().photo}' alt='foto del usuario' class='img-perfil-post'>                
        <label id='name-user-post' class=''>${user.data().name}</label> 
        <label id='fecha-post' class='center color-fecha'></label>            
      </header>
      <form id='form-description' class='content-post'>      
        <textarea id = 'text-coment-post-${idPost}' class="textarea-coment center"></textarea>
        <button id = 'btn-coment-id-${idPost}' class='btn-post-create'>Comentar</button>      
      </form>
    </div>  
    
    `;
  return templateComent;
}