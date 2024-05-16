import { useMemo, useState } from 'react';
import { useDragControls } from 'framer-motion';
import { motion } from "framer-motion"
import useMeasure from 'react-use-measure';

import styles from './CrewPosts.module.scss'

const CrewPosts = ({ viewport = '100dvh' }: { viewport: string }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [contentRef, contentBounds] = useMeasure();
  const dragControls = useDragControls()

  const animateState = isOpened ? 'opened' : 'closed';

  const expandedHeight = useMemo(
    () => Math.min(contentBounds.height + 50, window.innerHeight - 50),
    [contentBounds.height]
  );

  return (
    <>
      <motion.div className={styles.posts__background}
        initial={false}
        animate={animateState}
        variants={{
          opened: {
            backdropFilter: 'blur(1px)',
            pointerEvents: 'all',
            opacity: 0.7
          },
          closed: {
            backdropFilter: 'blur(0px)',
            pointerEvents: 'none',
            opacity: 0,
          }
        }}
        onTap={() => setIsOpened(false)}
      />

      <motion.div className={styles.posts__sheet_background}
        initial='closed'
        animate={animateState}
        variants={{
          opened: { top: `calc(${viewport} - ${expandedHeight}px)` },
          closed: { top: `calc(${viewport} - 60px)` }
        }}
        transition={{ type: 'spring', bounce: 0.4, duration: 1 }}
        drag='y'
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          // y가 음수이면 위로, 양수이면 아래로
          const offsetThreshold = 150;
          const deltaThreshold = 5;

          const isOverOffsetThreshold = Math.abs(info.offset.y) > offsetThreshold;
          const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;

          const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;

          if (!isOverThreshold) return;

          const newIsOpened = info.offset.y < 0;

          setIsOpened(newIsOpened);
        }}
      >
        <div className={styles.posts__bottom_header} onPointerDown={(e) => dragControls.start(e)}>
          <div className={styles.posts__handle_bar} style={{ borderRadius: 100 }}></div>

          <div className={styles.posts__sheet_content_wrapper}
            style={{ height: 500 }}
            ref={contentRef}
          >
            <div className={styles.posts__sheet_content}>
              dsaadsads
            </div>
          </div>
        </div>
      </motion.div>


    </>
  )
}

export default CrewPosts