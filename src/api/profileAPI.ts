import { PhotosType } from './../types/types';
import { ProfileType } from '../types/types';
import { instance, ResponseType } from './api';

type SavePhotoResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    getUserInfo(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status/`, { status: status })
            .then(response => response.data);
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("Image", photoFile);
        return instance.put<ResponseType<SavePhotoResponseType>>(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data);
    },
    saveProfile(file: ProfileType) {
        return instance.put<ResponseType>(`profile/`, file)
            .then(response => response.data);
    }
};
