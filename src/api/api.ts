import axios from 'axios';
import { UserType } from '../types/types';

export enum ResultCodeEnum{
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha{
    CaptchaIsRequired = 10
}

//Generic type
export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    Error: string | null
}
export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "9cc2d60a-aa04-4bfb-8ef9-14dfe08c3a3b"
    }
})


