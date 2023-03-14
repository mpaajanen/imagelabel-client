import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Imagelink from './Imagelink';

function Listimages({ user }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      // .get('http://localhost:8082/api/images')
      .get('/api/images')
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.log('Error from Listimages');
      });
  }, []);

  const imageList =
    images.length === 0
      ? 'no images!'
      : images.map((image, k) => <Imagelink image={image} key={k} />);

  if (!user) return (
    <div>
      Kirjaudu ensin sisään.
    </div>
  )

  return (
    <div>
        <h2 className='display-4 text-center'>Images</h2>
        <Link to='/create-image'>Lisää kuva</Link>
        <div>{imageList}</div>
    </div>
  );
}

export default Listimages;