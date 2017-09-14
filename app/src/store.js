import { createStore } from 'redux';
import user_reducer from './components/ducks/user-reducer';

export default createStore(user_reducer);