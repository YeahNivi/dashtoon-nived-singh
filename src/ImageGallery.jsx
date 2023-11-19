import React from 'react';
import ComicPanel from './ComicPanel';

const ImageGallery = ({ images, titles }) => (
  <div className="p-4 flex flex-wrap justify-center">
    {images.map((imageUrl, index) => (
      <ComicPanel key={index} imageUrl={imageUrl} text={titles[index]} />
    ))}
  </div>
);

export default ImageGallery;
