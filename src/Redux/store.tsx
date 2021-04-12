import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import questionState, { restoreStorageQuestionDuck } from './QuestionsDuck'

let rootReducer = combineReducers({
  questionState,
})
export type RootState = ReturnType<typeof rootReducer>

export default function generateStore() {
  let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  console.log('iniciando REDUX') // Esto ocurre cuando inicia Redux
  restoreStorageQuestionDuck()(store.dispatch)
  // restoreStorageActionTempValues()(store.dispatch)
  return store
}
