
import styles from './CrewHomePage.module.scss';
import CrewIntroduction from './components/CrewIntroduction';
import useMeasure from "react-use-measure";
import CrewPosts from './components/CrewPosts';
import { useParams } from 'react-router-dom';

const CrewHomePage = () => {
  const [viewportRef, { height: viewportHeight }] = useMeasure();
  const { crewId } = useParams();
  const parsedCrewId = crewId ? parseInt(crewId) : null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.crew__main_container} ref={viewportRef}>
        <CrewIntroduction crewId={parsedCrewId} />
        <CrewPosts viewport={`${viewportHeight}px`} />
      </div>
    </div>
  )
}

export default CrewHomePage
