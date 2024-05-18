import React from 'react'
import styles from './PostDetailPage.module.scss';
import Detail from './components/Detail';
import Comment from './components/Comment';

const PostDetailPage = () => {
  return (
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
      <div className={styles.detail__container}>
        <Detail />
        <Comment />
      </div>
    </div>
  )
}

export default PostDetailPage
