import React, { useEffect } from 'react';
import styles from '../../postDetail/components/Detail.module.scss';

interface Props {
  title: string;
  content: string;
  imgList: File[];
  setImgList: React.Dispatch<React.SetStateAction<File[]>>;
  handleRemoveImage: (index: number) => void;
}

const ExpectedPost: React.FC<Props> = ({ imgList, handleRemoveImage, title, content }) => {
  // 제목이 비어 있는 경우 대체 텍스트 설정
  const displayTitle = title.trim() !== '' ? title : '예시 제목';
  // 콘텐츠가 비어 있는 경우 대체 텍스트 설정
  const displayContent = content.trim() !== '' ? content : '예시 콘텐츠';
  useEffect(() => {
    // console.log(imgList.length)
  }, [imgList])

  return (
    <div className={styles.detail__container}>
      <div className={styles.detail__content_container}>
        <p className={styles.detail__title}>{displayTitle} <span>유저 닉네임</span></p>
        {imgList.map((file, index) => (
          <div key={index} className={styles.image_container}>
            <img
              src={URL.createObjectURL(file)}
              alt={`preview ${index}`}
              style={{ width: '100px', height: '100px' }}
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className={styles.remove_button}
            >
              취소
            </button>
          </div>
        ))}
        <span>
          {displayContent}
        </span>
      </div>
    </div>
  );
}

export default ExpectedPost;
