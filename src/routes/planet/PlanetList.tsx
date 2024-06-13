import styles from "./PlanetList.module.scss";
// import { usePlanetList } from "../../stores/planetListStore";
// import { useState, useEffect } from "react";
// import { Planet } from "../../types/planet"; 
// import { useUserStore } from "../../stores/userStore";

const PlanetList = () => {

  // const [planets, setPlanets] = useState<Planet[]>([]);
  // const user = useUserStore((state) => state.user);
  // const memberId = user!.memberId;
  // const { data: planetList, error } = usePlanetList(memberId);

  // useEffect(() => {
  //   if (planetList?.planets) {
  //     setPlanets(planetList.planets);
  //   }
  // }, [planetList]);

  // if (error) {
  //   return <div>에러가 발생했습니다: {error.message}</div>;
  // }

  // if (!planetList) {
  //   return <div>로딩 중...</div>;
  // }

  const planets =
    [
      {
        "planetId": 3,
        "planetName": "지구",
        "planetImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/1024px-Earth_Western_Hemisphere_transparent_background.png",
        "demandDistance": 10,
        "distance": 10
      },
      {
        "planetId": 4,
        "planetName": "화성",
        "planetImage": "https://static.vecteezy.com/system/resources/thumbnails/020/922/027/small_2x/isolated-realistic-mars-illustration-png.png",
        "demandDistance": 50,
        "distance": 40
      }
    ]


  return (
    <div className={styles.list_container}>
      <div className={styles.list}>
        {planets.map((planet) => (
          <div className={styles.planet}>
            <div key={planet.planetId} className={styles.planet_item}>
              <img src={planet.planetImage} className={styles.planet_img} />
              <div className={styles.planet_info}>
                <div className={styles.planet_name}>{planet.planetName}</div>
                <div className={styles.planet_distance}>
                  <p>달린 거리</p> <p>{planet.distance} KM</p>
                </div>
                <div className={styles.planet_demand}>
                  <p>행성 거리</p><p>{planet.demandDistance} KM</p>
                </div>
              </div>
            </div>
            <hr className={styles.hr}/>
          </div>

        ))}
      </div>
    </div>
  );
};

export default PlanetList;
