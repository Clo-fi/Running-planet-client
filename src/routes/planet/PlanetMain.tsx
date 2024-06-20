import styles from "./PlanetMain.module.scss";
import { useNavigate } from "react-router-dom";
import { usePlanetList } from "../../stores/planetListStore";
import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { Planet } from "../../types/planet";

const PlanetMain = () => {
  const nav = useNavigate();
  const user = useUserStore((state) => state.user);
  const memberId = user ? user.memberId : null;
  const { data: planetData, error, isLoading } = usePlanetList(memberId!);
  const [currentPlanet, setCurrentPlanet] = useState<Planet | null>(null);
  const [planets, setPlanets] = useState<Planet[]>([]);

  const handlePlanetList = () => {
    nav('/planet/list');
  };

  useEffect(() => {
    if (planetData && Array.isArray(planetData) && planetData.length > 0) {
      setPlanets(planetData);
      setCurrentPlanet(planetData[planetData.length - 1]);
      console.log("planetData 설정 완료:", planetData);
    } else {
      console.log("planetData가 없습니다.", planetData);
    }
  }, [planetData]);

  if (!memberId) {
    return <div>유저 정보가 없습니다. 로그인 후 다시 시도해주세요.</div>;
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  if (!planetData || !Array.isArray(planetData) || planetData.length === 0) {
    return <div>현재 행성이 없습니다.</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.planet_name}>
        <p>{currentPlanet?.planetName}</p>
      </div>

      <div className={styles.planet_Img}>
        <img src={currentPlanet?.planetImage} alt={currentPlanet?.planetName} />
      </div>

      <div className={styles.progress_container}>
        <div className={styles.progress}>
          <p>테라포밍 진행도</p>
          <p>{`${((currentPlanet?.distance ?? 0) / (currentPlanet?.demandDistance ?? 1) * 100).toFixed(2)}%`}</p>
        </div>
        <div className={styles.progress}>
          <p>이동한 거리</p>
          <p>{`${currentPlanet?.distance ?? 0} KM`}</p>
        </div>
      </div>

      <div className={styles.planet_list}>
        {planets.map((planet) => (
          <div key={planet.planetId} className={styles.planet_element}>
            <img className={styles.planet_ele_img} src={planet.planetImage} alt={planet.planetName} />
          </div>
        ))}
      </div>

      <div className={styles.list_btn} onClick={handlePlanetList}>
        <p>행성 목록 보기</p>
      </div>
    </div>
  );
}

export default PlanetMain;
