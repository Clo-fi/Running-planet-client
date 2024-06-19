import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./PlanetNaming.module.scss";
import { usePlanetList } from "../../stores/planetListStore";
import { Planet } from "../../types/planet";
import { useUserStore } from "../../stores/userStore";
import instance from "../../libs/api/axios";
import BackSpaceTopBar from "../../components/common/BackSpaceTopBar";

const PlanetNaming = () => {

  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const memberId = user!.memberId;

  const [name, setName] = useState<string>("");

  const { planetId } = useParams<{ planetId: string }>();

  const { data: planetData, error, isLoading } = usePlanetList(memberId!);
  const [currentPlanet, setCurrentPlanet] = useState<Planet | null>(null);
  const [isPlanetLoaded, setIsPlanetLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (planetData && Array.isArray(planetData) && planetData.length > 0) {
      const matchedPlanet = planetData.find(planet => planet.planetId.toString() === planetId);
      if (matchedPlanet) {
        setCurrentPlanet(matchedPlanet);
        setIsPlanetLoaded(true);
      } else {
        console.log("Matched Planet이 없습니다.");
      }
    }
  }, [planetData, planetId]);

  const handleNaming = async () => {
    if (!name) {
      Swal.fire({
        icon: "warning",
        title: "이름을 입력해주세요",
        text: "행성의 이름을 입력해야 합니다.",
      });
      return;
    }

    try {
      const response = await instance.patch(`/profile/planet/${planetId}`, {
        planetName: name
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "성공",
          text: "행성 이름이 성공적으로 수정되었습니다.",
        }).then(() => {
          navigate('/planet');
        });
      } else {
        throw new Error("행성 이름 수정에 실패했습니다.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "실패",
        text: "행성 이름 수정에 실패했습니다.",
      });
    }
  };

  if (isLoading || !isPlanetLoaded) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.naming_container}>
      <BackSpaceTopBar onClick={() => navigate(-1)}></BackSpaceTopBar>

      <div className={styles.heading_container}>
        <p className={styles.heading}>
          러닝 플래닛과 함께
          <br />
          정신 없이 달릴 준비 되셨나요?
        </p>
      </div>

      <div className={styles.image_section}>
        {currentPlanet && (
          <>
            <div className={styles.img}>
              <img src={currentPlanet.planetImage} alt={currentPlanet.planetName}></img>
            </div>
            <p className={styles.text}>달리기를 통해 행성을 정화했어요!<br />이제 이름을 지어주고 새로운 행성을 만나러 가볼까요?</p>
          </>
        )}
      </div>

      <div className={styles.info_edit}>
        <div className={styles.info_title}>행성의 이름을 지어주세요!</div>
        <div className={styles.info_input_con}>
          <input
            type="text"
            className={styles.info_input}
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <footer className={styles.footer} onClick={handleNaming}>
        <p>다음</p>
      </footer>
    </div>
  );
};

export default PlanetNaming;
