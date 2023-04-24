// api.ts
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase'

export interface NewsItem {
  id: string;
  text: string;
  timestamp: {
    seconds: number;
  };
  imageURL: string[];
  name: string[];
}

export const deleteNews = async (id: string) => {
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

export const getNews = async (): Promise<NewsItem[]> => {
  const collectionRef = collection(db, 'news');
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
    return newsData;
  } catch (err) {
    console.log(err, 'error');
    return [];
  }
};