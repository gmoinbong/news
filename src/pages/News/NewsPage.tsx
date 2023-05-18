import React, { useState, useEffect, lazy, Suspense } from 'react';
import { deleteNews, getNews, NewsItem } from '../../utility/NewsApi';


import Pagination from '../../utility/Pagination/Pagination';
import NotificationLoader from '../../components/NotificationLoader';
import { useSigninCheck } from 'reactfire';

import style from './NewsPage.module.scss';
import '../../styles/fonts/font.css';

const NewsList = lazy(() => import('./NewsList'))

const NewsPage: React.FC = () => {
    const { status } = useSigninCheck();

    const [createTitle, setCreateTitle] = useState<string>('')
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedFilesURL, setSelectedFilesURL] = useState<string[]>([]);
    const [createNewsText, setCreateNewsText] = useState<string>('');
    const [news, setNews] = useState<NewsItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1)


    const itemsPerPage = 4

    const handleClickNews = () => {
        setCurrentPage(1)
    }


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const fetchNews = async () => {
            const newsData = await getNews();
            setNews(newsData);
        };
        fetchNews();
    }, []);

    return (
        <div className={style.container}>
            {status === "loading" ? (
                <div className={style.newsItem}>
                    <NotificationLoader />
                    <NotificationLoader />
                </div>
            ) : (
                <>
                    <Suspense> <NewsList {...{
                        createNewsText, createTitle, selectedFiles, deleteNews,
                        setCreateNewsText, setCreateTitle, setSelectedFiles, setSelectedFilesURL
                    }}
                        news={currentNews} onClick={handleClickNews} />
                    </Suspense>
                    <Pagination{...{
                        itemsPerPage, currentPage, setCurrentPage
                    }}
                        className={style.pagination} itemCount={news.length} onChangePage={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};


export default NewsPage;
