import React, { useState, useEffect } from 'react'
import { db, storage } from '../../firebase/firebase'
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, orderBy, query } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSigninCheck } from 'reactfire'

import ImageUploader from '../../components/utility/ImageUploader'

import style from '../../styles/NewsPage.module.scss'
import NewsList from './NewsList';
import { deleteNews, getNews, NewsItem } from './api';

const NewsPage: React.FC = () => {
    const collectionRef = collection(db, 'news');

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedFilesURL, setSelectedFilesURL] = useState<string[]>([]);
    const [createNews, setCreateNews] = useState<string>('');
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        async function fetchNews() {
            const newsData = await getNews();
            setNews(newsData);
        }
        fetchNews();
    }, []);;

    const { status } = useSigninCheck();

    const handleFileSelect = (files: File[]) => {
        setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
    };

    const handleOnChangeSetNews = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCreateNews(e.target.value);

    const submitNews = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const imageURLs: string[] = [];
            const names: string[] = [];

            for (let i = 0; i < selectedFiles.length; i++) {
                const storageRef = ref(storage, `images/${selectedFiles[i].name}`);
                await uploadBytes(storageRef, selectedFiles[i]);
                const imageURL = await getDownloadURL(storageRef);
                imageURLs.push(imageURL);
                names.push(selectedFiles[i].name);
            }

            await addDoc(collectionRef, {
                text: createNews,
                timestamp: serverTimestamp(),
                imageURL: imageURLs,
                name: names
            });
            setCreateNews('');
            setSelectedFiles([]);
            setSelectedFilesURL(['']);
            getNews();
        } catch (err) {
            console.log(err);
        }
    };


    if (status === 'loading') {
        return <div>Завантаження...</div>;
    }

    return (
        <div className={style.container}>
            <NewsList deleteNews={deleteNews} news={news} />
            <form onSubmit={submitNews}>
                <textarea
                    className={style.formControl}
                    placeholder="Введіть текст.."
                    onChange={handleOnChangeSetNews} />
                <ImageUploader handleFileSelect={handleFileSelect} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
                <button>Створити новину</button>
            </form>
        </div>
    );


};

export default NewsPage;