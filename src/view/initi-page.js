
export default () => {
    const mainView = document.createElement('main')
    const templateWelcome = `
    <h1>Biencenida a HIPARQUIA<h1>
    
    `;
    mainView.innerHTML = templateWelcome;

    return mainView
}