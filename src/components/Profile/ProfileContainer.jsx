import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatus, updateStatus, userInfo, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    refreshProfile() {

        let userId = this.props.match.params.id
        if (!userId) { //если нет id то это мой профиль
            // userId = 11409
            userId = this.props.authorisedUserId
            
            if (!userId) {
                this.props.history.push("/login")
                return
            }
        }
        this.props.userInfo(userId)
        this.props.getStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if ((this.props.match.params.id != prevProps.match.params.id) || (this.props.authorisedUserId != prevProps.authorisedUserId))
            this.refreshProfile()
    }
    render() {
        return (
            <Profile {...this.props} isOwner={!this.props.match.params.id} 
            status={this.props.status} 
            updateStatus={this.props.updateStatus} 
            savePhoto={this.props.savePhoto} 
            saveProfile={this.props.saveProfile}/>
        )
    }

}
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorisedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, { userInfo, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter
    // withAuthRedirect
)(ProfileContainer)

// export default connect(mapStateToProps, { userInfo })(WithRouterProfile);