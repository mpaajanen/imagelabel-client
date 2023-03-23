import React, { useState } from 'react'
import { Button } from '@mui/material'
import Labelbutton from './Labelbutton'
import { useParams, useLocation } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Labelimage = ({ images }) => {
    const { id } = useParams()
    const path = '/images'
    const labels = ['roots', 'grease', 'cracks']
    const queryClient = useQueryClient()

    const prevImg = images.map((image, i, images) => image._id === id ? images[i-1] : undefined).filter(result => result !== undefined)
    const nextImg = images.map((image, i, images) => image._id === id ? images[i+1] : undefined).filter(result => result !== undefined)

    const fetchImage = async () => {
        // const response = await axios.get(`/api/images/${id}`)
        const response = await axios.get(`http://localhost:8082/api/images/${id}`)
        return response.data
    }

    const updateLabels = async (labels) => {
        const loggedLabeller = window.localStorage.getItem('loggedLabeller')
        const token = JSON.parse(loggedLabeller).token
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        // const response = await axios.put(`/api/images/${id}`, labels, config)
        const response = await axios.put(`http://localhost:8082/api/images/${id}`, labels, config)
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
        const status = data.labels.includes(label)
        return (
            <Labelbutton key={label} label={label} status={status} handleLabelButton={handleClick} />
        )
    }

    const handleClick = (label) => {
        const newLabels = addOrRemove(data.labels, label)
        mutation.mutate({
            labels: newLabels
        })
    }

    const prevBtn = () => {
        return prevImg.length > 0
        ? <Button href={`/label-image/${prevImg[0]._id}`} variant='outlined'>Edellinen</Button>
        : <span>...</span>
    }

    const nextBtn = () => {
        return nextImg.length > 0
        ? <Button href={`/label-image/${nextImg[0]._id}`} variant='outlined'>Seuraava</Button>
        : <span>...</span>
    }

    return (
        <div>
            <Link to='/'>Takaisin kuvalistaan</Link>
            <div>Kuva {id} {data.link}</div>
            <div>{data.labels.toString()}</div>
            <div>{prevImg.length > 0 ? prevImg[0]._id : ''} | {nextImg.length > 0 ? nextImg[0]._id : ''}</div>
            <div>
                {prevBtn()}
                {nextBtn()}
            </div>
            <div style={{display: 'flex'}}>
                <span>{labels.map(label => createButton(label))}</span>
                <span><img src={`${path}/${data.link}.png`} /></span>
            </div>
        </div>
    );
};

export default Labelimage;