import './style';
import render from './hello';
// import render from './counter';
// import render from './counter-redux';

// create element
let rootEl = document.createElement('div');
rootEl.setAttribute('class', 'container');
document.body.appendChild(rootEl);
// render
render(rootEl);
// clean
rootEl = null;