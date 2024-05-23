import styles from './PostDetailPage.module.scss';
import Detail from './components/Detail';
import Comment from './components/Comment';
import { useParams } from 'react-router-dom';
import { CrewPost } from '../../../types/crewList';
import instance from '../../../libs/api/axios';
import { useQuery } from '@tanstack/react-query';

const PostDetailPage = () => {
  const { crewId, boardId } = useParams();

  const fetchPostDetail = async (): Promise<CrewPost> => {
    const response = await instance.get(`/crew/${crewId}/board/${boardId}`);
    return response.data;
  }

  console.log(crewId, boardId)
  const { data, isError, error, isLoading } = useQuery<CrewPost, Error>({
    queryKey: ['postDetail', crewId, boardId],
    queryFn: fetchPostDetail,
    enabled: !!crewId && !!boardId,
  });
  // 아래 린트에러 떄문에 생성
  console.log(data, isError)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message} <br /> 통신에러! 다시 시도해주세요.</div>
  }

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
