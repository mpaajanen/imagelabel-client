import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateImage = (props) => {
    const navigate = useNavigate();
    const [image, setImage] = useState({
        link: '',
        labels: ['']
    });

    const onChange = (e) => {
        setImage({ ...image, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8082/api/images', image)
            .then((res) => {
                setImage({
                    link: '',
                    labels: ['']
                });
            navigate('/');
            })
        .catch((err) => {
            console.log('Error in CreateImage');
        });
    };

    return (
        <div>
            <Link to='/'>Takaisin kuvalistaan</Link>
            <div>
                Lisää kuva<br />
                <form noValidate onSubmit={onSubmit}>
                    <input
                        type='text'
                        placeholder='linkki'
                        name='link'
                        value={image.link}
                        onChange={onChange}
                    /><br />
                    <input
                        type='text'
                        placeholder='luokka'
                        name='labels'
                        value={image.labels}
                        onChange={onChange}
                    /><br />
                    <input type='submit' />
                </form>
            </div>
        </div>
    );
};

export default CreateImage;