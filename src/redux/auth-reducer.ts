import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'react/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'react/auth/GET_CAPTCHA_URL_SUCCESS';

// type initialStateType2 = {
//     id: number | null,
//     login: string | null,
//     email: string | null,
//     isAuth: boolean,
//     captchUrl: string | null
// };

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchUrl: null as string | null
};
type initialStateType = typeof initialState

const authReducer = (state: initialStateType = initialState, action: any): initialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
                vega: 12
            };
        default:
            return state;
    }
}
type SetAuthUserDataActionPayloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth }
})
export const getCaptchaUrlSuccess = (captchUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchUrl}
})

export const authMe = () => async (dispatch: any) => {
    let data = await authAPI.getAuth()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(data.data.id, data.data.email, data.data.login, true))
    }

}
export const login = (login: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data = await authAPI.login(login, password, rememberMe, captcha)
    if (data.resultCode === 0) {
        dispatch(authMe())
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptcha())

        }
        let message = (data.messages.length > 0 ? data.messages[0] : "Some error")
        dispatch(stopSubmit("login", { _error: message }))
    }
}
export const getCaptcha = () => async (dispatch: any) => {
    let data = await securityAPI.getCaptchaUrl()
    let captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
export const logout = () => async (dispatch: any) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;