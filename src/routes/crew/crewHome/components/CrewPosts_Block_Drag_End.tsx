import { useMemo, useState } from 'react';
import { PanInfo, useDragControls } from 'framer-motion';
import { motion } from "framer-motion";
import useMeasure from 'react-use-measure';

import styles from './CrewPosts.module.scss';
import PostList from './post/PostList';

const CrewPosts = ({ viewport = '100dvh' }: { viewport: string }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [contentRef, contentBounds] = useMeasure();
  const dragControls = useDragControls();

  const animateState = isOpened ? 'opened' : 'closed';

  const expandedHeight = useMemo(
    () => Math.min(contentBounds.height + 50, window.innerHeight - 50),
    [contentBounds.height]
  );

  const handleDragStart = () => {
    setIsAnimating(true);
  };


  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsAnimating(false);
    if (isOpened) return;

    const offsetThreshold = expandedHeight * 0.9;
    const deltaThreshold = 5;
    const isOverOffsetThreshold = Math.abs(info.offset.y) > offsetThreshold;
    const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;
    const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold;

    if (!isOverThreshold) return;

    const newIsOpened = info.offset.y < 0;
    setIsOpened(newIsOpened);
  };

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
        onTap={() => !isAnimating && setIsOpened(false)}
      />

      <motion.div className={styles.posts__sheet_background}
        initial='closed'
        animate={animateState}
        variants={{
          opened: { top: `calc(${viewport} - ${expandedHeight}px)` },
          closed: { top: `calc(${viewport} - 60px)` }
        }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
        drag='y'
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <div className={styles.posts__bottom_header} onPointerDown={(e) => dragControls.start(e)}>
          <div className={styles.posts__handle_bar} style={{ borderRadius: 100 }}></div>

          <div className={styles.posts__sheet_content_wrapper}
            style={{ height: 550 }}
            ref={contentRef}
          >
            <div className={styles.posts__sheet_content}>
              <PostList isOpened={isOpened} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default CrewPosts;

