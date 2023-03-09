import { Button } from '@mui/material';
import React from 'react';

const Labelbutton = ({ label, data, handleLabelButton }) => {
    return (
        <div>
            <Button
                variant='outlined' 
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