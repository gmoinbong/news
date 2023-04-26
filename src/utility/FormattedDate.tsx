import React from 'react';

interface Props {
  timestamp: {
    seconds: number;
  };
}

const FormattedDate: React.FC<Props> = ({ timestamp }) => {
  const date = new Date(timestamp.seconds * 1000);
  const formattedDate = `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString()}`;

  return <time>{formattedDate}</time>;
};

export default FormattedDate;
