import React, { useState } from 'react'
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage'

interface ImageUploaderProps {
  handleFileSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ handleFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const storage = getStorage();

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const storageRef = ref(storage, `images/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const imageURL = await getDownloadURL(storageRef);
      console.log(imageURL);
      setPreview('');
      setSelectedFile(null);
    }
  };

  return (
    <div>
      {preview && <img src={preview} alt="Preview" />}
      <input type="file" accept="image/*" onChange={handleFileInput} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;
