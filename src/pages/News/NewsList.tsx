import React, { useState } from 'react';
import { useSigninCheck } from 'reactfire';
import EditNews from '../EditNews';
import style from './NewsPage.module.scss';
import { NewsItem } from '../../utility/NewsApi';
import FormattedDate from '../../utility/FormattedDate';
import NewsForm from './NewsForm';
import Gallery from '../../components/Gallery/Gallery';

interface Props {
  news: NewsItem[];
  deleteNews: (id: string) => Promise<void>;
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  createNewsText: string;
  setCreateNewsText: React.Dispatch<React.SetStateAction<string>>;
  setSelectedFilesURL: React.Dispatch<React.SetStateAction<string[]>>;
  setCreateTitle: React.Dispatch<React.SetStateAction<string>>;
  createTitle: string;
  onClick: () => void;
}

const NewsList: React.FC<Props> = (props) => {
  const [selectedImage, setSelectedImage] = useState(-1);
  const { data: signInCheckResult = { signedIn: false } } = useSigninCheck();

  const renderNewsGallery = (imageURL: string[], name: string[], index: number) => {
    if (imageURL.length === 1) {
      return (
        <img className={style.postImage} src={imageURL[0]} alt={name[0]} onClick={() => setSelectedImage(index)} />
      );
    } else if (imageURL.length > 1) {
      const galleryItems = imageURL.map((url, index) => ({
        url: url,
        alt: name[index],
        onClick: () => setSelectedImage(index * imageURL.length + index)
      }));
      return (
        <Gallery items={galleryItems} />
      );
    } else {
      return null;
    }
  };

  if (signInCheckResult && signInCheckResult.signedIn !== false && signInCheckResult.signedIn !== undefined) {
    return (
      <>
        {props.news.map(({ text, id, timestamp, imageURL, name, title }, index) => (
          <div className={style.newsItem} key={id}>
            <h3 className={style.title}>{title}</h3>
            {renderNewsGallery(imageURL, name, index)}
            <p className={style.text}>{text}</p>
            <FormattedDate timestamp={timestamp} />
            <EditNews newsText={text} id={id} />
            <button type="button" onClick={() => props.deleteNews(id)}>
              Видалити
            </button>
          </div>
        ))}

        <NewsForm {...props} />
        {selectedImage >= 0 && (
          <div className={style.fullImage} onClick={() => setSelectedImage(-1)}>
            <img className={style.postImage} src={props.news[selectedImage].imageURL[0]} alt={props.news[selectedImage].name[0]} />
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {props.news.map(({ text, id, timestamp, imageURL, name, title }, index) => (
          <div className={style.newsItem} key={id}>
            <h5>{title}</h5>
            {renderNewsGallery(imageURL, name, index)}
            <p>{text}</p>
            <FormattedDate timestamp={timestamp} />
          </div>
        ))}
        {selectedImage >= 0 && (
          <div className={style.fullImage} onClick={() => setSelectedImage(-1)}>
            <img className={style.postImage} src={props.news[selectedImage].imageURL[0]} alt={props.news[selectedImage].name[0]} />
          </div>
        )}
      </>
    );
  }
}
export default NewsList;
