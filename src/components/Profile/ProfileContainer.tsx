import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatus, updateStatus, userInfo, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorisedUserId: number | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    userInfo:(userId:number)=>void
    getStatus:(userId:number)=>void
    updateStatus:()=>void
    savePhoto:()=>void
    saveProfile:()=>void
}
type OwnPropsType = {
   
}
// Type whatever you expect in 'this.props.match.params.*'
type PathParamsType = {
    id: any
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {

        let userId = this.props.match.params.id
        if (!userId) {
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
    componentDidUpdate(prevProps:PropsType) {

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
let mapStateToProps = (state:AppStateType) => ({
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