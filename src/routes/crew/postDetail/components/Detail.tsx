import React from 'react';
import styles from './Detail.module.scss';
import { Post } from '../../../../types/crew/crewPost';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import instance from '../../../../libs/api/axios';
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

  const { crewId, boardId } = useParams();

  const likeHandler = async () => {
    try {
      const response = await instance.post(`/crew/${crewId}/board/${boardId}/like`)
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  const navigate = useNavigate();
  if (isLoading) {
    return <div className={styles.detail__container}>Loading...</div>;
  }

  if (!data) {
    return <div className={styles.detail__container}>No data available.</div>;
  }

  return (
    <div className={styles.detail__container}>
      <div className={styles.detail__top}>
        <img className={styles.detail__backspace} src='/icons/Expand_left.png' alt='backSpaceImg' onClick={() => navigate(-1)} />
        <p className={styles.detail__title}>{data.title}</p>
        <img className={styles.detail__edit} src='/icons/Edit.png' alt='editIgm' />
      </div>
      <div className={styles.detail__content_container}>
        {data.imageList && data.imageList.length > 0 ? (
          <>
            {data.imageList.map((image) => (
              <img
                className={styles.img}
                key={image.id}
                src={`https://running-planet-s3.s3.ap-northeast-2.amazonaws.com/${image.img}`}
                alt={`img_${image.id}`} />
            ))}
          </>
        ) : (
          <div style={{ height: '400px', width: '100%', background: 'lightgray', marginTop: '20px' }} >
            <h1>이미지가 없습니다!</h1>
          </div>
        )}
        <div className={styles.detail__info}>
          <span>
            {data.writtenDate}
          </span>
          <div className={styles.detail__info_like_comment}>
            <img src="/icons/Favorite.png" alt="likeImg" onClick={likeHandler} />
            <span>{data.likeCnt}</span>
          </div>
        </div>
        <span className={styles.detail__content}>
          {parse(data.content.replace(/\n/g, '<br>'))}
        </span>
      </div>
      <p className={styles.detail__author}>{data.author}</p>

    </div>
  );
}
export default Detail
