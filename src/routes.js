const changeRoute = (hash) => {
  console.log('DOM has loaded');
  console.log(hash);
};

export const initRoute = () => {
  window.addEventListener('hashchange', () => changeRoute(window.location.hash))
};

