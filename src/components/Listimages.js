import React from 'react';
import { Link } from 'react-router-dom';
import Imagelink from './Imagelink';

function Listimages({ user, images }) {

  const imageList =
    images.length === 0
      ? 'no images!'
      : images.map((image, k) => <Imagelink image={image} key={k} />);
      // : images.map((image, k, images) => <Imagelink image={image} previous={images[k-1]} next={images[k+1]} key={k} />);

  if (!user) return (
    <div>
      Kirjaudu ensin sisään.
    </div>
  )

  return (
    <div>
        {/* <h2 className='display-4 text-center'>Images</h2>
        <Link to='/create-image'>Lisää kuva</Link> */}
        <div>{imageList}</div>
    </div>
  );
}

export default Listimages;