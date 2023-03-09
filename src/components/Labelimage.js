import React, { useState } from 'react'
import { Button } from '@mui/material'
import Labelbutton from './Labelbutton'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Labelimage = () => {
    const { id } = useParams()
    const labels = ['roots', 'grease', 'cracks']
    const labelObject = {
            roots: false,
            grease: false,
            cracks: false
        }

    const [imageLabels, setImageLabels] = useState(labelObject)

    const fetchImage = async () => {
        const response = await axios.get(`http://localhost:8082/api/images/${id}`)
        const image = response.data
        setImageLabels(image.labels)
        return image
    }

    // const updateImage = async (data) => {
    //     console.log(data)
    //     const updatedImage = { ...data, labels: ['roots']}
    //     const response = await axios.put(`http://localhost:8082/api/images/${id}`, updatedImage)
    //     return response.data
    // }

    const { isError, isSuccess, isLoading, data, error } = useQuery(
        ["image"],
        fetchImage,
        { staleTime: 60000 }
    )

    if(isLoading){
        console.log("Loading...")
        return <div>loading...</div>
    }

    // if(isSuccess) {
    //     setImageLabels(data.labels)
    // }

    // const showLabels = () => {
    //     if(isLoading) return "loading..."
    //     else {
    //         const labels = data.labels
    //         return labels.toString()
    //     }
    // }

    const createButton = label => {
        return (
            <Labelbutton key={label} label={label} handleLabelButton={handleClick} />
        )
    }

    const handleClick = (label) => {
        const updatedLabels = imageLabels
        updatedLabels[label] = !updatedLabels[label]
        setImageLabels(labels => ({
            ...labels,
            ...updatedLabels 
        }))
    }

    // console.log("Rendering...")

    return (
        <div>
            <Link to='/'>Takaisin kuvalistaan</Link>
            <div>
                Kuva {id}
            </div>
            <div>
                {/* {data._id} */}
                {/* {showLabels()} */}
                {Object.entries(imageLabels).toString()}
            </div>
            <div>
                <Button variant='outlined' onClick={() => handleClick("previous")}>Previous</Button>
                <Button variant='outlined' onClick={() => handleClick("next")}>Next</Button>
                {labels.map(label => createButton(label, data))}
            </div>
        </div>
    );
};

export default Labelimage;