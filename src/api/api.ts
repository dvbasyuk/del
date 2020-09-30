import axios from 'axios';
import { AnyRecord } from 'dns';
import { ProfileType } from '../types/types';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "9cc2d60a-aa04-4bfb-8ef9-14dfe08c3a3b"
    }
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/` + userId)
            .then(response => response.data.resultCode)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/` + userId)
            .then(response => response.data.resultCode)
    },
    getUserInfo(userId: number) {
        return profileAPI.getUserInfo(userId)
    }
}
export const profileAPI = {
    getUserInfo(userId: number) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, { status: status })
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append("Image", photoFile);

        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(file: ProfileType) {
        return instance.put(`profile/`, file)
    }
}
type GetAuthType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
}
export enum ResultCodeEnum{
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha{
    CaptchaIsRequired = 10
}
export const authAPI = {
    getAuth() {
        return instance.get<GetAuthType>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
            .then(response => response.data)
    }
}