import React, { ChangeEvent } from 'react';

type PropsType = {
    status: string
    updateStatus:(status: string)=> void
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    componentDidUpdate(prevProps: PropsType, prevState:StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
        console.log("componentDidUpdate");
    }

    activateEditMode = () => {
        // this.state.editMode = true
        // this.forceUpdate();  
        this.setState({ editMode: true })
    }
    diActivateEditMode = () => {

        this.setState({ editMode: false })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })

    }
    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "----"}</span>
                    </div>}

                { this.state.editMode &&
                    <div>
                        <input value={this.state.status}
                            onBlur={this.diActivateEditMode}
                            autoFocus={true}
                            onChange={this.onStatusChange}></input>
                    </div>}
            </div>
        )
    }
}

export default ProfileStatus;