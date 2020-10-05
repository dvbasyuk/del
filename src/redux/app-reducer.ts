import { InferActionsTypes } from './redux-store';
import { authMe} from "./auth-reducer";

let initialState = {
    initialized: false
}
export type InitialStateType = typeof initialState
type ActionsType=InferActionsTypes<typeof a>

const appReducer = (state: InitialStateType = initialState, action: ActionsType):InitialStateType => {

    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            };

        default:
            return state;
    }
}
export const a ={
    initializedSuccess: () => ({ type: "INITIALIZED_SUCCESS" } as const)
}

export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(authMe());
    promise.then(() => {
        dispatch(a.initializedSuccess());
    })
}

export default appReducer;