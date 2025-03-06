import { persistStore } from 'redux-persist';
import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import persistedReducer from './modules/reduxPersist';

import root_reducer from './modules/root_reducer';
import root_saga from './modules/root_saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    persistedReducer(root_reducer),
    applyMiddleware(sagaMiddleware)); 

sagaMiddleware.run(root_saga);

export const persistor = persistStore(store);
export default store;

