import React from 'react';
import { Link } from 'react-router-dom';
import Imagelink from './Imagelink';

function Listimages({ user, images }) {

  const imageList =
    images.length === 0
      ? 'ei luokiteltavia kuvia..'
      : images.map((image, k) => <Imagelink image={image} key={k} />);

  if (!user) return (
    <div>
      Kirjaudu ensin sisään.
    </div>
  )

  return (
    <div>
        <Link to='/create-image'>Lisää kuvalinkki listaan</Link>
        <h2 className='display-4 text-center'>Luokiteltavat kuvat</h2>
        <div>{imageList}</div>
    </div>
  );
}

export default Listimages;