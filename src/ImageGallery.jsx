import React, { useState } from 'react';

function ImageGallery({ images }) {
  const [loadedImages, setLoadedImages] = useState([]);

  const handleImageLoad = (index) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
  };

  return (
    <div className='grid grid-cols-5 gap-4 p-4 bg-gray-800 rounded-md'>
      {images.map((image, index) => (
        <div key={index} className={`col-span-1 flex items-center justify-center p-4 border border-gray-700 rounded-md ${loadedImages.includes(index) ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={image}
            alt={`Generated Comic ${index + 1}`}
            className='rounded-lg max-w-full max-h-full'
            onLoad={() => handleImageLoad(index)}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;


