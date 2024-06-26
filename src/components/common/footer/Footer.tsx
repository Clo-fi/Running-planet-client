import { useUserStore } from '../../../stores/userStore';
import styles from "./Footer.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

  const handleHomebtn = () => {
    navigate('/home');
  };

  const handleCrewbtn = () => {
    if (user && user.myCrewId !== null) {
      navigate(`/crew/${user.myCrewId}`);
    } else {
      navigate('/crew');
    }
  };

  const handleTerrabtn = () => {
    navigate('/planet');
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
          <img
            className={styles.footer_icon}
            onClick={handleHomebtn}
            src={pathname.includes('/home')
              ? (isDarkMode ? '/icons/Home_mint.png' : '/icons/Home_white.png')
              : '/icons/Home.png'}
            alt="Home">
          </img>
          <img
            className={styles.footer_icon}
            onClick={handleCrewbtn}
            src={pathname.includes('/crew')
              ? (isDarkMode ? '/icons/Line_mint.png' : '/icons/Line_white.png')
              : '/icons/Line_fill.png'}>
          </img>
          <div className={styles.footer_icon}></div>
          <img
            className={styles.footer_icon}
            onClick={handleRankbtn}
            src={
              pathname.includes('/rank')
                ?
                (isDarkMode ? '/icons/Trophy_mint.png' : '/icons/Trophy_white.png')
                : '/icons/Trophy.png'
            }>
          </img>
          <img
            className={styles.footer_icon}
            onClick={handleProfilebtn}
            src={pathname.includes('/profile')
              ? (isDarkMode ? '/icons/User_mint.png' : '/icons/User_white.png')
              : '/icons/User.png'}>
          </img>
        </div>
      </div>
    </div>
  );
}

export default Footer;
