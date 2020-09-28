import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControl';
import s from './MyPosts.module.css';
import Post from './Post/Post';


const maxLength10 = maxLengthCreator(10)

const MyPosts = React.memo((props) => {
    console.log("MyPost render");
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>);

    let onAddPost = (value) => {
        props.addPost(value.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <MyPostFormRedux onSubmit={onAddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const MyPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newPostText"} validate={[requiredField, maxLength10]} placeholder={"Enter your post"}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
const MyPostFormRedux = reduxForm({ form: 'myPostForm' })(MyPostForm)
export default MyPosts;