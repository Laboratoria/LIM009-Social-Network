import { components } from '../view/index.js';

const changeview = (route) => {
  const root = document.getElementById("root");
  root.innerHTML = ' ';
  switch (route) {
  case '#/registro':
  { return root.appendChild(components.registro());}
  }
};

export { changeview }; 