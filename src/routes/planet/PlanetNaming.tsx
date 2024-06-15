import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Swal을 사용하기 위해 추가
import styles from "./PlanetNaming.module.scss";
import { usePlanetList } from "../../stores/planetListStore";
import { Planet } from "../../types/planet";
import { useUserStore } from "../../stores/userStore";
import instance from "../../libs/api/axios";

function getPlanetIdFromUrl() {
  const url = window.location.pathname;
  const parts = url.split("/");
  return parts[2]; // '/planet/{planetId}' 형태에서 planetId를 추출
}

const PlanetNaming = () => {
  const user = useUserStore((state) => state.user);

  const [name, setName] = useState<string>("");
  const [currentPlanet, setCurrentPlanet] = useState<Planet | undefined>();
  const memberId = user!.memberId;
  const { data: planetList, isLoading, error } = usePlanetList(memberId);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    if (planetList) {
      const planetId = getPlanetIdFromUrl();
      const matchedPlanet = planetList.planets.find(planet => planet.planetId.toString() === planetId);
      setCurrentPlanet(matchedPlanet);
    }
  }, [planetList]);

  const handleNaming = async () => {
    if (!name) {
      Swal.fire({
        icon: "warning",
        title: "이름을 입력해주세요",
        text: "행성의 이름을 입력해야 합니다.",
      });
      return;
    }

    const planetId = getPlanetIdFromUrl();
    try {
      const response = await instance.patch(`/profile/planet/${planetId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planetName: name }),
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "성공",
          text: "행성 이름이 성공적으로 수정되었습니다.",
        }).then(() => {
          navigate('/planet'); // navigate to /planet
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.naming_container}>
      <hr className={styles.divider} />

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
            <div className={styles.img} style={{ backgroundImage: `url(${currentPlanet.planetImage})` }}></div>
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
