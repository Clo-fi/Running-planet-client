import SearchForm from '../../../../../components/common/SearchForm'
import styles from './PostList.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { CrewPostList } from '../../../../../types/crew/crewPost';
import instance from '../../../../../libs/api/axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const PostList = ({ isOpened }: { isOpened: boolean }) => {
  const navigate = useNavigate();
  const { crewId } = useParams();
  const fetchCrewPostList = async (): Promise<CrewPostList[]> => {
    const response = await instance.get(`/crew/${crewId}/board`)
    return response.data;
  }

  const { data, isError, error, isLoading } = useQuery<CrewPostList[], Error>({
    queryKey: ['crewPostList'],
    queryFn: fetchCrewPostList,
    enabled: isOpened
  })
  useEffect(() => {
    console.log(data);
  }, [data])

  const formatDate = (dateString: string) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);
    return `${year}.${month}.${day}`;
  };

  if (isError) {
    return <div>Error occurred: {error.message}<br /> 다시 연결해주세요!</div>;
  }

  const navigateHandler = (postId: number) => {
    navigate(`/crew/${crewId}/board/${postId}`)
  }
  return (
    <>
      <SearchForm img={'Filter'} />
      <div className={styles.list__announcement}>
        <img src="/icons/Bell_pin.png" alt="bellImg" />
        <p>공지사항</p>
      </div>
      <div className={styles.list__post_container}>
        {isLoading ? (
          [...Array(4)].map((_, index) => (
            <div className={styles.list__post} key={index}>
              <img className={styles.list__post_img} src="imgLink" alt="postImg" />
              <div className={styles.list__post_details}>
                <p>Loading... </p>
                <div className={styles.list__post_reaction}>
                  <span>Loading...</span>
                  <div className={styles.list__reaction}>
                    <div>
                      <img src="/icons/Favorite.png" alt="" />
                      <span>0</span>
                    </div>
                    <div>
                      <img src="/icons/Bookmark.png" alt="" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) :
          data?.slice().reverse().map((post) => (
            <div className={styles.list__post} key={post.id} onClick={() => navigateHandler(post.id)}>
              <img
                className={styles.list__post_img}
                src={post.imageList && post.imageList.length > 0 ? `https://running-planet-s3.s3.ap-northeast-2.amazonaws.com/${post.imageList[0].img}` : '/public/icons/Line_fill.png'}
                alt="postImg"
              />
              <div className={styles.list__post_details}>
                <p>{post.title} <span>{formatDate(post.writtenDate)}</span></p>
                <div className={styles.list__post_reaction}>
                  <span>{post.author}</span>
                  <div className={styles.list__reaction}>
                    <div>
                      <img src="/icons/Favorite.png" alt="" />
                      <span>{post.likeCnt}</span>
                    </div>
                    <div>
                      <img src="/icons/Bookmark.png" alt="" />
                      <span>{post.commentCnt}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div style={{ height: '200px' }}></div>
      </div>
    </>
  )
}

export default PostList
