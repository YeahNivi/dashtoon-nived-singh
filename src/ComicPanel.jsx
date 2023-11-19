import React from 'react';

const ComicPanel = ({ imageUrl, text }) => (
  <div className="comic-panel relative p-2">
    {imageUrl && (
      <>
        <img src={imageUrl} alt="Comic Panel" className="generated-image" />
        <div className="text-annotation">{text}</div>
      </>
    )}
  </div>
);

export default ComicPanel;
