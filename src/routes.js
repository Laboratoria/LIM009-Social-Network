
window.onload = () => {
  console.log('DOM has loaded');

  const myFirstRouter = (name) => {
    return {
      name: name,
      routes: [
        {
          path: '/',
          name: 'Root'
        },
        {
          path: '/about',
          name: 'About'
        },
        {
          path: '/contact',
          name: 'Contact'
        }
      ]
    }
  };

  const currentPath = window.location.pathname;
  console.log(currentPath);
}