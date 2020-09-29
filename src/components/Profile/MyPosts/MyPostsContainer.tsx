import React from 'react';
import { addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { PostType } from '../../../types/types';

type MapStatePropsType={
    posts: PostType[]
}
// type MapDispatchPropsType={
//     addPostActionCreator: (newText:string)=>void
// }
const mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        posts: state.profilePage.posts
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addPost: (newPostText) => {
//             dispatch(addPostActionCreator(newPostText));
//         }
//     }
// }

const MyPostsContainer = connect(mapStateToProps, {addPostActionCreator})(MyPosts)

export default MyPostsContainer;