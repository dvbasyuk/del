import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

type MapDispatchPropsType = {
    logout: () => void
}
type MapStatePropsType = {
    login: string | null
    isAuth: boolean
}
type PropsType = MapStatePropsType & MapDispatchPropsType
class HeaderContainer extends React.Component<PropsType> {

    render() {
        return (
            <Header {...this.props} />
        )
    }

}
const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, { logout })(HeaderContainer);