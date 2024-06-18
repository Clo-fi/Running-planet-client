import { useNavigate } from "react-router-dom";
import BackSpaceTopBar from "../../components/common/BackSpaceTopBar";
import styles from "./PlanetList.module.scss";
import { usePlanetList } from "../../stores/planetListStore";
import { useState, useEffect } from "react";
import { Planet } from "../../types/planet"; 
import { useUserStore } from "../../stores/userStore";

const PlanetList = () => {

  const navigate = useNavigate();

  const [planets, setPlanets] = useState<Planet[]>([]);
  const user = useUserStore((state) => state.user);
  const memberId = user!.memberId;
  const { data: planetList, error } = usePlanetList(memberId);

  const handlePlanetClick = (planetId:number) => {
    navigate(`/planet/${planetId}`);

  }

  useEffect(() => {
    if (planetList?.planets) {
      setPlanets(planetList.planets);
    }
  }, [planetList]);

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  if (!planetList) {
    return <div>로딩 중...</div>;
  }


  return (
    <div className={styles.list_container}>
      <BackSpaceTopBar title="내 행성" onClick={() => navigate(-1)}></BackSpaceTopBar>
      <div className={styles.list}>
        {planets.map((planet) => (
          <div className={styles.planet} onClick={() => handlePlanetClick(planet.planetId)}>
            <div key={planet.planetId} className={styles.planet_item}>
              <div className={styles.planet_info}>
                <div className={styles.planet_name}>{planet.planetName}</div>
              </div>
              <img src={planet.planetImage} className={styles.planet_img} />
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default PlanetList;
