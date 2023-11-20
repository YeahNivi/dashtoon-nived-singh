import React, { useState } from 'react';
import ImageGallery from './ImageGallery';
import TextInput from './TextInput';
import Button from './Button';

function Spinner() {
  return <div className="loader"></div>;
}

function App() {
  const [titles, setTitles] = useState(Array(10).fill(''));
  const [images, setImages] = useState(Array(10).fill(null));
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (value) => {
    setTitles((prevTitles) => {
      const newTitles = [...prevTitles];
      newTitles[currentInputIndex] = value;
      return newTitles;
    });
    setError(null); // Clear any previous errors when input changes
  };

  const handleDelete = () => {
    if (currentInputIndex > 0) {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages.pop(); // Remove the latest image
        return newImages;
      });
  
      setTitles((prevTitles) => {
        const newTitles = [...prevTitles];
        newTitles.pop(); // Remove the latest title
        return newTitles;
      });
  
      setLoadedImages((prevLoadedImages) => {
        const newLoadedImages = [...prevLoadedImages];
        newLoadedImages.pop(); // Remove the latest loaded image
        return newLoadedImages;
      });
  
      setCurrentInputIndex((prevIndex) => Math.max(0, prevIndex - 1)); // Decrement current input index
      setError(null); // Clear any previous errors when deleting
    }
  };

  async function query(data, index) {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          headers: {
            "Accept": "image/png",
            "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch image for input ${index}`);
      }

      const result = await response.blob();
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = URL.createObjectURL(result);
        return newImages;
      });
      setCurrentInputIndex((prevIndex) => prevIndex + 1);
      setError(null); // Clear any previous errors on successful API call
    } catch (error) {
      console.error(error.message);
      setError('Failed to fetch image. Please try again.'); // Set error message for user feedback
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = () => {
    if (currentInputIndex < 10) {
      query({ "inputs": titles[currentInputIndex] }, currentInputIndex);
    } else {
      // Prompt user to reset images after the 10th input
      const resetConfirmation = window.confirm('You have reached the limit of 10 images. Do you want to reset the images?');
      if (resetConfirmation) {
        setTitles(Array(10).fill(''));
        setImages(Array(10).fill(null));
        setCurrentInputIndex(0);
        setError(null); // Clear any previous errors on reset
      }
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 flex flex-col justify-center items-center overflow-y-auto'>
    <h1 className='text-4xl font-extrabold text-white mb-4'>Comic Generator</h1>
    <p className='text-white text-lg mb-8'>Create up to 10 fun comic panels with AI</p>
    <ImageGallery images={images} titles={titles} />
    <div className='p-4'>
      <TextInput
        value={titles[currentInputIndex]}
        onChange={handleChange}
        placeholder={`Enter text ${currentInputIndex + 1}`}
      />
    </div>
    <div className='p-4 flex flex-col items-center'>
      <div className="flex">
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Submit'}
        </Button>
        {currentInputIndex > 0 && (
          <Button onClick={handleDelete} className="ml-2">
            Delete Latest
          </Button>
        )}
        {currentInputIndex >= 10 && (
          <Button onClick={handleReset} className="ml-2">
            Reset
          </Button>
        )}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  </div>
  );
}

export default App;
