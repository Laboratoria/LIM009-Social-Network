export default () => {
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "container-view-profile general");
  divElement.innerHTML = `
  <header class="header">
    <h1>
      < Breath Life>
    </h1>
</header>
<nav>
<ul>
  <li><a href=""></a>nose</li>
  <li><a href="">Cerrar sesión</a></li>
</ul>
</nav>
<aside class="user-name">
  <img src="" alt="" srcset="">
  <h2>Name</h2>
</aside>
<main class="post-zone">
  <div class="write-post box">
      <textarea name="" id="" cols="20" rows="10">¿Que quieres compartir?</textarea>
      <i class="fas fa-image"></i>
      <button class="share">Compartir</button>
  </div>
  <div class="comment-post box">
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <i class="fab fa-gratipay"></i>
      <i class="fas fa-paper-plane"></i>
  </div>
</main>
<footer></footer>`;
  return divElement;
};
