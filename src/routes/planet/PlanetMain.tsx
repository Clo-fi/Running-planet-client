import styles from "./PlanetMain.module.scss";
import { useNavigate } from "react-router-dom";
import { usePlanetList } from "../../stores/planetListStore";
import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { Planet } from "../../types/planet";

const PlanetMain = () => {
  const nav = useNavigate();
  const user = useUserStore((state) => state.user);
  const memberId = user!.memberId;
  const { data: planetData, error, isLoading } = usePlanetList(memberId); // isLoading 추가
  const [currentPlanet, setCurrentPlanet] = useState<Planet | null>(null);
  const [planets, setPlanets] = useState<Planet[]>([]);

  const handlePlanetList = () => {
    nav('/planet/list');
  }

  const dummyPlanetList: Planet[] = [
    {
      planetId: 3,
      planetName: "지구",
      planetImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/1200px-Earth_Western_Hemisphere_transparent_background.png",
      demandDistance: 10.0,
      distance: 10.0
    },
    {
      planetId: 4,
      planetName: "화성",
      planetImage: "https://static.vecteezy.com/system/resources/thumbnails/020/922/027/small_2x/isolated-realistic-mars-illustration-png.png",
      demandDistance: 50.0,
      distance: 40.0
    },
    {
      planetId: 5,
      planetName: "화성2",
      planetImage: "https://static.vecteezy.com/system/resources/thumbnails/020/922/027/small_2x/isolated-realistic-mars-illustration-png.png",
      demandDistance: 50.0,
      distance: 40.0
    },
    {
      planetId: 6,
      planetName: "화성3",
      planetImage: "https://static.vecteezy.com/system/resources/thumbnails/020/922/027/small_2x/isolated-realistic-mars-illustration-png.png",
      demandDistance: 50.0,
      distance: 40.0
    },
    {
      planetId: 7,
      planetName: "화성4",
      planetImage: "https://static.vecteezy.com/system/resources/thumbnails/020/922/027/small_2x/isolated-realistic-mars-illustration-png.png",
      demandDistance: 50.0,
      distance: 40.0
    }
  ];

  useEffect(() => {
    if (planetData?.planets?.length) {
      setPlanets(planetData.planets);
      setCurrentPlanet(planetData.planets[planetData.planets.length - 1]);
    } else {
      setPlanets(dummyPlanetList);
      setCurrentPlanet(dummyPlanetList[dummyPlanetList.length - 1]);
    }
  }, [planetData]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.planet_name}>
        <p>{currentPlanet ? currentPlanet.planetName : '행성 이름'}</p>
      </div>

      <div className={styles.planet_Img}>
        {currentPlanet && <img src={currentPlanet.planetImage} alt={currentPlanet.planetName} />}
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
