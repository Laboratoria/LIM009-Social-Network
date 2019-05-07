
export const navBar = () => {
    const header = document.createElement('header');
    const templateHeader = `<header>
    <p>Name</p>
    <button>Cerrar sesión</button>
    </header>`

    header.innerHTML = templateHeader;
    return header;
}

