import { Button } from '@mui/material';
import React from 'react';

const Labelbutton = ({ label, data, status, handleLabelButton }) => {
    const buttonVariant = status ? 'contained' : 'outlined'
    const style = label.includes("vp-") || label.includes("m-")
    ? {
        ':hover': {
            bgcolor: 'red',
            color: 'white'
        },
        width: 'auto',
        minWidth: 'maxContent',
        margin: '0.25em'
    }
    : {
        ':hover': {
            bgcolor: 'red',
            color: 'white'
        },
        width: '100%',
        minWidth: 'maxContent',
        margin: '0.25em'
    }

    return (
        <Button
            size='small'
            variant={buttonVariant} 
            onClick={() => handleLabelButton(label, data)}
            sx={style}
        >
            {label.charAt(label.indexOf("-")+1).toUpperCase() + label.slice(label.indexOf("-")+2)}
        </Button>
    );
};

export default Labelbutton;