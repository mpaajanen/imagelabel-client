import React from 'react';
import { Link } from 'react-router-dom';

const Imagelink = ({ image }) => {
    return (
        <div>
            <Link to={`/label-image/${image._id}`}>Image</Link>
        </div>
    );
};

export default Imagelink;