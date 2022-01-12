import {useState, React, useEffect } from 'react'
import axios from 'axios'
import {
    Grid,
    Box,
    ImageList,
    ImageListItem,
    Pagination,
    TextField,
    Typography
} from '@mui/material'
import hs from '../../images/logo96x96.png'
import apiKey from '../config';
import LargeImage from '../LargeImage'


export default function Home() {

    const [value, setValue] = useState('');
    const [query, setQuery] = useState('military aircraft')
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [urlLarge, setURLLarge] = useState('')
    const [openPopup, setOpenPopup] = useState(false)
    const [alt, setAlt]= useState('')
    

    const closeImage = () => {
        setOpenPopup(false)
      }

    /**
     *  Requests images from unsplash
     *  @param {string} query 
     */
    const fetchData=()=>{
        setLoading(true);
        axios.get(`https://api.unsplash.com/search/photos/?page=1&per_page=30&query=${query}&client_id=${apiKey}`)
        .then(res => {
            setLoading(false);
            setImages(res.data.results);
        })
        .catch(error => {
            console.log('Error fetching and parsing results', error);
        });
        
    };
  
    /**
     * Updates images based on user query
     */
    useEffect(
    () => fetchData(), // eslint-disable-next-line
    [query],
    )

    /**
     * Query sent to API 
     * @param {*} e 
     */
    const handleSubmit=(e)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget); 
        setQuery(data.get('search'))
        setValue('')
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid container  sx={{height: '10vh', my: 2}}>
                <Grid item xs={4} 
                    component="img"
                    src={hs} 
                    sx={{
                        maxHeight: 100,
                        maxWidth: 100,
                        m: 'auto',
                        p: 1
                        }}/>
                <Grid item xs={7} 
                    component="form" 
                    noValidate 
                    onSubmit={handleSubmit} 
                    sx={{ 
                        p: 1,
                        m:'auto' 
                        }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="search"
                        name="search"
                        label="Customize your results"
                        value={value} 
                        onChange={(e)=>setValue(e.target.value)}
                    />
                </Grid>
            </Grid>

            {/*  Loading displays while fetching */}
            {loading
            ?   <Typography sx={{m: 'auto'}}>
                ...loading...
                </Typography>
            : null}

            {/* Renders Large Image Modal */}
            {urlLarge
            ? 
            <LargeImage
            open={openPopup}
            closeImage={closeImage}
            url={urlLarge}
            alt={alt}
            />
            : null}
            
            {/* Image Gallery */}
            <Grid container sx={{height: '90vh'}}>
                <ImageList sx={{ width: 500 }} cols={3} rowHeight={164}>
                    {images.map((image, key) => (
                        <ImageListItem key={key}>
                        <img
                            src={`${image.urls.thumb}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${image.urls.thumb}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            loading="lazy"
                            alt={`${image.alt_description}`}
                            onClick={()=>{
                                setURLLarge(image.urls.full);
                                setAlt(image.alt_description)
                                setOpenPopup(true)
                                }}
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            
        </Grid>
    )
}