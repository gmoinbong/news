import React from 'react'
import { useSigninCheck } from 'reactfire'
import EditNews from '../EditNews'

import style from '../../styles/NewsPage.module.scss'
import { NewsItem } from '../../utility/NewsApi';
import FormattedDate from '../../utility/FormattedDate';
import NewsForm from './NewsForm';

interface Props {
  news: NewsItem[];
  deleteNews: (id: string) => Promise<void>
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  createNewsText: string;
  setCreateNewsText: React.Dispatch<React.SetStateAction<string>>;
  setSelectedFilesURL: React.Dispatch<React.SetStateAction<string[]>>;
  setCreateTitle: React.Dispatch<React.SetStateAction<string>>;
  createTitle: string;
}

const NewsList: React.FC<Props> = (props) => {
  const { data: signInCheckResult } = useSigninCheck();


  if (signInCheckResult.signedIn !== false && signInCheckResult.signedIn !== undefined)

    return (
      <>
        {props.news.map(({ text, id, timestamp, imageURL, name, title }) => (

          <div className={style.newsItem} key={id}>
            <h5>{title}</h5>
            {imageURL.map((url, index) => (
              <img className={style.postImage}
                src={url} alt={name[index] + '1'} key={index} />
            ))}
            <p>{text}</p>
            <FormattedDate timestamp={timestamp} />
            <EditNews newsText={text} id={id} />
            <button type="button" onClick={() => props.deleteNews(id)}>
              Видалити
            </button>
          </div>
        ))}
        <NewsForm {...props}
        />
      </>
    )
  return <>
    {props.news.map(({ text, id, timestamp, imageURL, name, title }) => (
      <div className={style.newsItem} key={id}>
        <h5>{title}</h5>
        {imageURL.map((url, index) => (
          <img className={style.postImage}
            src={url} alt={name[index] + '1'} key={index} />
        ))}
        <p>{text}</p>
        <FormattedDate timestamp={timestamp} />
      </div>
    ))}</>

}
export default NewsList
