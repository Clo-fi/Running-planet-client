import React, { ChangeEvent, FormEvent } from 'react';
import styles from './Form.module.scss';
import instance from '../../../../libs/api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackSpaceTopBar from '../../../../components/common/BackSpaceTopBar';

interface Props {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageAdd: () => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  imgList: File[];
  title: string;
  content: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}
const Form = ({
  fileInputRef,
  handleImageAdd,
  handleFileChange,
  title, setTitle,
  content, setContent,
  imgList
}: Props) => {
  const { crewId } = useParams();
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      const createBoardBlob = new Blob([JSON.stringify({ title, content })], {
        type: 'application/json',
      });
      formData.append('createBoard', createBoardBlob);

      // 각 파일을 imgFile[]로 추가
      imgList.forEach((img) => {
        console.log('Image File:', img); // 이미지 파일이 정상적으로 추가되었는지 확인
        formData.append('imgFile', img);
      });

      const response = await instance.post(`/crew/${crewId}/board`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      navigate(`/crew/${crewId}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className={styles.posting__main_container}>
        <BackSpaceTopBar
          title='게시글 작성'
          onClick={() => navigate(-1)}
          isEditable={false}
        />
        <form className={styles.posting__form} onSubmit={submitHandler}>
          <input className={styles.posting__title} type='text' placeholder='제목을 입력해주세요.' value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className={styles.posting_content} placeholder='내용을 입력해주세요.' value={content} onChange={(e) => setContent(e.target.value)} />
          <input
            className={styles.posting__input_img}
            ref={fileInputRef}
            type='file'
            multiple
            onChange={handleFileChange}
          />
          <button
            type="button"
            className={styles.posting__img_btn}
            onClick={handleImageAdd}
          >
            <img src="/icons/Img_box.png" alt="upload icon" />
          </button>
          <button className={styles.posting__btn} type='submit'>등록하기</button>
        </form>
        <p>게시글 미리보기는 화면을 스와이프 해서 확인해주세요</p>
      </div>
    </>

  );
}
export default Form
