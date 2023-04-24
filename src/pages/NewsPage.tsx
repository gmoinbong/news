import React, { useState, useEffect } from 'react'
import { db, storage } from '../firebase/firebase'
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, orderBy, query } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSigninCheck } from 'reactfire'

import Signin from '../components/auth/Signin'
import EditNews from './EditNews'
import ImageUploader from '../components/utility/ImageUploader'

import style from '../styles/NewsPage.module.scss'

export interface NewsItem {
    id: string;
    text: string;
    timestamp: {
        seconds: number;
    };
    imageURL: string[];
    name: string[];
}

const NewsPage: React.FC = () => {
    useEffect(() => {
        getNews();
    }, []);

    const collectionRef = collection(db, 'news');

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedFilesURL, setSelectedFilesURL] = useState<string[]>([]);
    const [createNews, setCreateNews] = useState<string>('');
    const [news, setNews] = useState<NewsItem[]>([]);

    const { status, data: signInCheckResult } = useSigninCheck();

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
            setSelectedFiles([]);
            setSelectedFilesURL(['']);
            setCreateNews('');
            getNews();
        } catch (err) {
            console.log(err);
        }
    };
    const getNews = async () => {
        const q = query(collectionRef, orderBy('timestamp'));
        try {
            const newsDocs = await getDocs(q);
            const newsDataPromises = newsDocs.docs.map(async (doc) => {
                const data = doc.data() as NewsItem;
                if (data.imageURL) {
                    const imageURLPromises = data.imageURL.map(async (url) => {
                        return await getDownloadURL(ref(storage, url));
                    });
                    const imageURLs = await Promise.all(imageURLPromises);
                    return { ...data, id: doc.id, imageURL: imageURLs };
                } else {
                    return { ...data, id: doc.id };
                }
            });
            const newsData = await Promise.all(newsDataPromises);
            setNews(newsData);
        } catch (err) {
            console.log(err, 'error');
        }
    };

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

    if (status === "loading") {
        return <span>Зачекайте...</span>;
    }
    if (signInCheckResult.signedIn !== false && signInCheckResult.signedIn !== undefined) {
        return (
            <div className={style.container}>
                <Signin />
                {news.map(({ text, id, timestamp, imageURL, name }) => (
                    <div key={id}>
                        <div className={style.newsItem}>
                            {imageURL.map((url, index) => (
                                <img className={style.postImage} src={url} alt={name[index] + '1'} key={index} />
                            ))}
                            <p>{text}</p>
                            <p>{new Date(timestamp.seconds * 1000).toLocaleString()}</p>
                            <EditNews newsText={text} id={id} />
                        </div>
                        <button type="button" onClick={() => deleteNews(id)}>
                            Видалити
                        </button>
                    </div>
                ))}

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
    }
    return (<div className={style.container}>
        {news.map(({ text, id, timestamp, imageURL, name }) => (
            <div className={style.newsItem} key={id}>
                {imageURL.map((url, index) => (
                    <img className={style.postImage} src={url} alt={name[index] + '1'} key={index} />
                ))}
                <p>{text}</p>
                <p>{new Date(timestamp.seconds * 1000).toLocaleString()}</p>
            </div>
        ))}
        <Signin />
    </div>
    )

};

export default NewsPage;