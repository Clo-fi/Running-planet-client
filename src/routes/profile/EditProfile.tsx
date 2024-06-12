import styles from "./EditProfile.module.scss";
import instance from "../../libs/api/axios";
import { UserType } from '../../types/user/user';
import { useUserStore } from '../../stores/userStore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fetchUserInfo = async (): Promise<UserType> => {
  const response = await instance.get('/profile');
  return response.data;
};

const EditProfile: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [nickname, setNickname] = useState<string>(user?.nickname || '');
  const [age, setAge] = useState<number | string>(user?.age || '');
  const [gender, setGender] = useState<string>(user?.gender || '');
  const [weight, setWeight] = useState<number | string>(user?.weight || '');

  const navigate = useNavigate();

  const handleEdit = async () => {
    const updateProfile = {
      nickname,
      weight: Number(weight),
      gender: gender === '남성' ? 'MALE' : 'FEMALE',
      age: Number(age),
    };

    const formData = new FormData();
    formData.append('updateProfile', new Blob([JSON.stringify(updateProfile)], { type: 'application/json' }));

    if (profileImg) {
      formData.append('imgFile', profileImg, profileImg.name);
    }

    try {
      await instance.patch('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const updatedUser = await fetchUserInfo();
      setUser(updatedUser);
      navigate('/profile');
    } catch (error) {
      console.error('프로필 수정 오류:', error);
      // 오류 처리
    }
  };

  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImg(event.target.files[0]);
    } else {
      setProfileImg(null);
    }
  };

  return (
    <div className={styles.edit_container}>
      <div className={styles.edit_img_container}>
        {user?.profileImg ? (
          <img className={styles.profile_img} src={user.profileImg} alt="Profile" />
        ) : (
          <div className={styles.profile_img_placeholder}></div>
        )}
        <input
          type="file"
          accept="image/*"
          className={styles.img_input}
          onChange={handleImgChange}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label className={styles.img_btn} htmlFor="fileInput">
          <img src="/icons/Img_box.png" alt="Upload" />
        </label>
      </div>
      <div className={styles.info_edit_container}>
        <div className={styles.info_edit}>
          <div className={styles.info_title}>닉네임</div>
          <div className={styles.info_input_con}>
            <input
              type="text"
              className={styles.info_input}
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.info_edit}>
          <div className={styles.info_title}>나이</div>
          <div className={styles.info_input_con}>
            <input
              type="number"
              className={styles.info_input}
              placeholder="나이를 입력해주세요."
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.info_edit}>
          <div className={styles.info_title}>성별</div>
          <div className={styles.btn_group} role="group" aria-label="Basic radio toggle button group">
            <input
              type="radio"
              className={`${styles.gender_input} ${styles.btn_check}`}
              name="btnradio"
              id="btnradio1"
              autoComplete="off"
              checked={gender === '남성'}
              onChange={() => setGender('남성')}
            />
            <label className={`${styles.gender_btn} ${styles.btn_outline_primary}`} htmlFor="btnradio1">남성</label>
            <input
              type="radio"
              className={`${styles.gender_input} ${styles.btn_check}`}
              name="btnradio"
              id="btnradio2"
              autoComplete="off"
              checked={gender === '여성'}
              onChange={() => setGender('여성')}
            />
            <label className={`${styles.gender_btn} ${styles.btn_outline_primary}`} htmlFor="btnradio2">여성</label>
          </div>
        </div>
        <div className={styles.info_edit}>
          <div className={styles.info_title}>몸무게</div>
          <div className={styles.info_input_con}>
            <input
              type="text"
              className={styles.info_input}
              placeholder="몸무게를 입력해주세요."
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <p onClick={handleEdit}>완료</p>
      </footer>
    </div>
  );
};

export default EditProfile;
