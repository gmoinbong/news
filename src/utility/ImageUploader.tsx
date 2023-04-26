import React, { useCallback } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

interface ImageUploaderProps {
  handleFileSelect: (files: File[]) => void;
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  handleFileSelect,
  selectedFiles,
  setSelectedFiles,
}) => {

  const handleSelectedFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files);
        handleFileSelect(filesArray);
      }
    },
    [handleFileSelect]
  );

  const handleRemoveSelectedFile = useCallback(
    (name: string) => {
      setSelectedFiles((prevSelectedFiles) =>
        prevSelectedFiles.filter((file: File) => file.name !== name)
      );
    },
    [setSelectedFiles]
  );

  return (
    <div>
      <label htmlFor="fileUploader" className="btn">
        <AiOutlineUpload />
      </label>
      <input
        type="file"
        id="fileUploader"
        multiple
        accept="image/*"
        onChange={handleSelectedFiles}
        style={{ display: 'none' }}
      />
      <div className="selectedFiles">
        {selectedFiles.map((file, index) => (
          <div className="selectedFile" key={file.name + index}>
            <p>{file.name}</p>
            <FaTimes onClick={() => handleRemoveSelectedFile(file.name)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
