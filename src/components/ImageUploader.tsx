import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebase";

type ImageType = {
  url: string;
  name: string;
};

const ImageUploader = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploading(true);
      const promises: Promise<ImageType>[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(getStorage(app), `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        const promise = new Promise<ImageType>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => reject(error),
            async () => {
              const url = await getDownloadURL(storageRef);
              resolve({ url, name: file.name });
            }
          );
        });
        promises.push(promise);
      }
      try {
        const uploadedImages = await Promise.all(promises);
        setImages([...images, ...uploadedImages]);
        setUploading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const db = getFirestore(app);
      const imagesRef = collection(db, "images");
      const promises = images.map(({ url, name }) =>
        addDoc(imagesRef, { url, name })
      );
      await Promise.all(promises);
      setImages([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleUpload} />
      {uploading && <p>Загрузка...</p>}
      {images.map((image) => (
        <img key={image.name} src={image.url} alt={image.name} />
      ))}
      {images.length > 0 && <button onClick={handleSubmit}>Сохранить</button>}
    </div>
  );
};

export default ImageUploader;
