import styles from './Detail.module.scss';

const dummyPost = {
  "title": "글 제목입니다.",
  "author": "몌린",
  "authorId": 1,
  "content": "글 내용입니다.",
  "likeCnt": 3,
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
  ],
  "comments": [
    {
      "author": "한우혁",
      "content": "댓글입니다",
      "createdDate": "2024-04-04 23:15:27"
    },
    {
      "author": "김용빈",
      "content": "댓글입니다2",
      "createdDate": "2024-04-04 23:15:27"
    },
  ]
}
const Detail = () => {
  return (
    <div className={styles.detail__container}>
      <div className={styles.detail__backspace}>
        <img src='/src/assets/icons/Expand_left.png' alt='backSpaceImg' />
      </div>
      <div className={styles.detail__content_container}>
        <p className={styles.detail__title}>{dummyPost.title} <span className={styles.detail__author}>{dummyPost.author}</span></p>
        {dummyPost.imgList && dummyPost.imgList.length > 0 && (
          <>
            {dummyPost.imgList.map((image, index) => (
              <img key={index} src={image.img} alt={`img_${index}`} />
            ))}
          </>
        )}
        <span>
          {dummyPost.content}
        </span>
      </div>
      <div className={styles.detail__info}>
        <span>
          {dummyPost.writtenDate}
        </span>
        <div className={styles.detail__info_like_comment}>
          <>
            <img src="/src/assets/icons/Favorite.png" alt="" />
            <span>{dummyPost.likeCnt}</span>
          </>
          <>
            <img src="/src/assets/icons/Bookmark.png" alt="" />
            <span>{dummyPost.comments.length}</span>
          </>
        </div>
      </div>
    </div>
  )
}

export default Detail
