import React from 'react'
import { Box, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Labelbuttons from './Labelbuttons'

const Labelimage = ({ images }) => {
    const { id } = useParams()
    const path = '/images'
    const labels = [
        't-rasva', 
        't-irtokertymä', 
        't-juuret',
        't-putkirikko',
        't-viettokaltevuus',
        't-muodonmuutos',
        't-vieras esine',
        'v-vuoto sauma',
        'v-vuoto halkeama',
        'v-juuret',
        'r-syöpymä',
        'r-halkeama',
        'vp-0',
        // 'vp-5',
        'vp-10',
        // 'vp-15',
        'vp-20',
        // 'vp-25',
        'vp-30',
        // 'vp-35',
        'vp-40',
        // 'vp-45',
        'vp-50',
        // 'vp-55',
        'vp-60',
        // 'vp-65',
        'vp-70',
        // 'vp-75',
        'vp-80',
        // 'vp-85',
        'vp-90',
        // 'vp-95',
        'vp-100',
        'm-betoni',
        'm-muovi',
        'm-sukka',
        'm-pvc'
    ]
    const queryClient = useQueryClient()

    const prevImg = images.map((image, i, images) => image._id === id ? images[i-1] : undefined).filter(result => result !== undefined)
    const nextImg = images.map((image, i, images) => image._id === id ? images[i+1] : undefined).filter(result => result !== undefined)

    const fetchImage = async () => {
        const response = await axios.get(`/api/images/${id}`)
        return response.data
    }

    const updateLabels = async (labels) => {
        const loggedLabeller = window.localStorage.getItem('loggedLabeller')
        const token = JSON.parse(loggedLabeller).token
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        const response = await axios.put(`/api/images/${id}`, labels, config)
        return response.data
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
        return <div>ladataan kuvia...</div>
    }

    const prevBtn = () => {
        return prevImg.length > 0
        ? <Button href={`/label-image/${prevImg[0]._id}`} variant='outlined' sx={{mx: '0.5em'}}>Edellinen</Button>
        : <span>...</span>
    }

    const nextBtn = () => {
        return nextImg.length > 0
        ? <Button href={`/label-image/${nextImg[0]._id}`} variant='outlined' sx={{mx: '0.5em'}}>Seuraava</Button>
        : <span>...</span>
    }

    return (
        <Box>
            <Box>Kuvan nimi: {data.link}</Box>
            <Box sx={{m: '0.5em'}}>
                {prevBtn()}
                {nextBtn()}
            </Box>
            <Labelbuttons labels={labels} data={data} category={"Täyttöaste (%)"} catergoryPrefix={"vp-"} mutation={mutation} />
            <Labelbuttons labels={labels} data={data} category={"Materiaali"} catergoryPrefix={"m-"} mutation={mutation} />
            <Box sx={{ display: 'flex', border: '5px solid blue' }}>
                <Box sx={{mx: '0.5em'}}>
                    <Labelbuttons labels={labels} data={data} category={"Toiminnalliset viat"} catergoryPrefix={"t-"} mutation={mutation} />
                    <Labelbuttons labels={labels} data={data} category={"Vuotoviat"} catergoryPrefix={"v-"} mutation={mutation} />
                    <Labelbuttons labels={labels} data={data} category={"Rakenteelliset viat"} catergoryPrefix={"r-"} mutation={mutation} />
                </Box>
                <Box sx={{border: '5px solid red'}}><img src={`${path}/${data.link}.png`} /></Box>
            </Box>
        </Box>
    );
};

export default Labelimage;