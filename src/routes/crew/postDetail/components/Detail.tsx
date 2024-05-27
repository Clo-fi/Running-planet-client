import React from 'react';
import styles from './Detail.module.scss';
import { CrewPost } from '../../../../types/crewList';

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
  data: CrewPost | undefined;
  isLoading: boolean
}
const Detail: React.FC<DetailProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <div className={styles.detail__container}>Loading...</div>;
  }
  return (
    <div className={styles.detail__container}>
      {data && (
        <>
          <div className={styles.detail__backspace}>
            <img src='/icons/Expand_left.png' alt='backSpaceImg' />
          </div>
          <div className={styles.detail__content_container}>
            <p className={styles.detail__title}>{data.title} <span className={styles.detail__author}>{data.author}</span></p>
            {data.imgList && data.imgList.length > 0 && (
              <>
                {data.imgList.map((image, index) => (
                  <img key={index} src={image.img} alt={`img_${index}`} />
                ))}
              </>
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
        </>
      )}
    </div>
  )
}

export default Detail
