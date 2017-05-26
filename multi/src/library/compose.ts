import { compose } from 'redux';

let result = compose;
if (REDUX_DEBUG) {
  result = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];
}

export default result;