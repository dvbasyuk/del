import React from 'react';
import s from './Post.module.css';

type PropsType={
  message:string
  likesCount: number
}
const Post:React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src='https://i.etsystatic.com/7725562/r/il/9ba942/1809002353/il_fullxfull.1809002353_9ecu.jpg' />
        { props.message }
          <div>
        <span>like</span> { props.likesCount }
      </div>
    </div>
  )
}

export default Post;