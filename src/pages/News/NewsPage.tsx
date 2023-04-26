import React, { useState, useEffect } from 'react';
import { useSigninCheck } from 'reactfire';
import { deleteNews, getNews, NewsItem } from '../../utility/NewsApi';
import NewsList from './NewsList';
import style from '../../styles/NewsPage.module.scss';
import Signin from '../../components/auth/Signin';

const NewsPage: React.FC = () => {
    const { status, data: signInCheckResult } = useSigninCheck();

    const [createTitle, setCreateTitle] = useState<string>('')
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedFilesURL, setSelectedFilesURL] = useState<string[]>([]);
    const [createNewsText, setCreateNewsText] = useState<string>('');
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            const newsData = await getNews();
            setNews(newsData);
            console.log(news);
        };
        fetchNews();
    }, []);

    if (status === "loading") {
        return <div>Завантаження</div>
    }

    if (signInCheckResult.signedIn !== false && signInCheckResult.signedIn !== undefined) {
        return (
            <div className={style.container}>
                <Signin />
                <NewsList {...{
                    createNewsText, createTitle, selectedFiles, deleteNews,
                    news, setCreateNewsText, setCreateTitle, setSelectedFiles, setSelectedFilesURL
                }} />
            </div>
        );
    }

    return (
        <div className={style.container}>
            <Signin />
            <NewsList {...{
                createNewsText, createTitle, selectedFiles, deleteNews,
                news, setCreateNewsText, setCreateTitle, setSelectedFiles, setSelectedFilesURL
            }} />
        </div>
    );
};

export default NewsPage;
