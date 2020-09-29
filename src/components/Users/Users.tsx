import React from 'react'
import { UserType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';


type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    onCangePage: (pageNamber: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const Users: React.FC<PropsType> = (props) => {

    return (
        <div>
            <Paginator currentPage={props.currentPage} totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} onCangePage={props.onCangePage} />
            {
                props.users.map(u => <User key={u.id} user={u}
                    followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow}
                    follow={props.follow} />)

            }
        </div>
    )
}


export default Users