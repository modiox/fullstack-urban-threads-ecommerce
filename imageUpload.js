import React, { useState } from 'react';
import { Storage } from 'aws-amplify';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState('');

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert('Please select an image to upload');
      return;
    }

    try {
      const result = await Storage.put(image.name, image, {
        contentType: image.type
      });

      const imageUrl = `https://${awsconfig.aws_user_files_s3_bucket}.s3.${awsconfig.aws_project_region}.amazonaws.com/${result.key}`;

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: productName, imageUrl })
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      alert('Product and image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={handleProductNameChange} required />
      </div>
      <div>
        <label>Upload Image:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
