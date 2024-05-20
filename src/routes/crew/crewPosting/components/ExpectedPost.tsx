import React from 'react';
import styles from './ExpectedPost.module.scss';

interface Props {
  title: string;
  content: string;
  imgList: File[];
  setImgList: React.Dispatch<React.SetStateAction<File[]>>;
  handleRemoveImage: (index: number) => void;
}

const ExpectedPost: React.FC<Props> = ({ imgList, handleRemoveImage, title, content }) => {
  return (

    <div className={styles.container}>
      {title}
      {content}
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
    </div>
  );
}

export default ExpectedPost;
