import styles from './Comment.module.scss';

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
      "authorImg": "https://sksksksk",
      "content": "댓글입니다",
      "createdDate": "2024-04-04 23:15:27"
    },
    {
      "author": "김용빈",
      "authorImg": "https://sksksksk",
      "content": "댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2댓글입니다2",
      "createdDate": "2024-04-04 23:15:27"
    },
  ]
}

const Comment = () => {
  return (
    <div className={styles.comment__container}>
      {dummyPost.comments && dummyPost.comments.length > 0 &&
        dummyPost.comments.map((comment, index) => (
          <div className={styles.comment__comment_box} key={index}>
            {/* <img src={comment.authorImg} alt="authorImg" /> */}
            <img src='/src/assets/icons/earth.png' alt="authorImg" />
            <div className={styles.comment__comment}>
              <p className={styles.comment__author}>{comment.author}<span>{comment.createdDate}</span></p>
              <span className={styles.comment_content}>
                {comment.content}
              </span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Comment
