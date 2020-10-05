import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/usersAPI";
import { UserType } from "../types/types";
import { updateObjectArray } from "../utils/object-helpers";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    currentPage: 1,
    totalUsersCount: 0,
    isFatching: false,
    followingInProgress: [] as Array<number> //array of usersId
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, "id", { followed: true })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectArray(state.users, action.userId, "id", { followed: false })
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SET_USERS_TOTAL_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFatching: action.isFetching
            }
        case 'FOLLOWING_IN_PROGRESS':
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
//Actions
export const a = {
    followSuccess: (user: number) => ({ type: 'FOLLOW', userId: user } as const),
    unfollowSuccess: (user: number) => ({ type: 'UNFOLLOW', userId: user } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setUsersTotalCount: (totalCount: number) => ({ type: 'SET_USERS_TOTAL_COUNT', totalCount } as const),
    setCurrentPage: (pageNumber: number) => ({ type: 'SET_CURRENT_PAGE', pageNumber } as const),
    setToggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    setFollowingInProgress: (isFatching: boolean, userId: number) => ({ type: 'FOLLOWING_IN_PROGRESS', isFatching, userId } as const)
}
//ThunkCreators
export const requestUsers = (page: number, pageSize: number) => async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(a.setToggleIsFetching(true))
    dispatch(a.setCurrentPage(page))
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(a.setToggleIsFetching(false))
    dispatch(a.setUsers(data.items));
    dispatch(a.setUsersTotalCount(data.totalCount));
}
export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), a.followSuccess)
}
export const unfollow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), a.unfollowSuccess)
}

//function
const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: FunctionACType) => {
    dispatch(a.setFollowingInProgress(true, userId))
    let resultCode = await apiMethod(userId)
    if (resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(a.setFollowingInProgress(false, userId))
}

export default usersReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes< typeof a>
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>
type FunctionACType = (userId: number) => ReturnType<typeof a.followSuccess> | ReturnType<typeof a.unfollowSuccess>
