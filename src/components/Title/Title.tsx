import { FC, ReactNode } from 'react';

import styles from './style.module.css';

interface TitleProps {
  children: ReactNode;
}

const Title: FC<TitleProps> = ({ children }) => (
  <h2 className={styles.title}>{children}</h2>
);

export default Title;
