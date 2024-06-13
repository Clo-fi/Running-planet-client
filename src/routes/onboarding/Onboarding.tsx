import { useState } from "react";
import styles from "./Onboarding.module.scss";
import instance from "../../libs/api/axios";
import Swal from "sweetalert2";

const Onboarding = () => {
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<number | string>('');
  const [weight, setWeight] = useState<number | string>('');

  const handleSet = async () => {
    if (!gender || !age || !weight) {
      Swal.fire({
        title: "모든 데이터값을 입력해주세요.",
        icon: "warning",
      });
    } else if (isNaN(Number(age)) || isNaN(Number(weight))) {
      Swal.fire({
        title: "나이와 몸무게는 숫자여야 합니다.",
        icon: "warning",
      });
    } else {
      const onboardingData = {
        gender: gender,
        age: Number(age),
        weight: Number(weight),
      };
      const response = await instance.post(`/onboarding`, onboardingData);
      console.log(response);
    }
  };

  return (
    <div className={styles.onboarding_container}>
      <hr className={styles.divider} />
      <div className={styles.heading_container}>
        <p className={styles.heading}>
          러닝 플래닛과 함께
          <br />
          정신 없이 달릴 준비 되셨나요?
        </p>
      </div>
      <div className={styles.select_section}>
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
              checked={gender === 'MALE'}
              onChange={() => setGender('MALE')}
            />
            <label className={`${styles.gender_btn} ${styles.btn_outline_primary}`} htmlFor="btnradio1">남성</label>
            <input
              type="radio"
              className={`${styles.gender_input} ${styles.btn_check}`}
              name="btnradio"
              id="btnradio2"
              autoComplete="off"
              checked={gender === 'FEMALE'}
              onChange={() => setGender('FEMALE')}
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
        <p onClick={handleSet}>다음</p>
      </footer>
    </div>
  );
};

export default Onboarding;
