import { combineReducers, createStore, applyMiddleware, compose, Action } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunk, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer
})
type ReducersType = typeof reducers // (globalState: AppStateType) => AppStatType
export type AppStateType = ReturnType<ReducersType>

// type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsTypes<T>= T extends {[key: string]: (...args: any[]) => infer U} ?  U : never

export type BaseThunkType<A extends Action, R = Promise<void>>=ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)
));


// let store = createStore(reducers, applyMiddleware(thunk));
// window.state = store
export default store;