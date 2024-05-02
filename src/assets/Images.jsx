import React from 'react'

const Images = ({images}) => {
    console.log(images)
  return (
    <div className='container'>
  {images.map((image, index) => (
          <div key={index}>
            <img src={`data:${image.contentType};base64,${arrayBufferToBase64(image.image.data)}`} alt={image.filename} style={{ maxWidth: '300px', maxHeight: '300px', margin: '10px' }} />
          </div>
        ))}
        </div>
  )
}

// Function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}


export default Images