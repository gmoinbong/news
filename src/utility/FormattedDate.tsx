import React from 'react';
import { MdMoreTime } from "react-icons/md";
import style from '../pages/News/NewsPage.module.scss'
interface Props {
  timestamp: {
    seconds: number;
  };
}

const FormattedDate: React.FC<Props> = ({ timestamp }) => {
  const date = new Date(timestamp.seconds * 1000);
  const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
  const formattedDate = ` ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString()}`
  return (<div className={style.date}>
    <p>
      <time className={style.dateItem}>{formattedDate}</time>
      <time className={style.dateItem}>{formattedTime}</time>
      <MdMoreTime className={style.createdAt} />
    </p>
  </div >)
};

export default FormattedDate;
