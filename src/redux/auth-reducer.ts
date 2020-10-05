import { BaseThunkType, InferActionsTypes } from './redux-store';
import { ResultCodeForCaptcha } from './../api/api';
import { stopSubmit } from 'redux-form';
import { ResultCodeEnum } from "../api/api";
import { securityAPI } from "../api/securityAPI";
import { authAPI } from "../api/authAPI";

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchUrl: null as string | null
};

const authReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {
        case "SET_USER_DATA":
        case "GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
//Actions
const a = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: "SET_USER_DATA",
        payload: { id, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess: (captchUrl: string) => ({
        type: "GET_CAPTCHA_URL_SUCCESS",
        payload: { captchUrl }
    } as const)
}

//ThunkCreator
export const authMe = ():ThunkType => async (dispatch) => {
    let data = await authAPI.getAuth()
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(a.setAuthUserData(data.data.id, data.data.email, data.data.login, true))
    }

}
export const login = (login: string, password: string, rememberMe: boolean, captcha: string):ThunkType => async (dispatch) => {
    let data = await authAPI.login(login, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(authMe())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptcha())
        }
        let message = (data.messages.length > 0 ? data.messages[0] : "Some error")
        dispatch(stopSubmit("login", { _error: message }))
    }
}
export const getCaptcha = ():ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl()
    let captchaUrl = data.url
    dispatch(a.getCaptchaUrlSuccess(captchaUrl))
}
export const logout = ():ThunkType => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(a.setAuthUserData(null, null, null, false))
    }
}

export default authReducer

type initialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof a>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>