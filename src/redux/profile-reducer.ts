import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'
// const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS'

let initialState = {
    posts: [
        { id: 1, message: 'Hi!!', likesCount: 21 },
        { id: 2, message: 'How are you?', likesCount: 37 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ""
};
export type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
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
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.file } as ProfileType
            }
        default:
            return state;
    }
}

type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    file: PhotosType
}
export const addPostActionCreator = (newPostText:string):AddPostActionType => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile:ProfileType):SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status:string):SetStatusActionType => ({ type: SET_STATUS, status })
export const savePhotoSuccess = (file:PhotosType):SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, file })
// export const saveProfileSuccess = (file) => ({ type: SAVE_PROFILE_SUCCESS, file })

//Thunck-Creators
export const userInfo = (userId:number) => async (dispatch:any) => {
    let data = await usersAPI.getUserInfo(userId)
    dispatch(setUserProfile(data));
}
export const getStatus = (userId:number) => async (dispatch:any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status:string) => async (dispatch:any) => {
    let response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0)
        dispatch(setStatus(status));
}

export const savePhoto = (file:PhotosType) => async (dispatch:any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0)
        dispatch(savePhotoSuccess(response.data.data.photos));
}

export const saveProfile = (file:ProfileType) => async (dispatch:any, getState:any) => {
    let userId = getState().auth.id;
    let response = await profileAPI.saveProfile(file)
    if (response.data.resultCode === 0) {
        dispatch(userInfo(userId));
    } else {
        //dispatch(stopSubmit("editProfile", { "contacts": {"facebook": response.data.messages[0]} }))
        dispatch(stopSubmit("editProfile", { _error: response.data.messages[0] }))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;