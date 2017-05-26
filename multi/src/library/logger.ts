const logger = store => next => action => {
  let result = next(action)
  if (REDUX_LOGGER) {
    console.log('dispatching', action)
    console.log('next state', store.getState())
  }
  return result;
}

export default logger;