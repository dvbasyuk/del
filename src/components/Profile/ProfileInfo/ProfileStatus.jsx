import React from 'react';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    componentDidUpdate(prevProps, prevState) {
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
    onStatusChange = (e) => {

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