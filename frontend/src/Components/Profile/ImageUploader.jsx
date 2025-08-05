import React, { useRef, useState } from 'react';

const ImageUpdateComponent = ({ label, currentImage, onUpdate, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(currentImage || '');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateClick = () => {
    if (selectedFile) {
      onUpdate(selectedFile); // send image to parent
    }
  };

  const handleCancelClick = () => {
    setSelectedFile(null);
    setPreview(currentImage || '');
    onCancel(); // notify parent
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg w-full max-w-md mx-auto border border-gray-700 shadow-md">
      <h3 className="text-white text-lg font-semibold mb-3">{label}</h3>

      <div className="flex flex-col items-center gap-3">
        <img
          src={preview}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-md border border-gray-500"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-white bg-gray-700 rounded-md px-3 py-2"
        />

        <div className="flex gap-4 mt-3">
          <button
            onClick={handleUpdateClick}
            disabled={!selectedFile}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Update
          </button>
          <button
            onClick={handleCancelClick}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpdateComponent;
 