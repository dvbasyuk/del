import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { PostType } from '../../../types/types';
import { maxLengthCreator, requiredField } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControl';
import s from './MyPosts.module.css';
import Post from './Post/Post';


const maxLength10 = maxLengthCreator(10)
type PropsType = {
    posts:  PostType[]
    addPostActionCreator: (newText:string)=>void
}
type MyPostFormValue={
    newPostText:string
}
const MyPosts:React.FC<PropsType> = React.memo((props) => {
    console.log("MyPost render");
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id} />);

    let onAddPost = (value: MyPostFormValue) => {
        props.addPostActionCreator(value.newPostText);
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

const MyPostForm:React.FC<InjectedFormProps<MyPostFormValue>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newPostText"} validate={[requiredField, maxLength10]} placeholder={"Enter your post"} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
const MyPostFormRedux = reduxForm<MyPostFormValue>({ form: 'myPostForm' })(MyPostForm)
export default MyPosts;