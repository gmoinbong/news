import React, { useState, useEffect, ReactEventHandler } from 'react'
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, orderBy, query } from 'firebase/firestore'
import EditTodo from './EditNews'
import { db } from '../firebase/firebase'
import Signin from '../components/auth/Signin'

import style from '../styles/NewsPage.module.scss'
import ImageUploader from '../components/ImageUploader'

interface NewsItem {
    id: string;
    text: string;
    timestamp: {
        seconds: number;
    };
}

const NewsPage: React.FC = () => {
    const [createNews, setCreateNews] = useState<string>('');
    const [news, setNews] = useState<NewsItem[]>([]);

    const collectionRef = collection(db, 'news');

    useEffect(() => {
        const getNews = async () => {
            const q = query(collectionRef, orderBy('timestamp'));
            try {
                const newsDocs = await getDocs(q);
                const newsData = newsDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as NewsItem[];
                setNews(newsData);
            } catch (err) {
                console.log(err);
            }
        };
        getNews();
    }, []);

    const submitTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await addDoc(collectionRef, {
                text: createNews,
                timestamp: serverTimestamp()
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    console.log(news);

    const deleteNews = async (id: string) => {
        try {
            if (window.confirm('Are you sure you want to delete this News!')) {
                const documentRef = doc(db, 'news', id);
                await deleteDoc(documentRef);
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleOnChangeSetNews = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCreateNews(e.target.value);

    return (
        <>
            <ImageUploader />
            <div className="container">
                <Signin />
                {news.map(({ text, id, timestamp }) => (
                    <div key={id}>
                        <div className="news-item">
                            {text}
                        </div>
                        <p>{new Date(timestamp.seconds * 1000).toLocaleString()}</p>
                        <EditTodo news={text} id={id} />
                        <button type="button" onClick={() => deleteNews(id)}>
                            Видалити
                        </button>
                    </div>
                ))}
            </div>
            <form onSubmit={submitTodo}>
                <textarea
                    className={style.formControl}
                    placeholder="Введіть текст.."
                    onChange={handleOnChangeSetNews} />
                <button>Створити новину</button>
            </form>
        </>
    );
};

export default NewsPage;
