import React from 'react';
import styles from './BackSpaceTopBar.module.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  isEditable?: boolean;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  titleOnClick?: React.MouseEventHandler<HTMLParagraphElement>;
}

const BackSpaceTopBar: React.FC<Props> = ({
  title,
  isEditable,
  onClick,
  titleOnClick,
}) => {
  const navigate = useNavigate();
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

  return (
    <div className={styles.top}>
      <img
        className={styles.backspace}
        src={isDarkMode ? '/icons/Expand_left_white.png' : '/icons/Expand_left.png'}
        alt='backSpaceImg'
        onClick={onClick ? onClick : () => navigate(-1)}
      />
      <p className={styles.title} onClick={titleOnClick}>{title}</p>
      {isEditable && (
        <img
          className={styles.edit}
          src={isDarkMode ? '/icons/Edit_white.png' : '/icons/Edit.png'}
          alt='editImg'
        />
      )}
    </div>
  );
}

export default BackSpaceTopBar;
