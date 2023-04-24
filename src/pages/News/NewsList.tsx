import React from 'react'
import { useSigninCheck } from 'reactfire'
import EditNews from '../EditNews'

import style from '../../styles/NewsPage.module.scss'
import { NewsItem } from './api';

interface Props {
  news: NewsItem[];
  deleteNews: (id: string) => Promise<void>
}

const NewsList: React.FC<Props> = ({ news, deleteNews }) => {
  const { data: signInCheckResult } = useSigninCheck();


  if (signInCheckResult.signedIn !== false && signInCheckResult.signedIn !== undefined)
    return (
      <>
        {news.map(({ text, id, timestamp, imageURL, name }) => (
          <div className={style.newsItem} key={id}>
            {imageURL.map((url, index) => (
              <img className={style.postImage} src={url} alt={name[index] + '1'} key={index} />
            ))}
            <p>{text}</p>
            <p>{new Date(timestamp.seconds * 1000).toLocaleString()}</p>
            <EditNews newsText={text} id={id} />
            <button type="button" onClick={() => deleteNews(id)}>
              Видалити
            </button>
          </div>
        ))}
      </>
    )
  return <>
    {news.map(({ text, id, timestamp, imageURL, name }) => (
      <div key={id}>
        <div className={style.newsItem}>
          {imageURL.map((url, index) => (
            <img className={style.postImage} src={url} alt={name[index] + '1'} key={index} />
          ))}
          <p>{text}</p>
          <p>{new Date(timestamp.seconds * 1000).toLocaleString()}</p>
        </div>
      </div>))}</>

}
export default NewsList
