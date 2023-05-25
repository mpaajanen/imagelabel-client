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
        const loggedLabeller = window.localStorage.getItem('loggedLabeller')
        const token = JSON.parse(loggedLabeller).token
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }

        axios
            .post('/api/images', {images: [image]}, config)
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
                Lisää kuva syöttämällä kuvan nimi ja mahdollinen luokka.<br />
                <form noValidate onSubmit={onSubmit}>
                    <input
                        type='text'
                        placeholder='kuvan nimi'
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