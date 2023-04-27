import React, { useState } from 'react';
import style from '../styles/Gallery.module.scss';

interface GalleryItemProps {
  url: string;
  alt?: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ url, alt = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={style.galleryItem} onClick={toggleExpanded}>
      <img src={url} alt={alt} className={style.thumbnail} />
      {isExpanded && (
        <div className={style.overlay} onClick={toggleExpanded}>
          <img src={url} alt={alt} className={style.fullImage} />
        </div>
      )}
    </div>
  );
};

interface GalleryProps {
  items: { url: string; alt?: string }[];
}

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  return (
    <div className={style.gallery}>
      {items.map((item, index) => (
        <GalleryItem key={index} url={item.url} alt={item.alt} />
      ))}
    </div>
  );
};

export default Gallery;
