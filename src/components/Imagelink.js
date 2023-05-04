import React from 'react';
import { Link } from 'react-router-dom';

// const Imagelink = ({ image, previous, next }) => {
const Imagelink = ({ image }) => {
    // const prevImg = !previous ? '' : previous._id
    // const nextImg = !next ? '' : next._id
    return (
        <div>
            {/* <Link to={`/label-image/${image._id}`} state={{ prevImg, nextImg }}>{image.link}</Link> */}
            <Link to={`/label-image/${image._id}`}>{image.link}</Link> [{image.labels.toString()}]
        </div>
    );
};

export default Imagelink;