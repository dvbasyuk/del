import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, requestUsers } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { getCurrentPage, getFollowingInProgress, getIsFatching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selector';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
import { compose } from 'redux';

type MapStateToPropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    isFatching: boolean
}
type MapDispatchToPropsType = {
    onCangePage?: (pageNamber: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    requestUsers: (currentPageNumber: number, pageSize: number) => void
}
type OwnPropsType = {
    pageTitle: string
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType


class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onCangePage = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (<>
            {this.props.isFatching ? <Preloader /> : ''}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                onCangePage={this.onCangePage}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
            />
        </>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        currentPage: getCurrentPage(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        users: getUsers(state),
        followingInProgress: getFollowingInProgress(state),        
        isFatching: getIsFatching(state),
       
    }
}


{/* <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = DefaultRootState> */ }
export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
        mapStateToProps,
        { follow, unfollow, requestUsers })
)(UsersContainer);
