
export const leaveSesion =()=>{

const string = `
    <p>Welcome </p>
    <button id="buttonLogOut">Cerrar sesión</button>
    `
    const div = document.createElement('div')
    div.innerHTML = string;
    content.appendChild(div);
}


export const withPhoto =()=>{
    const userPhoto = `<img src=${user.photoURL}>`;
    document.write('Hello' + user.displayName + userPhoto);
    console.log(user);
} 