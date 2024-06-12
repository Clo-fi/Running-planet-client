import React from 'react';
import styles from './Detail.module.scss';
import { Post } from '../../../../types/crew/crewPost';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import instance from '../../../../libs/api/axios';

interface DetailProps {
  data: Post | undefined;
  isLoading: boolean;
  isLiked: boolean | undefined;
  authorId: number | undefined;

  onNewComment: () => void;
}

const Detail: React.FC<DetailProps> = ({ data, isLoading, isLiked, authorId, onNewComment }) => {
  console.log(authorId);
  const { crewId, boardId } = useParams();

  const likeHandler = async () => {
    try {
      const response = await instance.post(`/crew/${crewId}/board/${boardId}/like`);
      console.log(response);
      onNewComment();
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
        <img className={styles.detail__edit} src='/icons/Edit.png' alt='editImg' />
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
            <img src={isLiked ? '/icons/Favorite_full.png' : `/icons/Favorite.png`} alt="likeImg" onClick={likeHandler} />
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
export default Detail;
