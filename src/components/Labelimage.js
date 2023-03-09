import React, { useState } from 'react'
import { Button } from '@mui/material'
import Labelbutton from './Labelbutton'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Labelimage = () => {
    const { id } = useParams()
    const labels = ['roots', 'grease', 'cracks']
    const queryClient = useQueryClient()

    const fetchImage = async () => {
        const response = await axios.get(`http://localhost:8082/api/images/${id}`)
        return response.data
    }

    const updateLabels = async (labels) => {
        const response = await axios.put(`http://localhost:8082/api/images/${id}`, labels)
        return response.data
    }

    const addOrRemove = (array, item) => {
        const exists = array.includes(item)
      
        if (exists) {
          return array.filter((c) => { return c !== item })
        } else {
          const result = array
          result.push(item)
          return result
        }
    }

    const { isError, isSuccess, isLoading, data, error } = useQuery(
        ['image'],
        fetchImage
    )

    const mutation = useMutation(updateLabels, {
        onSuccess: () => {
            queryClient.invalidateQueries('image')
        }
    })

    if(isLoading){
        console.log("Loading...")
        return <div>loading...</div>
    }

    const createButton = label => {
        return (
            <Labelbutton key={label} label={label} handleLabelButton={handleClick} />
        )
    }

    const handleClick = (label) => {
        const newLabels = addOrRemove(data.labels, label)
        mutation.mutate({
            labels: newLabels
        })
    }

    const handleTransfer = () => {

    }

    return (
        <div>
            <Link to='/'>Takaisin kuvalistaan</Link>
            <div>
                Kuva {id}
            </div>
            <div>
                {data.labels.toString()}
            </div>
            <div>
                <Button variant='outlined' onClick={() => handleTransfer("next")}>Next</Button>
                <Button variant='outlined' onClick={() => handleTransfer("previous")}>Previous</Button>
                {labels.map(label => createButton(label))}
            </div>
        </div>
    );
};

export default Labelimage;