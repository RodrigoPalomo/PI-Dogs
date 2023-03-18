import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducer/index";


// store global
const store= createStore(
    reducer,
    // translador
    composeEnhancer(applyMiddleware(thunkMiddleware)) 
);

export default store;