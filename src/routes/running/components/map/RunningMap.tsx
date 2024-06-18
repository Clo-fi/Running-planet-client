import styles from './RunningMap.module.scss'
import KakaoMap from '../../../../components/common/kakaomap/KakaoMap';



const RunningMap = () => {

  return (

    <div className={styles.map}>
      <KakaoMap />
    </div>

  );
};

export default RunningMap;
