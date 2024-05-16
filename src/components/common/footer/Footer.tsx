import styles from "./Footer.module.scss"
import { useNavigate } from "react-router-dom"

const Footer = () => {

  const navigate = useNavigate();

  const handleHomebtn = () => {
    navigate('/home');
  };

  const handleCrewbtn = () => {
    navigate('/crew-search');
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
        <img className={styles.footer_earth} onClick={handleTerrabtn} src="/src/assets/icons/world_2.png"></img>
        <img className={styles.footer_circle} src="/src/assets/icons/Ellipse 151.png"></img>
      </div>
      <div className={styles.footer_grayzone}>
        <div className={styles.icon_container}>
          <img className={styles.footer_icon} onClick={handleHomebtn} src="/src/assets/icons/Home.png"></img>
          <img className={styles.footer_icon} onClick={handleCrewbtn} src="/src/assets/icons/Line_fill.png"></img>
          <div className={styles.footer_icon}></div>
          <img className={styles.footer_icon} onClick={handleRankbtn} src="/src/assets/icons/Trophy.png"></img>
          <img className={styles.footer_icon} onClick={handleProfilebtn} src="/src/assets/icons/User.png"></img>
        </div>
      </div>
    </div>
  )
}

export default Footer;