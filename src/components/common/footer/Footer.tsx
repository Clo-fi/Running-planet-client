import styles from "./Footer.module.scss"
import { useNavigate } from "react-router-dom"

const Footer = () => {

  const navigate = useNavigate();

  const handleHomebtn = () => {
    navigate('/');
  };

  const handleCrewbtn = () => {
    navigate('/crew');
  };

  const handleTerrabtn = () => {
    navigate('/terra');
  };


  const handleRankbtn = () => {
    navigate('/rank');
  };

  const handleProfilebtn = () => {
    navigate('/profile');
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footer_terra}>
        <img className={styles.footer_earth} onClick={handleTerrabtn} src="/icons/world_2.png"></img>
        <img className={styles.footer_circle} src="/icons/Ellipse 151.png"></img>
      </div>
      <div className={styles.footer_grayzone}>
        <div className={styles.icon_container}>
          <img className={styles.footer_icon} onClick={handleHomebtn} src="/icons/Home.png"></img>
          <img className={styles.footer_icon} onClick={handleCrewbtn} src="/icons/Line_fill.png"></img>
          <div className={styles.footer_icon}></div>
          <img className={styles.footer_icon} onClick={handleRankbtn} src="/icons/Trophy.png"></img>
          <img className={styles.footer_icon} onClick={handleProfilebtn} src="/icons/User.png"></img>
        </div>
      </div>
    </div>
  )
}

export default Footer;