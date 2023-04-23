import React, { useState, useEffect } from 'react'
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, orderBy, query } from 'firebase/firestore'
import { app, db, } from '../firebase/firebase'
import EditTodo from './EditNews'
import Signin from '../components/auth/Signin'

import style from '../styles/NewsPage.module.scss'
import ImageUploader from '../components/utility/ImageUploader'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useSigninCheck } from 'reactfire'

interface NewsItem {
    id: string;
    text: string;
    timestamp: {
        seconds: number;
    };
    imageURL: string;
    name: string;
}
const storage = getStorage(app);


const NewsPage: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedFilesURL, setSelectedFilesURL] = useState<string[]>([]);
    const [createNews, setCreateNews] = useState<string>('');
    const [news, setNews] = useState<NewsItem[]>([]);

    const { status, data: signInCheckResult } = useSigninCheck();

    const handleFileSelect = (files: File[]) => {
        setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
    };


    const collectionRef = collection(db, 'news');
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
            setSelectedFilesURL([]);
            setCreateNews('');
        } catch (err) {
            console.log(err);
        }
    };


    console.log(news);
    useEffect(() => {
        const getNews = async () => {
            const q = query(collectionRef, orderBy('timestamp'));
            try {
                const newsDocs = await getDocs(q);
                const newsData = newsDocs.docs.map(async (doc) => {
                    const data = doc.data() as NewsItem;
                    if (data.imageURL) {
                        const imageURL = await getDownloadURL(ref(storage, data.imageURL));
                        console.log(imageURL, 'ссылка');
                        return { ...data, id: doc.id, imageURL };
                    } else {
                        return { ...data, id: doc.id };
                    }
                });
                const newsArray = await Promise.all(newsData);
                setNews(newsArray);
            } catch (err) {
                console.log(err);
            }
        };
        getNews();
    }, []);

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
    if (signInCheckResult.signedIn !== false || undefined) {
        return (
            <div className={style.container}>
                <Signin />
                {news.map(({ text, id, timestamp, imageURL, name }) => (
                    <div key={id}>
                        <div className={style.newsItem}>
                            {imageURL && (<img src={imageURL} alt={name} />)}
                            <p>{text}</p>
                        </div>
                        <p>{new Date(timestamp.seconds * 1000).toLocaleString()}</p>
                        <EditTodo news={text} id={id} />
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
                    <ImageUploader handleFileSelect={handleFileSelect} />
                    <button>Створити новину</button>
                </form>
            </div>
        );
    }
    return (<div className={style.container}>
        {news.map(({ text, id, timestamp, imageURL, name }) => (
            <div className={style.newsItem} key={id}>
                {imageURL && (<img className={style.postImage} src={imageURL} alt={name} />)}
                <p>{text}</p>
                {text && <p>{new Date(timestamp.seconds * 1000).toLocaleString()}</p>}
            </div>
        ))}
        <Signin />
    </div>
    )

};

export default NewsPage;
