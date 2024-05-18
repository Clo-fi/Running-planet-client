import React from 'react'
import styles from './Detail.module.scss';

const dummyPost = {
  "title": "글 제목입니다.",
  "author": "몌린",
  "authorId": 1,
  "content": "글 내용입니다.",
  "likeCnt": 2,
  "writtenDate": "2024-05-08",
  "imgList": [
    {
      "id": 1,
      "img": "imgURL"
    },
    {
      "id": 2,
      "img": "imgURL"
    }
  ]
}

const Detail = () => {
  const formatDate = (dateString: string) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}.${month}.${day}`;
  };


  return (
    <div className={styles.detail__container}>
      <div>
        <img src='/src/assets/icons/Expand_left.png' alt='backSpaceImg' />
      </div>
      <div>
        <p>{dummyPost.title} <span>{dummyPost.author}</span></p>
        {dummyPost.imgList && dummyPost.imgList.length > 0 && (
          <div>
            {dummyPost.imgList.map((image, index) => (
              <img key={index} src={image.img} alt={`img_${index}`} />
            ))}
          </div>
        )}
        <span>
          {dummyPost.content}
        </span>
      </div>
      <div>
        <span>
          {formatDate(dummyPost.writtenDate)}
        </span>
        <div>
          <div>
            <img src="/src/assets/icons/Favorite.png" alt="" />
            <span>{dummyPost.likeCnt}</span>
          </div>
          <div>
            <img src="/src/assets/icons/Bookmark.png" alt="" />
            <span>ㅇㅈㅁㅇ</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
