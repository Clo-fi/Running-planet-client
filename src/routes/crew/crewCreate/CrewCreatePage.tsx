import { useRef, useState } from 'react'
import styles from './CrewCreatePage.module.scss';
import { CreateCrew, Rule } from '../../../types/crew/crewCreate'
import instance from '../../../libs/api/axios';
import { useNavigate } from 'react-router-dom';
import { CustomAlert } from '../../../libs/sweetAlert/alert';


const CrewCreatePage = () => {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [crewInfo, setCrewInfo] = useState<CreateCrew>({
    crewName: "",
    category: "",
    tags: [],
    approvalType: "",
    introduction: "",
    rule: {
      weeklyRun: 0,
      distance: 1,
    }
  });
  const [crewImg, setCrewImg] = useState<File | null>(null);
  const handleImageAdd = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCrewImg(file);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateCrewInfo = (key: keyof CreateCrew, value: any) => {
    setCrewInfo(prevState => ({
      ...prevState,
      [key]: value
    }));
  };
  const updateRule = (key: keyof Rule, value: number) => {
    setCrewInfo(prevState => ({
      ...prevState,
      rule: {
        ...prevState.rule,
        [key]: value
      }
    }));
  };

  const [step, setStep] = useState(1);

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return crewInfo.crewName.trim() !== '';
      case 2:
        return crewInfo.category !== '';
      case 3:
        return crewInfo.tags.length > 0;
      case 4:
        return crewInfo.introduction.trim() !== '';
      case 5:
        return crewInfo.approvalType !== '';
      case 6:
        return crewInfo.rule.weeklyRun !== 0;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (isStepValid(step)) {
      setStep(step + 1);
    } else {
      CustomAlert.fire({
        title: '입력을 완료해주세요!',
        timer: 1500
      })
    }
  };
  const prevStep = () => {
    if (step === 1) return;
    setStep(step - 1);
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <p className={styles.create__title}>크루의 이름을 입력해주세요.</p>
            <input
              className={styles.create__input}
              type="text"
              value={crewInfo.crewName}
              onChange={(e) => updateCrewInfo('crewName', e.target.value)}
              placeholder='크루명을 입력해주세요.'
            />
          </>
        );
      case 2:
        return (
          <>
            <p className={styles.create__title}>크루의 카테고리를 설정해주세요.</p>
            <div className={styles.create__radio}>
              <label htmlFor="run">
                <input
                  type="radio"
                  id="run"
                  name="activity"
                  value="RUNNING"
                  onChange={(e) => updateCrewInfo('category', e.target.value)}
                  checked={crewInfo.category === "RUNNING"}
                />
                러닝
              </label>
              <label htmlFor="diet">

                <input
                  type="radio"
                  id="diet"
                  name="activity"
                  value="DIET"
                  onChange={(e) => updateCrewInfo('category', e.target.value)}
                  checked={crewInfo.category === "DIET"}
                />
                다이어트
              </label>

              <label htmlFor="walk">
                <input
                  type="radio"
                  id="walk"
                  name="activity"
                  value="WALKING"
                  onChange={(e) => updateCrewInfo('category', e.target.value)}
                  checked={crewInfo.category === "WALKING"}
                />
                산책
              </label>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <p className={styles.create__title}>크루의 첫인상을<br /> 보여줄 수 있는 태그를 붙여주세요.</p>
            <span>태그는 최대 3개 까지 등록이 가능합니다. (#없이 띄어쓰기로 구분해주세요.)</span>
            <input
              type='text'
              value={crewInfo.tags.slice(0, 3).join(' ').replace(/#/g, '')}
              className={styles.create__input}
              onChange={(e) => {
                const tags = e.target.value.split(' ').map(tag => `#${tag}`);
                updateCrewInfo('tags', tags);
              }}
              placeholder='쉬엄쉬엄 열심히 친목'
            />
          </>
        );
      case 4:
        return (
          <>
            <p className={styles.create__title}>크루에 대한 소개글을 작성해주세요.</p>
            <textarea
              className={styles.create__textarea}
              value={crewInfo.introduction}
              onChange={(e) => updateCrewInfo('introduction', e.target.value)}
              placeholder='내용을 입력해주세요.'
            />
          </>
        );
      case 5:
        return (
          <>
            <p className={styles.create__title}>반가운 신규 크루원의 <br />가입신청은 어떻게 할까요?</p>
            <div className={styles.create__radio}>

              <label htmlFor="AUTO">
                <input
                  type="radio"
                  id="AUTO"
                  name="approval"
                  value="AUTO"
                  onChange={(e) => updateCrewInfo('approvalType', e.target.value)}
                  checked={crewInfo.approvalType === "AUTO"}
                />
                자동 수락
              </label>

              <label htmlFor="MANUAL">
                <input
                  type="radio"
                  id="MANUAL"
                  name="approval"
                  value="MANUAL"
                  onChange={(e) => updateCrewInfo('approvalType', e.target.value)}
                  checked={crewInfo.approvalType === "MANUAL"}
                />
                직접 검토
              </label>
            </div>
          </>
        );
      case 6:
        return (
          <>
            <p className={styles.create__title}>우리 크루의 룰은 어떻게 할까요?</p>
            <span>일주일 중 {crewInfo.rule.weeklyRun}일은 {crewInfo.rule.distance}km씩 달려요!</span><br />

            <div className={styles.create__rule_container}>
              <input
                type="range"
                id="weekly"
                name="weekly"
                onChange={(e) => updateRule('weeklyRun', Number(e.target.value))}
                value={crewInfo.rule.weeklyRun.toString()}
                min="1"
                max="7"
              />
              <input className={styles.create__rule_distance} type='number' value={crewInfo.rule.distance} onChange={(e) => updateRule('distance', Number(e.target.value))} />
            </div>
          </>
        );
      case 7:
        return (
          <>
            <p className={styles.create__title}>우리 크루의 대표 이미지는<br /> 어떤걸로 할까요?</p>
            <input
              type="file"
              accept="image/*"
              ref={imgInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <div
              className={styles.create__img}
              onClick={handleImageAdd}
            >
              {crewImg && (
                <img
                  src={URL.createObjectURL(crewImg)}
                  alt="crew"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '100px' }}
                />
              )}
            </div>
          </>
        )
      default:
        return null;
    }
  };
  const progressPercentage = (step / 7) * 100;

  const submitHandler = async () => {
    try {
      const updatedTag = crewInfo.tags.filter(tag => tag !== '#');
      const updatedCrewInfo = {
        ...crewInfo,
        tags: updatedTag
      };
      const formData = new FormData();

      const createCrewBlob = new Blob([JSON.stringify(updatedCrewInfo)], {
        type: 'application/json'
      });
      formData.append('crewInfo', createCrewBlob);
      if (crewImg) {
        formData.append('imgFile', crewImg);
      }
      const response = await instance.post('/crew', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      // console.log(updatedCrewInfo);
      console.log(response);

      await CustomAlert.fire({
        icon: 'success',
        title: '크루 생성 완료!',
        text: '크루가 성공적으로 생성되었습니다.',
      });
      navigate('/home');
    } catch (error) {
      CustomAlert.fire({
        icon: 'error',
        title: '에러 발생!',
        text: '크루 생성 중 에러가 발생하였습니다.',
      });
      console.error(error);
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <div className={styles.create__container}>
        <div className={styles.create__top}>
          <img className={styles.create__backspace} onClick={prevStep} src="/icons/Expand_left.png" alt="returnBtn" />
          <p>크루 생성</p>
        </div>
        <div style={{ width: '80%', backgroundColor: '#D9D9D9' }}>
          <div className={styles.progress_inner} style={{ width: `${progressPercentage}%`, height: '2px' }}></div>
        </div>
        <div className={styles.create__form}>
          {renderStep()}
        </div>
        {step !== 7 && <button className={styles.create__btn} onClick={nextStep}>다음</button>}
        {step === 7 && <button className={styles.create__btn} onClick={submitHandler}>크루 생성</button>}
      </div>
    </div>

  )
}

export default CrewCreatePage
