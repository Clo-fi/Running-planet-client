import { Outlet } from "react-router-dom";
import Onboarding from "../common/onboarding/Onboarding";
import styles from "./OnborardingLayout.module.scss";

const OnBoardingLayout = () => {

  return (
    <>
      <Onboarding />
      <main className={styles.main_content}>
        <Outlet></Outlet>
      </main>
    </>
  )
}

export default OnBoardingLayout;