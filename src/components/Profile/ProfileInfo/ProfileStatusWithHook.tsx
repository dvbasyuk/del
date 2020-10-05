import React, { useEffect, useState } from 'react';

type PropsType={
    status:string
    updateStatus:(status:string)=>void
}
const ProfileStatusWithHook:React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const diActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{status || "----"}</span>
                </div>}
            { editMode &&
                <div>
                    <input value={status}
                        onBlur={diActivateEditMode}
                        autoFocus={true}
                        onChange={onStatusChange} ></input>
                </div>}
        </div>
    )
}

export default ProfileStatusWithHook;