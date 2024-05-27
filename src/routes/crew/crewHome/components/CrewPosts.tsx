import { useMemo, useState } from 'react';
import { PanInfo, useDragControls } from 'framer-motion';
import { motion } from "framer-motion";
import useMeasure from 'react-use-measure';

import styles from './CrewPosts.module.scss';
import PostList from './post/PostList';
import { useNavigate, useParams } from 'react-router-dom';

const CrewPosts = ({ viewport = '100dvh' }: { viewport: string }) => {
  const { crewId } = useParams();
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  // 위에는 바텀시트 | 밑에는 토글 애니메이션
  const [isToggleClicked, setIsToggleClicked] = useState<boolean>(false);
  const [toggleEvent, setToggleEvent] = useState<boolean>(false);

  const onToggleClick = () => {
    if (!isToggleClicked) {
      setIsToggleClicked(!isToggleClicked);
      setTimeout(() => {
        setToggleEvent(!isToggleClicked);
      }, 300);
    }
    else if (isToggleClicked) {
      setToggleEvent(!isToggleClicked);
      setIsToggleClicked(!isToggleClicked);
    }
  }

  const [contentRef, contentBounds] = useMeasure();
  const dragControls = useDragControls();
  const animateState = isOpened ? 'opened' : 'closed';
  const expandedHeight = useMemo(
    () => Math.min(contentBounds.height + 50, window.innerHeight - 50),
    [contentBounds.height]
  );
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // if (isOpened) return;

    const offsetThreshold = expandedHeight;
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
      <motion.div
        className={styles.posts__background}
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

      <motion.div
        className={styles.posts__sheet_background}
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
      >
        <div className={styles.posts__bottom_header} onPointerDown={(e) => dragControls.start(e)}>
          <div className={styles.posts__handle_bar} style={{ borderRadius: 100 }}></div>
          <div className={styles.posts__sheet_content_wrapper} style={{ height: '100dvh' }} ref={contentRef}>
            <div className={styles.posts__sheet_content}>
              <div className={styles.posts_sheet_state}>
                <img src="/icons/circle_right.png" alt="return" onClick={() => setIsOpened(false)} />
                <p>현재 우리 크루는?</p>
              </div>
              <PostList isOpened={isOpened} />
              {/*  이 밑에는 토글 애니메이션 */}
              <div className={`${styles.list__action_toggle} ${isToggleClicked ? styles.clicked : ''}`} onClick={onToggleClick}>
                <img src="/icons/Add_round.png" alt="plusIcons" />
              </div>
              {isToggleClicked && (
                <div className={`${styles.list__write_toggle} ${styles.list__edit_move}`}>
                  <img src="/icons/Edit_white.png" alt="plusIcons" onClick={() => navigate(`/crew/${crewId}/board/write`)} />
                </div>
              )}
              {toggleEvent && (
                <div className={`${styles.list__chat_toggle} ${styles.list__send_move}`}>
                  <img src="/icons/Send.png" alt="plusIcons" />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )

}

export default CrewPosts;

