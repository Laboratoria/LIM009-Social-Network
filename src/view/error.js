export default () => {
    const divElemt = document.createElement('div');
     divElemt.innerHTML = `
            <h2>404</h2>
            <h1>Página no encontrada</h1>
            <p>El archivo especificado no se encontró en este sitio web. Por favor, compruebe la URL para errores y vuelva a intentarlo.</p>
          `;
 
    divElemt.setAttribute('id', 'message');
    return divElemt;
 };