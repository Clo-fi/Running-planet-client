import React from 'react'
import SearchForm from '../../../../../components/common/SearchForm'

import styles from './PostList.module.scss';

const dummyPosts = [{
  "title": "우혁님 착해요..!",
  "author": "이민규",
  "writtenDate": "20240511",
  "commentCnt": 9,
  "likeCnt": 0
},
{
  "title": "깅용빈 인증",
  "author": "깅용빈",
  "writtenDate": "20240510",
  "commentCnt": 5,
  "likeCnt": 3
},
{
  "title": "한우혁 인증",
  "author": "한우혁",
  "writtenDate": "20240509",
  "commentCnt": 1,
  "likeCnt": 0
},
{
  "title": "오늘 밥먹었어요",
  "author": "한우혁",
  "writtenDate": "20240508",
  "commentCnt": 51,
  "likeCnt": 63
},
{
  "title": "우혁님 착해요..!",
  "author": "이민규",
  "writtenDate": "20240507",
  "commentCnt": 9,
  "likeCnt": 0
},
{
  "title": "깅용빈 인증",
  "author": "깅용빈",
  "writtenDate": "20240506",
  "commentCnt": 5,
  "likeCnt": 3
},
{
  "title": "한우혁 인증",
  "author": "한우혁",
  "writtenDate": "20240505",
  "commentCnt": 1,
  "likeCnt": 0
},
{
  "title": "오늘 밥먹었어요",
  "author": "한우혁",
  "writtenDate": "20240508",
  "commentCnt": 51,
  "likeCnt": 63
}
]

const PostList = ({ isOpened }: { isOpened: boolean }) => {
  const formatDate = (dateString: string) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}.${month}.${day}`;
  };

  return (
    <>
      {isOpened ? <p className={styles.list__comment}>현재 우리 크루는?</p> : null}
      <SearchForm img={'Filter'} />
      <div className={styles.list__announcement}>
        <img src="/src/assets/icons/Bell_pin.png" alt="bellImg" />
        <p>공지사항</p>
      </div>
      <div className={styles.list__post_container}>
        {dummyPosts.map((post, index) => (
          <div className={styles.list__post} key={index}>
            <img className={styles.list__post_img} src="imgLink" alt="postImg" />
            <div className={styles.list__post_details}>
              <p>{post.title} <span>{formatDate(post.writtenDate)}</span></p>
              <div className={styles.list__post_reaction}>
                <span>{post.author}</span>
                <div className={styles.list__reaction}>
                  <div>
                    <img src="/src/assets/icons/Favorite.png" alt="" />
                    <span>{post.likeCnt}</span>
                  </div>
                  <div>
                    <img src="/src/assets/icons/Bookmark.png" alt="" />
                    <span>{post.commentCnt}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <p>여기에다가 게시판 페이지네이션 추가</p>
        <div style={{ height: '400px' }}></div>
      </div>
    </>
  )
}

export default PostList
