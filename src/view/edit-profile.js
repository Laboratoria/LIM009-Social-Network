
export default (user) => {
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "container");
  divElement.innerHTML = ` 
    <header class="header">
    <ul class="menu">
        <li class="small"><input type="checkbox" name="list" id="nivel1-1"><label for="nivel1-1">${user.name}</label>
            <ul class="interior">
                <li><a href="#/configuration">Configurar cuenta</a></li>
                <li><a>Editar Perfil</a></li>
                <li><a id="sign-out-list" class="sign-out-list">Cerrar sesión</a></li>
            </ul>
        </li>
        <li class="title"><h1>Breath Life</h1></li>
        <li id="sign-out" class="small sign-out"><a>Cerrar sesión</a></li>
    </ul>
</header>
<div class="sub-container">
<aside class="user-name">
</aside>
<main class="post-zone">
</main>
</div>`;

  return divElement;
};
