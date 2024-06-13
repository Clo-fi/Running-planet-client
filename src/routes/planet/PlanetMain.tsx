import styles from "./PlanetMain.module.scss";
import { useNavigate } from "react-router-dom";
import { usePlanetList } from "../../stores/planetListStore";
import { useEffect, useState} from "react";
import { useUserStore } from "../../stores/userStore";
import { Planet } from "../../types/planet";

const PlanetMain = () => {
  const nav = useNavigate();
  const user = useUserStore((state) => state.user);
  const memberId = user!.memberId;
  const { data: planetList, error } = usePlanetList(memberId);
  const [currentPlanet, setCurrentPlanet] = useState<Planet | null>(null);

  const handleCrew = () => {
    nav('/crew');
  };

  const handlePlanetList = () => {
    nav('/planet/list');
  }

  useEffect(() => {
    if (planetList?.planets?.length) {
      setCurrentPlanet(planetList.planets[planetList.planets.length - 1]);
    } else if (error) {
      console.log(error);
    }
  }, [planetList]);

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <p>테라포밍</p>
      </div>

      <div className={styles.select_section}>
        <div className={styles.select_button}>
          개인 행성
        </div>
        <div className={styles.select_button} onClick={handleCrew}>
          크루 페이지
        </div>
      </div>

      <div className={styles.planet_container}>
        <div className={styles.planet_name}>
          {currentPlanet?.planetName}
        </div>
        <div className={styles.planet_Img}>
          {currentPlanet && <img src={currentPlanet.planetImage} alt={currentPlanet.planetName} />}
        </div>
      </div>

      <div className={styles.progress_container}>
        <div className={styles.progress}>
          <p>테라포밍 진행도</p>
          <p>{currentPlanet ? `${(currentPlanet.distance / currentPlanet.demandDistance) * 100}%` : 'N/A'}</p>
        </div>
        <div className={styles.progress}>
          <p>이동한 거리</p>
          <p>{currentPlanet ? `${currentPlanet.distance} KM` : 'N/A'}</p>
        </div>
      </div>

      <div className={styles.list_btn} onClick={handlePlanetList}>
        <p>행성 목록 보기</p>
      </div>
    </div>
  );
}

export default PlanetMain;
