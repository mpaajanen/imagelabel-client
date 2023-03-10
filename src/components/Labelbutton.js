import { Button } from '@mui/material';
import React from 'react';

const Labelbutton = ({ label, data, status, handleLabelButton }) => {
    const buttonVariant = status ? 'contained' : 'outlined'
    return (
        <div>
            <Button
                size='large'
                variant={buttonVariant} 
                onClick={() => handleLabelButton(label, data)}
                sx={{
                    ':hover': {
                        bgcolor: 'red',
                        color: 'white'
                    },
                    width: '90%',
                    margin: '0.25em'
                }}
            >{label}</Button>
        </div>
    );
};

export default Labelbutton;