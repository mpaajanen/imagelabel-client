import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import Labelbutton from './Labelbutton'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Labelimage = ({ images }) => {
    const { id } = useParams()
    const [currentId, setCurrentId] = useState('')
    const path = '/images'
    // const labels = ['roots', 'grease', 'cracks']
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
        'vp-5',
        'vp-10',
        'vp-15',
        'vp-20',
        'vp-25',
        'vp-30',
        'vp-35',
        'vp-40',
        'vp-45',
        'vp-50',
        'vp-55',
        'vp-60',
        'vp-65',
        'vp-70',
        'vp-75',
        'vp-80',
        'vp-85',
        'vp-90',
        'vp-95',
        'vp-100',
        'm-betoni',
        'm-muovi',
        'm-sukka',
        'm-pvc'
    ]
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    useEffect(() => {
        console.log("kuva vaihtui...")
        setCurrentId(id)
    }, [id])

    const prevImg = images.map((image, i, images) => image._id === id ? images[i-1] : undefined).filter(result => result !== undefined)
    const nextImg = images.map((image, i, images) => image._id === id ? images[i+1] : undefined).filter(result => result !== undefined)

    const fetchImage = async () => {
        const response = await axios.get(`/api/images/${id}`)
        // const response = await axios.get(`http://localhost:8082/api/images/${id}`)
        return response.data
    }

    const updateLabels = async (labels) => {
        const loggedLabeller = window.localStorage.getItem('loggedLabeller')
        const token = JSON.parse(loggedLabeller).token
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        const response = await axios.put(`/api/images/${id}`, labels, config)
        // const response = await axios.put(`http://localhost:8082/api/images/${id}`, labels, config)
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
        ? <Button href={`/label-image/${prevImg[0]._id}`} variant='outlined' sx={{mx: '0.5em'}}>Edellinen</Button>
        // ? <Button href={`${prevImg[0]._id}`} variant='outlined' sx={{mx: '0.5em'}}>Edellinen</Button>
        // ? <Button href={`/api/images/${prevImg[0]._id}`} variant='outlined' sx={{mx: '0.5em'}}>Edellinen</Button>
        // ? <Button component={Link} to={`/label-image/${prevImg[0]._id}`} variant='outlined' sx={{mx: '0.5em'}}>Edellinen</Button>
        // ? <Link to={`/label-image/${prevImg[0]._id}`}>
        //     <Button variant='outlined' sx={{mx: '0.5em'}}>Edellinen</Button>
        // </Link>
        : <span>...</span>
    }

    const nextBtn = () => {
        return nextImg.length > 0
        ? <Button href={`/label-image/${nextImg[0]._id}`} variant='outlined' sx={{mx: '0.5em'}}>Seuraava</Button>
        // ? <Button href={`${nextImg[0]._id}`} variant='outlined' sx={{mx: '0.5em'}}>Seuraava</Button>
        // ? <Button href={`/api/images/${nextImg[0]._id}`} variant='outlined' sx={{mx: '0.5em'}}>Seuraava</Button>
        // ? <Button component={Link} to={`/label-image/${nextImg[0]._id}`} variant='outlined' sx={{mx: '0.5em'}}>Seuraava</Button>
        // ? <Link to={`/label-image/${nextImg[0]._id}`}>
        //     <Button variant='outlined' sx={{mx: '0.5em'}}>Seuraava</Button>
        // </Link>
        : <span>...</span>
    }

    return (
        <div>
            {/* <Link to='/'>Takaisin kuvalistaan</Link> */}
            {/* <div>Kuva {id} {data.link}</div> */}
            <div>{data.link}</div>
            {/* <div>{data.labels.toString()}</div> */}
            {/* <div>{prevImg.length > 0 ? prevImg[0]._id : ''} | {nextImg.length > 0 ? nextImg[0]._id : ''}</div> */}
            <Box sx={{m: '0.5em'}}>
                {prevBtn()}
                {nextBtn()}
            </Box>
            <Box sx={{m: '0.5em'}}>
                {/* <Button onClick={() => navigate(`/label-image/${nextImg[0]._id}`)}>Seuraava ---</Button> */}
                {/* <Link reloadDocument to={`/label-image/${nextImg[0]._id}`}>seuraava...</Link> */}
            </Box>
            <Box>
                Täyttöaste (%):
                {labels.filter(label => label.includes("vp-")).map(label => createButton(label))}
            </Box>
            <Box>
                Materiaali:
                {labels.filter(label => label.includes("m-")).map(label => createButton(label))}
            </Box>
            <Box sx={{
                display: 'flex',
                border: '5px solid blue'
            }}>
                <Box sx={{mx: '0.5em'}}>
                    <Box>
                        Toiminnalliset viat:<br />
                        {labels.filter(label => label.includes("t-")).map(label => createButton(label))}
                    </Box>
                    <Box>
                        Vuotoviat:<br />
                        {labels.filter(label => label.includes("v-")).map(label => createButton(label))}
                    </Box>
                    <Box>
                        Rakenteelliset viat:<br />
                        {labels.filter(label => label.includes("r-")).map(label => createButton(label))}
                    </Box>
                </Box>
                <Box sx={{border: '5px solid red'}}><img src={`${path}/${data.link}.png`} /></Box>
            </Box>
        </div>
    );
};

export default Labelimage;