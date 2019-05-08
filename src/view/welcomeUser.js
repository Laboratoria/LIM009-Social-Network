export default (user) => {
    const welcome = document.createElement('div');
    const templateWelcome = `
   <p>Nombre del usuario</p>
   <span>${user.name}</span>
   <p>E-mail</p>
   <span>${user.email}</span>
    `;
welcome.innerHTML = templateWelcome;
return welcome;
};








