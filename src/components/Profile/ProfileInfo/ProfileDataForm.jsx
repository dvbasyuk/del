import React from 'react';
import s from './ProfileInfo.module.css';
import style from '../../common/FormsControls/FormsControl.module.css'
import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControl';


const ProfileDataForm = ({ handleSubmit, profile, error }) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
                {error && <div className={style.forSummaryError}>
                    {error}
                </div>}
            </div>
            <div>
                <b>Full name</b>: {createField("Name", Input, "fullName", [])}
            </div>
            <div>
                <b>Looking for a job</b>: {createField("", Input, "lookingForAJob", [], { type: "checkbox" })}
            </div>
            <div>
                <b>My profassional skills</b>: {createField("My profassional skills", Textarea, "LookingForAJobDescription", [])}
            </div>
            <div>
                <b>About me</b>: {createField("About me", Textarea, "aboutMe", [])}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={s.contacts}>
                        {createField(key, Input, "contacts." + key, [])}
                    </div>
                })}
            </div>

        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({ form: 'editProfile' })(ProfileDataForm)
export default ProfileDataFormReduxForm;