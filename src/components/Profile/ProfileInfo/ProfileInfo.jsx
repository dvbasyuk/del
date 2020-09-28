import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHook from './ProfileStatusWithHook';
import userPhoto from '../../../imges/photo.jpg'
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader />
    }
    const mainPhotoSelectedOn = (e) => {
        if (e.target.files.length)
            props.savePhoto(e.target.files[0])
    }
    const onSubmit = (formData) => {
        // setEditMode(false)
        props.saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }
    return (
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.small || userPhoto} className={s.mainPhoto} />
            {props.isOwner &&
                <input type={"file"} onChange={mainPhotoSelectedOn} />}
            <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus} />
            <div className={s.separator}>
                {editMode
                    ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile} />
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => { setEditMode(true) }} />}

            </div>

        </div>

    )
}


const ProfileData = (props) => {
    return (
        <div>
            {props.isOwner &&
                <div>
                    <button onClick={props.goToEditMode}>Edit</button>
                </div>}
            <div>
                <b>Full name</b>: {props.profile.fullName}
            </div>
            <div>
                <b>Looking for  a job</b>: {props.profile.lookingForAJob ? "yes" : "no"}
            </div>
            {props.profile.lookingForAJob &&
                <div>
                    <b>My profassional skills</b>: {props.profile.lookingForAJobDescription}
                </div>}
            <div>
                <b>About me</b>: {props.profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
                })}
            </div>

        </div>
    )
}
const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={s.contacts}>
            <b>{contactTitle}</b>: {contactValue}
        </div>)
}


export default ProfileInfo;