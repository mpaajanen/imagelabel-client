import { Button } from '@mui/material';
import React from 'react';

const Labelbutton = ({ label, data, status, handleLabelButton }) => {
    const buttonVariant = status ? 'contained' : 'outlined'
    return (
        <div>
            <Button
                variant={buttonVariant} 
                onClick={() => handleLabelButton(label, data)}
                sx={{
                    ':hover': {
                        bgcolor: 'red',
                        color: 'white'
                    }
                }}
            >{label}</Button>
        </div>
    );
};

export default Labelbutton;