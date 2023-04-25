import React, { useState, useEffect } from 'react';
import { useSigninCheck } from 'reactfire';
import ImageUploader from '../../components/utility/ImageUploader';
import { deleteNews, getNews, NewsItem, submitNews, handleFileSelect } from '../../components/utility/NewsApi';
import NewsList from './NewsList';
import style from '../../styles/NewsPage.module.scss';

const NewsPage: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedFilesURL, setSelectedFilesURL] = useState<string[]>([]);
    const [createNews, setCreateNews] = useState<string>('');
    const [news, setNews] = useState<NewsItem[]>([]);
    const { status } = useSigninCheck();

    useEffect(() => {
        const fetchNews = async () => {
            const newsData = await getNews();
            setNews(newsData);
        };
        fetchNews();
    }, []);

    const handleNewsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitNews(e, selectedFiles, createNews, setSelectedFiles, setCreateNews, setSelectedFilesURL);
    };
    if (status === "loading") {
        return <div>Завантаження</div>
    }
    return (
        <div className={style.container}>
            <NewsList deleteNews={deleteNews} news={news} />
            <form onSubmit={handleNewsSubmit}>
                <textarea
                    className={style.formControl}
                    placeholder="Введіть текст.."
                    value={createNews}
                    onChange={(e) => setCreateNews(e.target.value)}
                />
                <ImageUploader
                    handleFileSelect={(files: File[]) => handleFileSelect(files, setSelectedFiles)}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles} />
                <button>Створити новину</button>
            </form>
        </div>
    );
};

export default NewsPage;
