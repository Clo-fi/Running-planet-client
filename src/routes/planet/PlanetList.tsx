import { useNavigate } from "react-router-dom";
import BackSpaceTopBar from "../../components/common/BackSpaceTopBar";
import styles from "./PlanetList.module.scss";
import { usePlanetList } from "../../stores/planetListStore";
import { useState, useEffect } from "react";
import { Planet } from "../../types/planet"; 
import { useUserStore } from "../../stores/userStore";

const PlanetList = () => {

  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const memberId = user!.memberId;

  const { data: planetData, error, isLoading } = usePlanetList(memberId!);
  const [planets, setPlanets] = useState<Planet[]>([]);

  const handlePlanetClick = (planetId:number) => {
    navigate(`/planet/${planetId}`);

  }

  useEffect(() => {
    if (planetData && Array.isArray(planetData) && planetData.length > 0) {
      setPlanets(planetData);
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
    <div className={styles.list_container}>
      <BackSpaceTopBar title="내 행성" onClick={() => navigate(-1)}></BackSpaceTopBar>
      <div className={styles.list}>
        {planets.map((planet) => (
          <div  key={planet.planetId} className={styles.planet} onClick={() => handlePlanetClick(planet.planetId)}>
            <div className={styles.planet_item}>
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
