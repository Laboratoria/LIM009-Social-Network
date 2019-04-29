const firstScreen=document.getElementById("first-screen"); // Elemento padre

const header=document.createElement("header");
const titulo=document.createElement("h1");

const sloganDiv=document.createElement("div");
const sloganTitle=document.createElement("h3");

const asideDiv=document.createElement("aside");
const imgOfAside=document.createElement("img");


firstScreen.appendChild(header);
firstScreen.appendChild(sloganDiv);
firstScreen.appendChild(asideDiv);


header.appendChild(titulo);
sloganDiv.appendChild(sloganTitle);
asideDiv.appendChild(imgOfAside);


titulo.setAttribute("class","titulo-first-screen")
titulo.innerHTML="Breath Health Breath Life";
sloganTitle.innerHTML="Respira Salud Respsira Vida";
imgOfAside.innerHTML= `<img src="css/img/day.jpg" alt="cargando imagen" class="img"></img>`;


/*const variable=document.getElementById("caja");
variable.addEventListener("")

const printRegisterForm =()=>{
   
   variable.innerHTML=`
        <div id="first-screen">
        <header class="header">
            <h1>
                < BreathLife>
            </h1>
        </header>
        <div>
            <h3> Respira salud, Respira vida </h3>
        </div>
        <aside class="left ancho">
            <img src="/css/img/day.jpg" alt="cargando imagen" class="img">
        </aside>
        <main class="right ancho">
    
            <form action="" class="formulario acceder">
                <input id="email2" class="input redondear" type="email" placeholder="Ingrese su correo">
                <input id="contrasena2" class="input redondear" type="password" placeholder="Ingrese su contraseña">
                <button type="submit" class="button-acceder redondear" onclick="acceder()">Acceder</button>
            </form>
        </main>
        <footer class="footer">
                <p>O bien ingresa con...
                </p>
                <div class="iconos">
                    <i class="fab fa-facebook-square"></i>
                    <i class="fab fa-google"></i>
                </div>
                <p>¿No tienes una cuenta? <span>Resgístrate</span></p>
            </footer>
    
    </div>`
};*/
