import React from 'react';
import ImageUploader from '../../utility/ImageUploader';
import { handleFileSelect, submitNews } from '../../utility/NewsApi';
import style from './NewsPage.module.scss';


export type NewsFormProps = {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  createNewsText: string;
  setCreateNewsText: React.Dispatch<React.SetStateAction<string>>;
  setSelectedFilesURL: React.Dispatch<React.SetStateAction<string[]>>;
  setCreateTitle: React.Dispatch<React.SetStateAction<string>>;
  createTitle: string;
};

const NewsForm: React.FC<NewsFormProps> = ({
  selectedFiles, setSelectedFiles,
  createNewsText, setCreateNewsText,
  setSelectedFilesURL, setCreateTitle, createTitle
}) => {
  const handleNewsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (createTitle.trim() === '' || createNewsText.trim() === '') {
      alert('Будь-ласка, заповніть заголовок та текст новини.');
      return;
    }
    e.preventDefault();
    submitNews(e, selectedFiles, setSelectedFiles, createNewsText,
      setCreateNewsText, setSelectedFilesURL,
      setCreateTitle, createTitle);
  };

  return (
    <form onSubmit={handleNewsSubmit}>
      <input type='text' value={createTitle}
        onChange={(e) => setCreateTitle(e.target.value)} />
      <textarea
        className={style.formControl}
        placeholder="Введіть текст.."
        value={createNewsText}
        onChange={(e) => setCreateNewsText(e.target.value)}
      />
      <ImageUploader
        handleFileSelect={(files: File[]) =>
          handleFileSelect(files, setSelectedFiles)}
        {...{ selectedFiles, setSelectedFiles }}
      />
      <button>Створити новину</button>
    </form>
  );
};

export default NewsForm;
