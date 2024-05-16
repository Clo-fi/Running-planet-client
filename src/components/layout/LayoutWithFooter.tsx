import { Outlet } from "react-router-dom";
import Footer from "../common/footer/Footer";
import styles from "./LayoutWithFooter.module.scss"

const LayoutWithFooter = () => {

  return (
    <>
      <main className={styles.main_content}>
        <Outlet></Outlet>
      </main>
      <Footer />
    </>
  )
}

export default LayoutWithFooter;