import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from '../../types/types';

type PropsType = {
    isOwner: any
    profile: ProfileType | null
    status: string
    updateStatus: () => void
    saveProfile: (profile: ProfileType) => void
    savePhoto: () => void
}
const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                saveProfile={props.saveProfile} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;