import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { updateObjectArray } from "../utils/object-helpers";
import { AppStateType } from "./redux-store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS'
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const FOLLOWING_IN_PROGRESS = 'TOGGLFOLLOWING_IN_PROGRESS'


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    currentPage: 1,
    totalUsersCount: 0,
    isFatching: false,
    followingInProgress: [] as Array<number> //array of usersId
};
type InitialStateType = typeof initialState
const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, "id", { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, "id", { followed: false })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFatching: action.isFetching
            }
        case FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFatching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }

        default:
            return state;
    }
}

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetUsersTotalCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    totalCount: number
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    pageNumber: number
}
type SetToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type SetFollowingInProgressActionType = {
    type: typeof FOLLOWING_IN_PROGRESS
    isFatching: boolean
    userId: number
}
type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | setUsersActionType | SetUsersTotalCountActionType | SetCurrentPageActionType | SetToggleIsFetchingActionType | SetFollowingInProgressActionType
//ActionCreators
export const followSuccess = (user: number): FollowSuccessActionType => ({ type: FOLLOW, userId: user })
export const unfollowSuccess = (user: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId: user })
export const setUsers = (users: Array<UserType>): setUsersActionType => ({ type: SET_USERS, users })
export const setUsersTotalCount = (totalCount: number): SetUsersTotalCountActionType => ({ type: SET_USERS_TOTAL_COUNT, totalCount })
export const setCurrentPage = (pageNumber: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, pageNumber })
export const setToggleIsFetching = (isFetching: boolean): SetToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const setFollowingInProgress = (isFatching: boolean, userId: number): SetFollowingInProgressActionType => ({ type: FOLLOWING_IN_PROGRESS, isFatching, userId })

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>,AppStateType,unknown,ActionsTypes>
type FunctionACType = (userId:number)=>FollowSuccessActionType| UnfollowSuccessActionType
//ThunkCreators
export const requestUsers = (page: number, pageSize: number) => async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(setToggleIsFetching(true))
    dispatch(setCurrentPage(page))

    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(setToggleIsFetching(false))
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));

}
export const follow = (userId: number): ThunkType => async (dispatch: DispatchType) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), followSuccess)
}
export const unfollow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch: DispatchType) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), unfollowSuccess)
}

//function
const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator:FunctionACType) => {

    dispatch(setFollowingInProgress(true, userId))
    let resultCode = await apiMethod(userId)
    if (resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(setFollowingInProgress(false, userId))
}

export default usersReducer;