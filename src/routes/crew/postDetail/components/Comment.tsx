import { useState } from 'react';
import { Comments } from '../../../../types/crew/crewPost';
import styles from './Comment.module.scss';
import instance from '../../../../libs/api/axios';
import { useParams } from 'react-router-dom';

interface CommnetProps {
  data: Comments[] | undefined;
  isLoading: boolean;
}
const Comment: React.FC<CommnetProps> = ({ data, isLoading }) => {
  const { crewId, boardId } = useParams();
  const [comment, setComment] = useState<string>('');

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 9); // 9시간 추가하여 한국 시간으로 변환
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleString('ko-KR', options);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await instance.post(`/crew/${crewId}/board/${boardId}/comment`, { content: comment });
      setComment('');
      console.log(response);
    } catch (error) {
      console.error(error);
    }

  }
  if (isLoading) {
    <div className={styles.comment__container} >
      Loading...
    </div>;
  }
  return (
    <div className={styles.comment__container}>
      <form className={styles.comment__form} onSubmit={handleSubmit} >
        <input className={styles.commnet__input} placeholder='댓글 작성하기' value={comment} onChange={(e) => setComment(e.target.value)} />
      </form>
      {data && (
        data && data.length > 0 &&
        data.map((comment, index) => (
          <div className={styles.comment__comment_box} key={index}>
            {/* <img src={comment.authorImg} alt="authorImg" /> */}
            <img src={comment.authorImg} alt="authorImg" />
            <div className={styles.comment__comment}>
              <p className={styles.comment__author}>{comment.author}
                <span>{formatDate(comment.createdDate)}</span></p>
              <span className={styles.comment_content}>
                {comment.content}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Comment
