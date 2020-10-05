import { instance, GetItemsType, ResponseType } from './api';

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/` + userId)
            .then(response => response.data.resultCode);
    },
    unfollow(userId: number) {
        return instance.delete(`follow/` + userId) 
            .then(response => response.data.resultCode)as Promise<ResponseType>;
    }
};
