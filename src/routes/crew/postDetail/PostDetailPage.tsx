import styles from './PostDetailPage.module.scss';
import Detail from './components/Detail';
import Comment from './components/Comment';
import { useParams } from 'react-router-dom';
import { CrewPost } from '../../../types/crew/crewPost';
import instance from '../../../libs/api/axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const PostDetailPage = () => {
  const { crewId, boardId } = useParams();

  const fetchPostDetail = async (): Promise<CrewPost> => {
    const response = await instance.get(`/crew/${crewId}/board/${boardId}`);
    return response.data;
  }

  const { data, isError, error, isLoading } = useQuery<CrewPost, Error>({
    queryKey: ['postDetail', crewId, boardId],
    queryFn: fetchPostDetail,
    enabled: !!crewId && !!boardId,
  });

  useEffect(() => { console.log(data); }, [data])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred: {error.message} <br /> 통신에러! 다시 시도해주세요.</div>
  }

  return (
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
      <div className={styles.detail__container}>
        <Detail isLoading={isLoading} data={data?.boardResponse} />
        <Comment isLoading={isLoading} data={data?.comments} />
      </div>
    </div>
  )
}

export default PostDetailPage
