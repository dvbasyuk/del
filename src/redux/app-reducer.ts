import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { authMe} from "./auth-reducer";
import { AppStateType } from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


export type initialStateType = {
    initialized: boolean
};
let initialState = {
    initialized: false
};
const appReducer = (state: initialStateType = initialState, action: ActionsTypes):initialStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };

        default:
            return state;
    }
}

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
type ActionsTypes=initializedSuccessActionType

export const initializedSuccess = ():initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })


// type DispatchType = Dispatch<ActionsTypes>
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(authMe());
    promise.then(() => {
        dispatch(initializedSuccess());
    })
}

export default appReducer;