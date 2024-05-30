import React from 'react';
import styles from './Detail.module.scss';
import { Post } from '../../../../types/crewList';
import { useNavigate } from 'react-router-dom';

// const dummyPost = {
//   "title": "글 제목입니다.",
//   "author": "몌린",
//   "authorId": 1,
//   "content": "글 내용입니다.",
//   "likeCnt": 3,
//   "writtenDate": "2024-05-08",
//   "imgList": [
//     {
//       "id": 1,
//       "img": "imgURL"
//     },
//     {
//       "id": 2,
//       "img": "imgURL"
//     }
//   ],
//   "comments": [
//     {
//       "author": "한우혁",
//       "content": "댓글입니다",
//       "createdDate": "2024-04-04 23:15:27"
//     },
//     {
//       "author": "김용빈",
//       "content": "댓글입니다2",
//       "createdDate": "2024-04-04 23:15:27"
//     },
//   ]
// }
interface DetailProps {
  data: Post | undefined;
  isLoading: boolean
}

const Detail: React.FC<DetailProps> = ({ data, isLoading }) => {

  const navigate = useNavigate();
  if (isLoading) {
    return <div className={styles.detail__container}>Loading...</div>;
  }

  if (!data) {
    return <div className={styles.detail__container}>No data available.</div>;
  }

  return (
    <div className={styles.detail__container}>
      <div className={styles.detail__backspace}>
        <img src='/icons/Expand_left.png' alt='backSpaceImg' onClick={() => navigate(-1)} />
      </div>
      <div className={styles.detail__content_container}>
        <p className={styles.detail__title}>{data.title} <span className={styles.detail__author}>{data.author}</span></p>
        {data.imageList && data.imageList.length > 0 ? (
          <>
            {data.imageList.map((image) => (
              <img
                key={image.id}
                src={`https://running-planet-s3.s3.ap-northeast-2.amazonaws.com/${image.img}`}
                alt={`img_${image.id}`} />
            ))}
          </>
        ) : (
          <div style={{ height: '400px' }} />
        )}
        <span>
          {data.content}
        </span>
      </div>
      <div className={styles.detail__info}>
        <span>
          {data.writtenDate}
        </span>
        <div className={styles.detail__info_like_comment}>
          <>
            <img src="/icons/Favorite.png" alt="" />
            <span>{data.likeCnt}</span>
          </>
          <>
            <img src="/icons/Bookmark.png" alt="" />
            <span>{data.commentCnt}</span>
          </>
        </div>
      </div>
    </div>
  );
}
export default Detail
