import {legacy_createStore as createStore} from 'redux';
import {RootReducer} from './Reducer';

const Store = createStore(RootReducer);

export {Store};
