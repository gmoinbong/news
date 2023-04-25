import { uploadBytes } from 'firebase/storage';
// api.ts
import { collection, getDocs, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';
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

const clearForm = (
  setCreateNews: React.Dispatch<React.SetStateAction<string>>,
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>,
  setSelectedFilesURL: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setCreateNews("");
  setSelectedFiles([]);
  setSelectedFilesURL([""]);
};

export const handleFileSelect = (files: File[], setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>) => {
  setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
};

export const handleOnChangeSetNews = (e: React.ChangeEvent<HTMLTextAreaElement>,
  setCreateNews: React.Dispatch<React.SetStateAction<string>>) => setCreateNews(e.target.value);

export const submitNews = async (e: React.FormEvent<HTMLFormElement>,
  selectedFiles: File[], createNews: string, setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>,
  setCreateNews: React.Dispatch<React.SetStateAction<string>>, setSelectedFilesURL: React.Dispatch<React.SetStateAction<string[]>>) => {
  e.preventDefault();
  try {
    const collectionRef = collection(db, 'news');
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
    clearForm(setCreateNews, setSelectedFiles, setSelectedFilesURL);
    getNews();
  } catch (err) {
    console.log(err);
  }
};