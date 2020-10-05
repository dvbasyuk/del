import { BaseThunkType, InferActionsTypes } from './redux-store';
import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/profileAPI";
import { PhotosType, PostType, ProfileType } from "../types/types";

let initialState = {
    posts: [
        { id: 1, message: 'Hi!!', likesCount: 21 },
        { id: 2, message: 'How are you?', likesCount: 37 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ""
};


const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'ADD_POST':
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                // newPostText: ''
            };
        case 'SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: { ...state.profile, photos: action.file } as ProfileType
            }
        default:
            return state;
    }
}
//Actions
export const a = {
    addPostActionCreator: (newPostText: string) => ({ type: 'ADD_POST', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    savePhotoSuccess: (file: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', file } as const)
}

//Thunck-Creators
export const userInfo = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserInfo(userId)
    dispatch(a.setUserProfile(data));
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(a.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0)
        dispatch(a.setStatus(status));
}

export const savePhoto = (file: PhotosType): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0)
        dispatch(a.savePhotoSuccess(data.data.photos));
}

export const saveProfile = (file: ProfileType): ThunkType => async (dispatch, getState) => {
    let userId = getState().auth.id;
    let data = await profileAPI.saveProfile(file)
    if (data.resultCode === 0) {
        if (userId)
            dispatch(userInfo(userId));
        else throw new Error("userId can't by null")
    } else {
        //dispatch(stopSubmit("editProfile", { "contacts": {"facebook": response.data.messages[0]} }))
        dispatch(stopSubmit("editProfile", { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer


type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof a>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>