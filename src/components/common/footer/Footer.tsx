import styles from "./Footer.module.scss"
import { useLocation, useNavigate } from "react-router-dom"

const Footer = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

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
          <img className={styles.footer_icon} onClick={handleHomebtn} src={pathname.includes('/home') ? '/icons/Home_white.png' : '/icons/Home.png'} alt="Home"></img>
          <img className={styles.footer_icon} onClick={handleCrewbtn} src={pathname.includes('/crew') ? '/icons/Line_white.png' : '/icons/Line_fill.png'}></img>
          <div className={styles.footer_icon}></div>
          <img className={styles.footer_icon} onClick={handleRankbtn} src="/icons/Trophy.png"></img>
          <img className={styles.footer_icon} onClick={handleProfilebtn} src={pathname.includes('/profile') ? '/icons/User_white.png' : '/icons/User.png'}></img>
        </div>
      </div>
    </div>
  )
}

export default Footer;